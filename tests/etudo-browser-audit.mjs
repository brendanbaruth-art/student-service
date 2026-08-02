import { createRequire } from "node:module";
import { existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

const baseUrl = process.env.ETUDO_BASE_URL || "http://localhost:3000";
const outputDir = resolve("test-results", "etudo-audit");
const bundledPlaywrightRoot =
  process.env.PLAYWRIGHT_MODULE_PATH ||
  "C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright";

function loadPlaywright() {
  try {
    const require = createRequire(import.meta.url);
    return require("playwright");
  } catch {
    const require = createRequire(`${bundledPlaywrightRoot}/package.json`);
    return require("playwright");
  }
}

function chromeExecutablePath() {
  const candidates = [
    process.env.PLAYWRIGHT_CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate));
}

const { chromium } = loadPlaywright();
const executablePath = chromeExecutablePath();

if (!executablePath) {
  throw new Error("No Chrome or Edge executable was found for the Etudo browser audit.");
}

mkdirSync(outputDir, { recursive: true });

const viewports = [
  [1440, 900],
  [1280, 800],
  [1024, 768],
  [768, 1024],
  [430, 932],
  [390, 844],
  [375, 812],
  [320, 700],
];

const routes = [
  "/",
  "/browse",
  "/browse?view=split",
  "/search?q=tutoring&location=Paris",
  "/search?q=dig+wadlking&location=Paris&view=split",
  "/requests",
  "/earn",
  "/dashboard",
  "/saved",
  "/messages",
  "/signup",
  "/how-it-works",
  "/students/camille-martin",
  "/students/youssef-benali",
  "/students/lea-moreau",
  "/students/hugo-laurent",
  "/booking?student=camille-martin",
];

const criticalConsole = [];
const failedRequests = [];
const failures = [];

function fullUrl(route) {
  return new URL(route, baseUrl).toString();
}

function slug(value) {
  return value.replace(/https?:\/\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").slice(0, 80);
}

async function collectPageIssues(page, label) {
  const state = await page.evaluate(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const elements = Array.from(document.querySelectorAll("main h1, main h2, main p, main a, main button, main input, main select, main textarea, .maplibregl-canvas, img"))
      .filter((element) => !element.closest('[aria-hidden="true"]'));
    const visible = elements.filter((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 4 && rect.height > 4 && rect.bottom > 0 && rect.top < vh && style.visibility !== "hidden" && style.display !== "none";
    });
    function hasHorizontalScroller(element) {
      let current = element.parentElement;
      while (current && current !== document.body) {
        const style = getComputedStyle(current);
        if (/(auto|scroll)/.test(style.overflowX) && current.scrollWidth > current.clientWidth + 1) {
          return true;
        }
        current = current.parentElement;
      }
      return false;
    }

    const overlapCandidates = visible
      .filter((element) => element.matches("h1,h2,p,a,button,input,select,textarea"))
      .filter((element) => !hasHorizontalScroller(element))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName,
          text: element.textContent?.trim().slice(0, 80) || element.getAttribute("aria-label") || "",
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
        };
      });
    return {
      title: document.title,
      overflow: document.documentElement.scrollWidth > vw + 1,
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: vw,
      visibleCount: visible.length,
      loadingMap: document.body.innerText.includes("Loading the Paris map"),
      mapFailure: document.body.innerText.includes("The Paris map could not load right now."),
      oldBrand: new RegExp(
        [
          ["Campus", "Lift"].join(""),
          ["Etud", "uo"].join(""),
          ["Paris", "Student", "Services"].join(" "),
          ["student", "service"].join("-"),
        ].join("|"),
        "i",
      ).test(document.body.innerText),
      prototypeWords: /mock|MVP|developer-facing|not stored|No real payments|Verification preview|Production app would|sample/i.test(document.body.innerText),
      clippedText: overlapCandidates.filter((item) => item.left < -1 || item.right > vw + 1 || item.width > vw + 1),
    };
  });

  if (state.overflow) {
    failures.push(`${label}: horizontal overflow ${state.scrollWidth}px > ${state.viewportWidth}px`);
  }
  if (state.visibleCount < 2) {
    failures.push(`${label}: viewport appears blank`);
  }
  if (state.oldBrand) {
    failures.push(`${label}: old brand reference is visible`);
  }
  if (state.prototypeWords) {
    failures.push(`${label}: prototype/developer language is visible`);
  }
  if (state.clippedText.length) {
    failures.push(`${label}: clipped text ${JSON.stringify(state.clippedText.slice(0, 2))}`);
  }

  return state;
}

async function assertCenterClickable(locator, label) {
  const count = await locator.count();
  if (count < 1) {
    failures.push(`${label}: clickable element was not found`);
    return;
  }
  const isClickable = await locator.first().evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const hit = document.elementFromPoint(x, y);
    return Boolean(hit && (hit === element || element.contains(hit) || hit.closest("a,button") === element));
  });
  if (!isClickable) {
    failures.push(`${label}: element center is covered by another layer`);
  }
}

async function scrollToSectionProgress(page, selector, progress) {
  const metrics = await page.locator(selector).evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      height: rect.height,
      viewportHeight: window.innerHeight,
    };
  });
  const activeRange = Math.max(0, metrics.height - metrics.viewportHeight);
  const top = metrics.top + activeRange * progress;
  await page.evaluate((value) => window.scrollTo({ top: Math.max(0, value), behavior: "instant" }), top);
  await page.waitForTimeout(600);
}

async function auditHomepageRepairs(page, viewportLabel) {
  const hero = page.locator('[data-etudo-section="hero"]');
  const heroText = await hero.innerText();
  if (/Walk my dog|Help me move|Explain statistics|Build my desk|Take birthday photos|Fix my laptop/i.test(heroText)) {
    failures.push(`${viewportLabel} hero: old floating suggestion labels are still visible`);
  }
  if (!heroText.includes("Popular searches:")) {
    failures.push(`${viewportLabel} hero: popular search row is missing`);
  }
  await assertCenterClickable(hero.getByRole("link", { name: "Find help", exact: true }).first(), `${viewportLabel} hero Find help`);
  await assertCenterClickable(hero.getByRole("link", { name: "Start earning", exact: true }).first(), `${viewportLabel} hero Start earning`);
  await page.screenshot({ path: join(outputDir, `${slug(`${viewportLabel}-hero-repaired-initial`)}.png`) });
  await scrollToSectionProgress(page, '[data-etudo-section="hero"]', 0.72);
  await page.screenshot({ path: join(outputDir, `${slug(`${viewportLabel}-hero-repaired-end`)}.png`) });

  await page.locator('[data-etudo-section="map"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2400);
  const mapSectionText = await page.locator('[data-etudo-section="map"]').innerText();
  if (/Click to explore the map/i.test(mapSectionText)) {
    failures.push(`${viewportLabel} map: interaction gate overlay is still visible`);
  }
  const marker = page.getByRole("button", { name: /Preview|students in/i }).first();
  if ((await marker.count()) < 1) {
    failures.push(`${viewportLabel} map: no clickable student or cluster marker found`);
  } else {
    await marker.click();
    await page.waitForTimeout(700);
    if ((await page.getByRole("link", { name: "View profile", exact: true }).count()) < 1) {
      failures.push(`${viewportLabel} map: marker click did not expose a student profile preview`);
    }
  }
  const frame = page.locator(".etudo-story-map-frame").first();
  const frameBox = await frame.boundingBox();
  if (!frameBox) {
    failures.push(`${viewportLabel} map: story map frame is missing`);
  } else {
    const x = frameBox.x + frameBox.width * 0.5;
    const y = frameBox.y + frameBox.height * 0.52;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 80, y + 20, { steps: 8 });
    await page.mouse.up();
    await page.mouse.wheel(0, -420);
    await page.waitForTimeout(700);
    await page.screenshot({ path: join(outputDir, `${slug(`${viewportLabel}-map-after-drag-zoom`)}.png`) });
  }
  const fullMapButton = page.getByRole("button", { name: "Full map", exact: true }).first();
  if ((await fullMapButton.count()) < 1) {
    failures.push(`${viewportLabel} map: fullscreen control is missing`);
  } else {
    await fullMapButton.click();
    await page.waitForTimeout(900);
    await page.screenshot({ path: join(outputDir, `${slug(`${viewportLabel}-map-fullscreen`)}.png`) });
    if ((await page.getByRole("button", { name: "Exit map", exact: true }).count()) < 1) {
      failures.push(`${viewportLabel} map: fullscreen did not show Exit map`);
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
  }

  await scrollToSectionProgress(page, '[data-etudo-section="book"]', 0.08);
  await page.screenshot({ path: join(outputDir, `${slug(`${viewportLabel}-book-closed`)}.png`) });
  await scrollToSectionProgress(page, '[data-etudo-section="book"]', 0.48);
  await page.screenshot({ path: join(outputDir, `${slug(`${viewportLabel}-book-half-open`)}.png`) });
  await scrollToSectionProgress(page, '[data-etudo-section="book"]', 0.84);
  await page.screenshot({ path: join(outputDir, `${slug(`${viewportLabel}-book-open`)}.png`) });
  const bookText = await page.locator('[data-etudo-section="book"]').innerText();
  for (const phrase of ["Your time has value.", "Earn with what you already know.", "Choose your services"]) {
    if (!bookText.includes(phrase)) {
      failures.push(`${viewportLabel} book: missing "${phrase}"`);
    }
  }
  await assertCenterClickable(page.getByRole("link", { name: "Become a tutor", exact: true }).first(), `${viewportLabel} book Become a tutor`);
}

async function auditRoute(browser, route, viewport) {
  const [width, height] = viewport;
  const context = await browser.newContext({ viewport: { width, height } });
  await context.tracing.start({ screenshots: true, snapshots: true });
  const page = await context.newPage();
  const label = `${width}x${height} ${route}`;
  const pageConsole = [];
  const pageFailures = [];

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      const text = message.text();
      if (!/Geolocation support is not available/i.test(text)) {
        pageConsole.push(`${message.type()}: ${text}`);
      }
    }
  });
  page.on("pageerror", (error) => pageConsole.push(`pageerror: ${error.message}`));
  page.on("requestfailed", (request) => {
    const url = request.url();
    const failureText = request.failure()?.errorText || "failed";
    const isNextPrefetchAbort = url.includes("_rsc=") && /ERR_ABORTED/i.test(failureText);
    if (url.startsWith(baseUrl) && !isNextPrefetchAbort) {
      pageFailures.push(`${request.failure()?.errorText || "failed"} ${url}`);
    }
  });

  const response = await page.goto(fullUrl(route), { waitUntil: "domcontentloaded", timeout: 30000 });
  if (!response || response.status() >= 400) {
    failures.push(`${label}: route returned ${response?.status() || "no response"}`);
  }
  await page.waitForTimeout(700);
  await page.screenshot({ path: join(outputDir, `${slug(`${width}x${height}-${route}-top`)}.png`), fullPage: true });
  await collectPageIssues(page, `${label} top`);

  if (route === "/") {
    await auditHomepageRepairs(page, `${width}x${height}`);
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let index = 1; index <= 6; index += 1) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), Math.floor((scrollHeight * index) / 7));
      await page.waitForTimeout(450);
      await page.screenshot({ path: join(outputDir, `${slug(`${width}x${height}-home-scroll-${index}`)}.png`) });
      await collectPageIssues(page, `${label} scroll ${index}`);
    }

    const offerLinks = await page.locator('a[href="/offer"]').count();
    if (offerLinks < 1) {
      failures.push(`${label}: no visible route to offer services`);
    }
  }

  if (route.includes("/browse")) {
    const mapButton = page.getByRole("button", { name: "Map", exact: true });
    if (await mapButton.count() === 1) {
      await mapButton.click();
      await page.waitForTimeout(2200);
      const mapState = await page.evaluate(() => ({
        canvas: Boolean(document.querySelector(".maplibregl-canvas")),
        controls: document.querySelectorAll(".maplibregl-ctrl button").length,
        fallback: document.body.innerText.includes("The Paris map could not load right now."),
      }));
      if (!mapState.canvas || mapState.controls < 3 || mapState.fallback) {
        failures.push(`${label}: map did not render controls and canvas`);
      }
    }
  }

  if (route.includes("view=split")) {
    const splitButton = page.getByRole("button", { name: "Split", exact: true });
    if ((await splitButton.count()) === 1) {
      await splitButton.click();
    }
    const splitMapFrame = page.locator(".etudo-map-frame, .etudo-story-map-frame").first();
    if ((await splitMapFrame.count()) === 1) {
      await splitMapFrame.scrollIntoViewIfNeeded();
    }
    await page.waitForTimeout(2200);
    const splitMapState = await page.evaluate(() => ({
      canvas: Boolean(document.querySelector(".maplibregl-canvas")),
      controls:
        document.querySelectorAll(".maplibregl-ctrl button").length +
        Array.from(document.querySelectorAll("button")).filter((button) =>
          /Use my location|Reset|Full map|Exit map|List view/i.test(button.textContent || button.getAttribute("aria-label") || ""),
        ).length,
      markers: document.querySelectorAll(".maplibregl-marker").length,
      fallback: document.body.innerText.includes("The Paris map could not load right now."),
    }));
    if (!splitMapState.canvas || splitMapState.controls < 3 || splitMapState.markers < 1 || splitMapState.fallback) {
      failures.push(`${label}: split map did not render canvas, controls, and markers`);
    }
  }

  if (route === "/signup") {
    const continueButton = page.getByRole("button", { name: "Continue", exact: true });
    if (await continueButton.count() === 1) {
      await continueButton.click();
      await page.waitForTimeout(250);
      const text = await page.locator("main").innerText();
      if (!text.includes("Step 2: Basic information")) {
        failures.push(`${label}: signup Continue did not advance`);
      }
    }
  }

  if (route.startsWith("/students/")) {
    const booking = page.getByRole("link", { name: "Request booking", exact: true });
    if ((await booking.count()) !== 1) {
      failures.push(`${label}: profile booking CTA missing`);
    }
  }

  if (pageConsole.length) criticalConsole.push({ label, pageConsole });
  if (pageFailures.length) failedRequests.push({ label, pageFailures });

  await context.tracing.stop({ path: join(outputDir, `${slug(`${width}x${height}-${route}`)}.zip`) });
  await context.close();
}

const browser = await chromium.launch({
  headless: true,
  executablePath,
});

for (const viewport of viewports) {
  for (const route of routes) {
    await auditRoute(browser, route, viewport);
  }
}

await browser.close();

for (const item of criticalConsole) {
  failures.push(`${item.label}: console ${item.pageConsole.join(" | ")}`);
}
for (const item of failedRequests) {
  failures.push(`${item.label}: failed requests ${item.pageFailures.join(" | ")}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Etudo browser audit passed for ${routes.length} routes across ${viewports.length} viewports.`);
console.log(`Screenshots and traces saved to ${outputDir}`);
