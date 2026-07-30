export type ServiceOffering = {
  name: string;
  description: string;
  price: string;
  pricingType: "hourly" | "fixed";
  availability: string;
  category: string;
};

export type Capability = {
  service: string;
  enabled: boolean;
  price: number;
  pricingType: "hourly" | "fixed" | "fixed-from";
  description: string;
  availability: string;
  category: string;
};

export type Review = {
  author: string;
  text: string;
  rating: number;
};

export type Student = {
  id: string;
  fullName: string;
  displayName: string;
  university: string;
  photo: string;
  area: string;
  distance: string;
  bio: string;
  skills: string[];
  categories: string[];
  services: ServiceOffering[];
  startingPrice: string;
  startingPriceValue: number;
  rating: number;
  reviews: number;
  availability: string;
  availabilityTag: string;
  responseTime: string;
  responseRate?: string;
  completedTasks?: number;
  repeatBookings?: number;
  languages: string[];
  serviceAreas: string[];
  baseArrondissement?: number;
  approximateLatitude?: number;
  approximateLongitude?: number;
  weeklyAvailability?: Array<{ day: string; time: string }>;
  languageLevels?: Array<{ language: string; level: string }>;
  capabilities: Capability[];
  memberSince: string;
  travelNote: string;
  verified: boolean;
  newOnEtudo?: boolean;
  reviewSnippets: Review[];
};

export type Arrondissement = {
  number: number;
  label: string;
  name: string;
  center: { latitude: number; longitude: number };
  svgPath: string;
};

export type ServiceCategory = {
  slug: string;
  name: string;
  description: string;
  startingPrice: string;
  tags: string[];
  aliases: string[];
};

export type OpenRequest = {
  id: string;
  title: string;
  category: string;
  area: string;
  timing: string;
  duration: string;
  budget: string;
  postedBy: string;
  posterRating: number;
  interested: number;
  postedAgo: string;
  mode: "In person" | "Online" | "Hybrid";
};

export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  preview: string;
  time: string;
  messages: Array<{ from: "me" | "them"; text: string; time: string }>;
};

export const categories: ServiceCategory[] = [
  {
    slug: "moving-help",
    name: "Moving help",
    description: "Packing, lifting, van loading, and careful help with small Paris moves.",
    startingPrice: "From €18/hour",
    tags: ["Boxes", "Furniture", "Heavy lifting"],
    aliases: ["move apartment", "moving boxes", "carry couch", "heavy lifting", "help move"],
  },
  {
    slug: "tutoring",
    name: "Tutoring",
    description: "Focused academic support for maths, languages, economics, coding, and exams.",
    startingPrice: "From €22/hour",
    tags: ["Maths", "Statistics", "Exams"],
    aliases: ["math help", "math tutor", "maths tutor", "calculus", "statistics", "economics"],
  },
  {
    slug: "assembly",
    name: "Furniture assembly",
    description: "Flat-pack furniture, shelves, desks, wardrobes, and room setup.",
    startingPrice: "From €20/hour",
    tags: ["IKEA", "Shelves", "Desk setup"],
    aliases: ["build ikea", "assemble desk", "wardrobe", "put wardrobe together", "flat pack"],
  },
  {
    slug: "tech-help",
    name: "Tech help",
    description: "Laptop setup, Wi-Fi troubleshooting, device support, and productivity tools.",
    startingPrice: "From €24/hour",
    tags: ["Laptop", "Wi-Fi", "Setup"],
    aliases: ["computer help", "wifi broken", "laptop setup", "coding help", "software setup"],
  },
  {
    slug: "pet-sitting",
    name: "Pet care",
    description: "Dog walks, cat visits, feeding, and calm care around university schedules.",
    startingPrice: "From €16/hour",
    tags: ["Dog walking", "Cat sitting", "Feeding"],
    aliases: ["dog walking", "dog walker", "dog sitter", "pet walker", "walk puppy", "cat sitting"],
  },
  {
    slug: "errands",
    name: "Everyday errands",
    description: "Pickup, delivery, queueing, admin support, and time-sensitive tasks.",
    startingPrice: "From €15/hour",
    tags: ["Pickup", "Delivery", "Admin"],
    aliases: ["leboncoin pickup", "pick up", "delivery", "carry luggage", "queue"],
  },
  {
    slug: "photography",
    name: "Photography",
    description: "Portraits, event coverage, social content, and light editing.",
    startingPrice: "From €35/hour",
    tags: ["Portraits", "Events", "Video"],
    aliases: ["take pics", "birthday photographer", "portrait photos", "party photos", "video editing"],
  },
  {
    slug: "language-help",
    name: "Language help",
    description: "Conversation practice, proofreading, translation, and pronunciation support.",
    startingPrice: "From €18/hour",
    tags: ["French", "English", "Spanish"],
    aliases: ["french conversation", "proofreading", "english tutor", "spanish conversation", "mandarin"],
  },
  {
    slug: "event-help",
    name: "Event help",
    description: "Check-in desks, setup, hosting support, and student society events.",
    startingPrice: "From €18/hour",
    tags: ["Check-in", "Setup", "Hosting"],
    aliases: ["event setup", "party help", "hosting", "guest check-in"],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    description: "Shared flat resets, move-out cleaning, dishes, laundry, and tidy-ups.",
    startingPrice: "From €17/hour",
    tags: ["Move-out", "Flat reset", "Laundry"],
    aliases: ["clean room", "move-out cleaning", "flat reset", "tidy"],
  },
  {
    slug: "creative-skills",
    name: "Creative skills",
    description: "Graphic design, presentation design, content edits, music, and styling.",
    startingPrice: "From €20/hour",
    tags: ["Design", "Music", "Styling"],
    aliases: ["graphic design", "presentation design", "guitar", "piano", "makeup", "thrift styling"],
  },
  {
    slug: "bike-repair",
    name: "Bike repair",
    description: "Basic bike checks, punctures, brakes, chains, and commuter setup.",
    startingPrice: "From €18/hour",
    tags: ["Punctures", "Brakes", "Commuting"],
    aliases: ["bike repair", "flat tyre", "brake fix", "velo"],
  },
];

export const capabilityCatalog = [
  "Moving help",
  "Heavy lifting",
  "Furniture assembly",
  "Furniture pickup",
  "Leboncoin pickup",
  "Dog walking",
  "Dog sitting",
  "Cat sitting",
  "Pet care",
  "Maths tutoring",
  "Statistics tutoring",
  "Economics tutoring",
  "Excel help",
  "Coding",
  "Laptop setup",
  "Computer troubleshooting",
  "Photography",
  "Video editing",
  "French conversation",
  "English conversation",
  "Spanish conversation",
  "Mandarin conversation",
  "Essay proofreading",
  "CV review",
  "Presentation design",
  "Graphic design",
  "Piano",
  "Guitar",
  "Sewing",
  "Clothing alterations",
  "Bike repair",
  "Plant sitting",
  "Event setup",
  "Party photography",
  "DJ lessons",
  "Makeup",
  "Hair styling",
  "Chess",
  "Thrift styling",
];

export const arrondissements: Arrondissement[] = [
  { number: 1, label: "1er", name: "Louvre", center: { latitude: 48.8626, longitude: 2.3364 }, svgPath: "M272 198 L328 186 L356 218 L320 252 L260 236 Z" },
  { number: 2, label: "2e", name: "Bourse", center: { latitude: 48.8687, longitude: 2.3429 }, svgPath: "M320 162 L378 170 L392 212 L356 218 L328 186 Z" },
  { number: 3, label: "3e", name: "Temple", center: { latitude: 48.8629, longitude: 2.3600 }, svgPath: "M392 212 L438 210 L450 264 L404 282 L356 218 Z" },
  { number: 4, label: "4e", name: "Hôtel-de-Ville", center: { latitude: 48.8543, longitude: 2.3574 }, svgPath: "M356 218 L404 282 L374 328 L318 304 L320 252 Z" },
  { number: 5, label: "5e", name: "Panthéon", center: { latitude: 48.8445, longitude: 2.3509 }, svgPath: "M318 304 L374 328 L382 390 L318 424 L266 372 Z" },
  { number: 6, label: "6e", name: "Luxembourg", center: { latitude: 48.8493, longitude: 2.3327 }, svgPath: "M260 236 L320 252 L318 304 L266 372 L218 326 L224 266 Z" },
  { number: 7, label: "7e", name: "Palais-Bourbon", center: { latitude: 48.8565, longitude: 2.3126 }, svgPath: "M150 210 L260 236 L224 266 L218 326 L134 340 L104 278 Z" },
  { number: 8, label: "8e", name: "Élysée", center: { latitude: 48.8727, longitude: 2.3126 }, svgPath: "M142 114 L244 118 L272 198 L260 236 L150 210 L108 158 Z" },
  { number: 9, label: "9e", name: "Opéra", center: { latitude: 48.8772, longitude: 2.3370 }, svgPath: "M244 118 L330 104 L378 170 L320 162 L328 186 L272 198 Z" },
  { number: 10, label: "10e", name: "Entrepôt", center: { latitude: 48.8760, longitude: 2.3604 }, svgPath: "M330 104 L430 94 L480 156 L438 210 L392 212 L378 170 Z" },
  { number: 11, label: "11e", name: "Popincourt", center: { latitude: 48.8584, longitude: 2.3797 }, svgPath: "M438 210 L520 210 L548 302 L484 350 L404 282 L450 264 Z" },
  { number: 12, label: "12e", name: "Reuilly", center: { latitude: 48.8408, longitude: 2.3880 }, svgPath: "M404 282 L484 350 L560 418 L500 510 L392 478 L382 390 L374 328 Z" },
  { number: 13, label: "13e", name: "Gobelins", center: { latitude: 48.8322, longitude: 2.3556 }, svgPath: "M266 372 L318 424 L382 390 L392 478 L330 532 L240 498 L220 426 Z" },
  { number: 14, label: "14e", name: "Observatoire", center: { latitude: 48.8331, longitude: 2.3264 }, svgPath: "M134 340 L218 326 L266 372 L220 426 L240 498 L146 494 L92 420 Z" },
  { number: 15, label: "15e", name: "Vaugirard", center: { latitude: 48.8412, longitude: 2.3003 }, svgPath: "M44 262 L104 278 L134 340 L92 420 L146 494 L54 462 L22 354 Z" },
  { number: 16, label: "16e", name: "Passy", center: { latitude: 48.8637, longitude: 2.2769 }, svgPath: "M18 116 L108 158 L150 210 L104 278 L44 262 L16 210 Z" },
  { number: 17, label: "17e", name: "Batignolles-Monceau", center: { latitude: 48.8873, longitude: 2.3068 }, svgPath: "M112 42 L246 36 L330 104 L244 118 L142 114 L92 78 Z" },
  { number: 18, label: "18e", name: "Butte-Montmartre", center: { latitude: 48.8925, longitude: 2.3444 }, svgPath: "M246 36 L392 28 L430 94 L330 104 Z" },
  { number: 19, label: "19e", name: "Buttes-Chaumont", center: { latitude: 48.8871, longitude: 2.3848 }, svgPath: "M392 28 L540 74 L566 182 L520 210 L438 210 L480 156 L430 94 Z" },
  { number: 20, label: "20e", name: "Ménilmontant", center: { latitude: 48.8647, longitude: 2.3984 }, svgPath: "M520 210 L608 238 L612 344 L560 418 L484 350 L548 302 Z" },
];

const arrondissementCenters = Object.fromEntries(
  arrondissements.map((item) => [item.number, item.center]),
) as Record<number, { latitude: number; longitude: number }>;

const reviewBank: Review[] = [
  { author: "Nina", rating: 5, text: "Helped me carry everything up four floors and was super easy to coordinate with." },
  { author: "Alex", rating: 5, text: "Explained the part I was stuck on without making it stressful." },
  { author: "Maya", rating: 4.8, text: "Showed up on time and had my desk built faster than I expected." },
  { author: "Louis", rating: 4.7, text: "Clear messages, practical help, and a very calm approach." },
  { author: "Clara", rating: 5, text: "Really nice photos and did not make the shoot awkward at all." },
  { author: "Robin", rating: 4.8, text: "Sent a quick update during the pet visit, which made me feel reassured." },
  { author: "Eva", rating: 4.9, text: "Coordinated the pickup clearly and handled the furniture carefully." },
  { author: "Theo", rating: 4.6, text: "Patient and useful, especially for the spreadsheet formulas I kept breaking." },
];

const photos = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=900&q=80",
];

type StudentSeed = Omit<
  Student,
  | "services"
  | "reviewSnippets"
  | "capabilities"
  | "baseArrondissement"
  | "approximateLatitude"
  | "approximateLongitude"
  | "weeklyAvailability"
  | "languageLevels"
  | "memberSince"
  | "travelNote"
> & {
  serviceSeed: Array<[string, string, string, "hourly" | "fixed", string, string]>;
};

function createStudent(seed: StudentSeed, reviewOffset = 0): Student {
  const services = seed.serviceSeed.map(([name, description, price, pricingType, availability, category]) => ({
    name,
    description,
    price,
    pricingType,
    availability,
    category,
  }));
  const baseArrondissement = Number(seed.area.match(/^(\d+)/)?.[1]) || undefined;
  const center = baseArrondissement ? arrondissementCenters[baseArrondissement] : undefined;

  return {
    ...seed,
    services,
    baseArrondissement,
    approximateLatitude: center?.latitude ? center.latitude + (reviewOffset % 5) * 0.0012 : undefined,
    approximateLongitude: center?.longitude ? center.longitude + (reviewOffset % 4) * 0.0014 : undefined,
    weeklyAvailability: createWeeklyAvailability(seed.availabilityTag || seed.availability),
    languageLevels: seed.languages.map((language, index) => ({
      language,
      level: index === 0 && language === "French" ? "Native" : index === 0 ? "Fluent" : index === 1 ? "Fluent" : "Conversational",
    })),
    capabilities: services.map((service) => ({
      service: service.name,
      enabled: true,
      price: Number(service.price.match(/\d+/)?.[0] || seed.startingPriceValue),
      pricingType: service.pricingType === "fixed" ? "fixed" : "hourly",
      description: service.description,
      availability: service.availability,
      category: service.category,
    })),
    memberSince: reviewOffset % 3 === 0 ? "July 2026" : reviewOffset % 3 === 1 ? "June 2026" : "May 2026",
    travelNote: "Can travel farther for larger jobs.",
    reviewSnippets: [reviewBank[reviewOffset % reviewBank.length], reviewBank[(reviewOffset + 3) % reviewBank.length]],
  };
}

function createWeeklyAvailability(value: string) {
  const weekend = value.toLowerCase().includes("weekend");
  const tonight = value.toLowerCase().includes("tonight") || value.toLowerCase().includes("evening");
  return [
    { day: "Monday", time: tonight ? "After 17:00" : "After 18:00" },
    { day: "Tuesday", time: "After 17:30" },
    { day: "Wednesday", time: "After 15:00" },
    { day: "Thursday", time: tonight ? "After 18:00" : "Unavailable" },
    { day: "Friday", time: "After 14:00" },
    { day: "Saturday", time: weekend ? "Available" : "Afternoon" },
    { day: "Sunday", time: weekend ? "Available" : "Evening" },
  ];
}

const studentSeeds: StudentSeed[] = [
  {
    id: "camille-martin",
    fullName: "Camille Martin",
    displayName: "Camille M.",
    university: "Sorbonne Université",
    photo: photos[0],
    area: "5e - Latin Quarter",
    distance: "1.1 km away",
    bio: "Literature master's student offering dependable help with small moves, French conversation, and apartment reset tasks.",
    skills: ["Moving", "French conversation", "Packing", "Cleaning"],
    categories: ["moving-help", "language-help", "cleaning"],
    serviceSeed: [
      ["Moving help", "Boxes, light furniture, packing, and careful stair carry support.", "€22/hour", "hourly", "Weekday evenings", "moving-help"],
      ["French conversation", "Conversation practice, pronunciation, and short written feedback.", "€24/hour", "hourly", "Sunday afternoons", "language-help"],
      ["Move-out cleaning", "Kitchen, bathroom, and shared-room reset before handing back keys.", "€35 fixed price", "fixed", "Saturday mornings", "cleaning"],
    ],
    startingPrice: "€22/hour",
    startingPriceValue: 22,
    rating: 4.9,
    reviews: 48,
    availability: "Evenings and Sunday afternoons",
    availabilityTag: "Available tonight",
    responseTime: "Usually replies in 12 min",
    responseRate: "98% response rate",
    completedTasks: 22,
    repeatBookings: 3,
    languages: ["French", "English"],
    serviceAreas: ["5e", "6e", "13e"],
    verified: true,
  },
  {
    id: "youssef-benali",
    fullName: "Youssef Benali",
    displayName: "Youssef B.",
    university: "Université Paris Cité",
    photo: photos[1],
    area: "13e - Bibliothèque",
    distance: "2.4 km away",
    bio: "Engineering student with tools and a calm, precise approach to furniture assembly, device setup, and small repairs.",
    skills: ["Furniture assembly", "Tech setup", "Repairs", "Transport"],
    categories: ["assembly", "tech-help", "moving-help"],
    serviceSeed: [
      ["Furniture assembly", "Desks, shelves, beds, chairs, and flat-pack furniture setup.", "€25/hour", "hourly", "Tuesday and Thursday", "assembly"],
      ["Laptop and Wi-Fi setup", "Laptop configuration, Wi-Fi troubleshooting, and software setup.", "€28/hour", "hourly", "Saturday afternoons", "tech-help"],
      ["Small furniture transport", "Pickup coordination and carrying for compact furniture pieces.", "€40 fixed price", "fixed", "Saturday mornings", "moving-help"],
    ],
    startingPrice: "€25/hour",
    startingPriceValue: 25,
    rating: 4.8,
    reviews: 36,
    availability: "Tuesday, Thursday, Saturday",
    availabilityTag: "Available this weekend",
    responseTime: "Usually replies in 25 min",
    responseRate: "95% response rate",
    completedTasks: 18,
    repeatBookings: 2,
    languages: ["French", "Arabic", "English"],
    serviceAreas: ["12e", "13e", "14e"],
    verified: true,
  },
  {
    id: "lea-moreau",
    fullName: "Léa Moreau",
    displayName: "Léa M.",
    university: "Sciences Po Paris",
    photo: photos[2],
    area: "7e - Saint-Germain",
    distance: "1.8 km away",
    bio: "Policy student supporting society events, portraits, admin errands, and guest check-in.",
    skills: ["Event support", "Photography", "Errands", "Coordination"],
    categories: ["event-help", "photography", "errands"],
    serviceSeed: [
      ["Event support", "Guest check-in, setup, hosting support, and tidy teardown.", "€28/hour", "hourly", "Mornings and weekends", "event-help"],
      ["Portrait photography", "CV, LinkedIn, graduation, and student society portraits.", "€55 fixed price", "fixed", "Weekend afternoons", "photography"],
      ["Admin errands", "Pickup, queueing, document delivery, and campus errands.", "€20/hour", "hourly", "Friday mornings", "errands"],
    ],
    startingPrice: "€20/hour",
    startingPriceValue: 20,
    rating: 5,
    reviews: 31,
    availability: "Mornings and weekends",
    availabilityTag: "Available today",
    responseTime: "Usually replies in 8 min",
    responseRate: "100% response rate",
    completedTasks: 19,
    repeatBookings: 4,
    languages: ["French", "English", "Spanish"],
    serviceAreas: ["6e", "7e", "15e"],
    verified: true,
  },
  {
    id: "hugo-laurent",
    fullName: "Hugo Laurent",
    displayName: "Hugo L.",
    university: "Université Paris Dauphine - PSL",
    photo: photos[3],
    area: "16e - Porte Dauphine",
    distance: "3.2 km away",
    bio: "Economics student offering structured tutoring for maths, statistics, Excel, and finance fundamentals.",
    skills: ["Maths", "Statistics", "Excel", "Finance"],
    categories: ["tutoring", "tech-help"],
    serviceSeed: [
      ["Maths tutoring", "Problem-solving sessions with concise recap notes after each lesson.", "€32/hour", "hourly", "Monday to Thursday evenings", "tutoring"],
      ["Statistics preparation", "Exam preparation, practice questions, and method review.", "€34/hour", "hourly", "Wednesday evenings", "tutoring"],
      ["Spreadsheet help", "Excel formulas, spreadsheet cleanup, and study dashboards.", "€30/hour", "hourly", "Monday evenings", "tech-help"],
    ],
    startingPrice: "€30/hour",
    startingPriceValue: 30,
    rating: 4.9,
    reviews: 54,
    availability: "Monday to Thursday evenings",
    availabilityTag: "Available tonight",
    responseTime: "Usually replies in 18 min",
    responseRate: "97% response rate",
    completedTasks: 28,
    repeatBookings: 6,
    languages: ["French", "English"],
    serviceAreas: ["8e", "16e", "17e"],
    verified: true,
  },
  {
    id: "amina-diallo",
    fullName: "Amina Diallo",
    displayName: "Amina D.",
    university: "ESCP Business School",
    photo: photos[4],
    area: "11e - Oberkampf",
    distance: "0.8 km away",
    bio: "Bilingual business student available for English practice, pet care, errands, and profile photo sessions.",
    skills: ["English tutoring", "Pet care", "Photography", "Errands"],
    categories: ["language-help", "pet-sitting", "photography", "errands"],
    serviceSeed: [
      ["English conversation", "Speaking practice, vocabulary, and interview preparation.", "€24/hour", "hourly", "Friday afternoons", "language-help"],
      ["Cat visits", "Feeding, litter refresh, play time, and short visit updates.", "€18/hour", "hourly", "Weekends", "pet-sitting"],
      ["Profile photos", "Simple CV and profile portraits with light editing.", "€45 fixed price", "fixed", "Sunday afternoons", "photography"],
    ],
    startingPrice: "€18/hour",
    startingPriceValue: 18,
    rating: 4.7,
    reviews: 27,
    availability: "Friday afternoons and weekends",
    availabilityTag: "Available this weekend",
    responseTime: "Usually replies in 35 min",
    responseRate: "91% response rate",
    completedTasks: 12,
    repeatBookings: 1,
    languages: ["French", "English", "Wolof"],
    serviceAreas: ["10e", "11e", "20e"],
    verified: true,
  },
  {
    id: "marc-vidal",
    fullName: "Marc Vidal",
    displayName: "Marc V.",
    university: "CentraleSupélec",
    photo: photos[5],
    area: "14e - Cité Universitaire",
    distance: "2.9 km away",
    bio: "Engineering student available for compact furniture transport, device setup, errands, and assembly support.",
    skills: ["Furniture pickup", "Tech help", "Errands", "Assembly"],
    categories: ["moving-help", "tech-help", "errands", "assembly"],
    serviceSeed: [
      ["Furniture pickup", "Small furniture pickup, carrying, and short-distance delivery.", "€42 fixed price", "fixed", "Most afternoons", "moving-help"],
      ["Router setup", "Wi-Fi setup, speed checks, and basic troubleshooting.", "€27/hour", "hourly", "Tuesday afternoons", "tech-help"],
      ["Desk assembly", "Desk and chair assembly with basic tools included.", "€29/hour", "hourly", "Thursday afternoons", "assembly"],
    ],
    startingPrice: "€27/hour",
    startingPriceValue: 27,
    rating: 4.8,
    reviews: 42,
    availability: "Most afternoons",
    availabilityTag: "Available now",
    responseTime: "Usually replies in 20 min",
    responseRate: "96% response rate",
    completedTasks: 21,
    repeatBookings: 2,
    languages: ["French", "English", "Catalan"],
    serviceAreas: ["13e", "14e", "15e"],
    verified: true,
  },
];

const moreSeeds: Array<[string, string, string, string, string, string, string[], string[], string, number, number, string, string, string, string[], boolean, Array<[string, string, string, "hourly" | "fixed", string, string]>]> = [
  ["emma-chen", "Emma Chen", "Emma C.", "HEC Paris", "Boulogne", "4.1 km away", ["Statistics", "Accounting", "Excel"], ["tutoring", "tech-help"], "Sharp HEC student helping with statistics, accounting, and tidy Excel models.", 4.8, 14, "Available tonight", "Usually replies in 16 min", photos[6], ["French", "English", "Mandarin"], true, [["Statistics tutoring", "Exam prep and problem sets for stats or econometrics.", "€30/hour", "hourly", "Evenings", "tutoring"], ["Excel model help", "Clean formulas, formatting, and finance model checks.", "€28/hour", "hourly", "Tomorrow", "tech-help"]]],
  ["ines-garcia", "Inès Garcia", "Inès G.", "Université Paris 1 Panthéon-Sorbonne", "6e - Odéon", "1.6 km away", ["Spanish", "Proofreading", "CV review"], ["language-help", "creative-skills"], "Law student offering Spanish conversation, French proofreading, and polished CV feedback.", 4.7, 9, "Available this weekend", "Usually replies in 45 min", photos[8], ["French", "Spanish", "English"], true, [["Spanish conversation", "Conversation practice with vocabulary notes.", "€19/hour", "hourly", "Weekends", "language-help"], ["CV review", "Structure, wording, and application polish.", "€25 fixed price", "fixed", "Sunday", "creative-skills"]]],
  ["nathan-robert", "Nathan Robert", "Nathan R.", "École Polytechnique", "15e - Convention", "2.2 km away", ["Coding", "Laptop troubleshooting", "Maths"], ["tech-help", "tutoring"], "Computer science student who can debug laptops, explain code, and help with maths foundations.", 4.9, 22, "Available now", "Usually replies in 10 min", photos[7], ["French", "English"], true, [["Coding help", "Debugging, Python basics, and project structure.", "€32/hour", "hourly", "Evenings", "tech-help"], ["Laptop troubleshooting", "Slow laptop, software setup, backups, and Wi-Fi issues.", "€26/hour", "hourly", "Today", "tech-help"]]],
  ["sarah-nguyen", "Sarah Nguyen", "Sarah N.", "American University of Paris", "7e - Invalides", "2.0 km away", ["Photography", "Video editing", "Social content"], ["photography", "creative-skills"], "Media student creating natural portraits, party photography, and short-form social edits.", 4.9, 18, "Available Friday", "Usually replies in 14 min", photos[10], ["English", "French", "Vietnamese"], true, [["Party photography", "Student birthdays, society events, and quick edit delivery.", "€38/hour", "hourly", "Friday nights", "photography"], ["Video editing", "Short reels, captions, and simple color correction.", "€35/hour", "hourly", "Online", "creative-skills"]]],
  ["adam-levy", "Adam Levy", "Adam L.", "EDHEC", "17e - Batignolles", "1.2 km away", ["Dog walking", "Pet sitting", "Plant sitting"], ["pet-sitting", "errands"], "Reliable pet sitter around Batignolles, with calm dog walks and plant care while you travel.", 4.6, 7, "Available today", "Usually replies in 22 min", photos[9], ["French", "English"], true, [["Dog walking", "Neighborhood walks with water and a short update after.", "€16/hour", "hourly", "Mornings", "pet-sitting"], ["Plant sitting", "Watering, light checks, and photo updates.", "€18 fixed price", "fixed", "Weekends", "errands"]]],
  ["maya-bernard", "Maya Bernard", "Maya B.", "SKEMA", "10e - Canal Saint-Martin", "1.5 km away", ["Makeup", "Event prep", "Thrift styling"], ["creative-skills", "event-help"], "Creative student helping with makeup, outfit styling, and small event prep before student nights.", 4.8, 11, "Available this weekend", "Usually replies in 30 min", photos[11], ["French", "English"], true, [["Makeup for events", "Simple, polished makeup for dinners, photos, and student events.", "€35 fixed price", "fixed", "Friday", "creative-skills"], ["Thrift styling", "Outfit planning and vintage-shop styling around Paris.", "€22/hour", "hourly", "Saturday", "creative-skills"]]],
  ["lucas-meyer", "Lucas Meyer", "Lucas M.", "Université Paris-Saclay", "Levallois", "4.8 km away", ["Bike repair", "Moving boxes", "Assembly"], ["bike-repair", "moving-help", "assembly"], "Hands-on student with bike tools, moving experience, and a practical approach to repairs.", 4.7, 16, "Available tonight", "Usually replies in 19 min", photos[3], ["French", "German", "English"], true, [["Bike repair", "Punctures, brakes, chains, and commuter checks.", "€20/hour", "hourly", "Tonight", "bike-repair"], ["Heavy lifting", "Boxes, couches, and careful stair carrying.", "€21/hour", "hourly", "Weekends", "moving-help"]]],
  ["zoe-petit", "Zoé Petit", "Zoé P.", "PSB Paris School of Business", "8e - Europe", "2.7 km away", ["Presentation design", "Canva", "Pitch decks"], ["creative-skills"], "Business student making presentations cleaner, sharper, and easier to follow.", 5, 6, "Available tomorrow", "Usually replies in 11 min", photos[0], ["French", "English"], true, [["Presentation design", "Slides, visual hierarchy, and light copy polish.", "€24/hour", "hourly", "Online", "creative-skills"], ["Pitch review", "Structure and delivery notes for class presentations.", "€28/hour", "hourly", "Online", "creative-skills"]]],
  ["omar-haddad", "Omar Haddad", "Omar H.", "Sorbonne Université", "18e - Jules Joffrin", "3.5 km away", ["Guitar", "Music theory", "DJ basics"], ["creative-skills"], "Music student offering relaxed guitar lessons, theory basics, and beginner DJ setup.", 4.6, 5, "New on Etudo", "Usually replies in 1 hour", photos[1], ["French", "English", "Arabic"], false, [["Guitar lesson", "Beginner chords, rhythm, and song practice.", "€20/hour", "hourly", "Weeknights", "creative-skills"], ["DJ basics", "Intro to transitions, playlists, and controller setup.", "€25/hour", "hourly", "Sunday", "creative-skills"]]],
  ["julia-kowalski", "Julia Kowalski", "Julia K.", "Université Paris Cité", "12e - Daumesnil", "2.1 km away", ["Sewing", "Alterations", "Errands"], ["creative-skills", "errands"], "Medical student who does simple clothing repairs, trouser hems, and quick errands near the 12e.", 4.8, 12, "Available this weekend", "Usually replies in 28 min", photos[8], ["French", "Polish", "English"], true, [["Clothing alterations", "Trouser hems, buttons, and simple repairs.", "€18 fixed price", "fixed", "Weekends", "creative-skills"], ["Quick errands", "Pickup, drop-off, and pharmacy runs.", "€16/hour", "hourly", "Evenings", "errands"]]],
  ["tom-marchand", "Tom Marchand", "Tom M.", "ESCP Business School", "17e - Ternes", "0.9 km away", ["Leboncoin pickup", "Moving help", "Furniture transport"], ["moving-help", "errands"], "Business student with a cargo bike for small pickups, chairs, lamps, and awkward boxes.", 4.9, 25, "Available now", "Usually replies in 7 min", photos[7], ["French", "English"], true, [["Leboncoin pickup", "Coordinate pickup and bring small items across Paris.", "€30 fixed price", "fixed", "Today", "errands"], ["Moving boxes", "Carrying boxes and small furniture up stairs.", "€20/hour", "hourly", "Tonight", "moving-help"]]],
  ["fatima-el-mansouri", "Fatima El Mansouri", "Fatima E.", "Sciences Po Paris", "3e - Arts et Métiers", "1.7 km away", ["French proofreading", "Politics", "English"], ["language-help", "tutoring"], "Graduate student helping with French essays, proofreading, and political science concepts.", 4.7, 8, "Available tomorrow", "Usually replies in 40 min", photos[4], ["French", "English", "Arabic"], true, [["French proofreading", "Grammar, clarity, and structure for short assignments.", "€22/hour", "hourly", "Online", "language-help"], ["Political science tutoring", "Concept review and essay planning.", "€26/hour", "hourly", "Evenings", "tutoring"]]],
  ["benjamin-cohen", "Benjamin Cohen", "Benjamin C.", "Université Paris Dauphine - PSL", "16e - Passy", "3.4 km away", ["Accounting", "Economics", "Excel"], ["tutoring", "tech-help"], "Dauphine student who explains accounting and economics clearly before exams.", 4.5, 3, "New on Etudo", "Usually replies in 2 hours", photos[9], ["French", "English"], true, [["Accounting help", "Balance sheets, journal entries, and revision exercises.", "€24/hour", "hourly", "Evenings", "tutoring"], ["Economics tutoring", "Micro, macro, and exam practice.", "€24/hour", "hourly", "Online", "tutoring"]]],
  ["clara-dubois", "Clara Dubois", "Clara D.", "American University of Paris", "6e - Saint-Placide", "1.3 km away", ["English tutoring", "Essay editing", "Babysitting"], ["language-help"], "AUP student helping with English conversation, essays, and careful occasional family support.", 4.9, 20, "Available this weekend", "Usually replies in 12 min", photos[2], ["English", "French"], true, [["English tutoring", "Conversation, essays, and interview confidence.", "€23/hour", "hourly", "Weekends", "language-help"], ["Essay editing", "Line edits and clearer argument structure.", "€26/hour", "hourly", "Online", "language-help"]]],
  ["sacha-leroux", "Sacha Leroux", "Sacha L.", "CentraleSupélec", "Boulogne", "4.5 km away", ["Piano", "Chess", "Maths"], ["creative-skills", "tutoring"], "Engineering student teaching beginner piano, chess strategy, and patient maths support.", 4.6, 4, "New on Etudo", "Usually replies in 55 min", photos[5], ["French", "English"], false, [["Piano lesson", "Beginner technique and simple pieces.", "€24/hour", "hourly", "Saturday", "creative-skills"], ["Chess coaching", "Openings, tactics, and game review.", "€20/hour", "hourly", "Online", "creative-skills"]]],
  ["elise-fournier", "Élise Fournier", "Élise F.", "Université Paris 1 Panthéon-Sorbonne", "5e - Panthéon", "0.7 km away", ["Art history", "French", "Museum visits"], ["tutoring", "language-help"], "Art history student offering French practice and relaxed museum-based study sessions.", 4.8, 15, "Available today", "Usually replies in 21 min", photos[10], ["French", "English", "Italian"], true, [["French conversation", "Conversation walks and vocabulary notes.", "€19/hour", "hourly", "Afternoons", "language-help"], ["Art history tutoring", "Concepts, image analysis, and exam prep.", "€24/hour", "hourly", "Online", "tutoring"]]],
  ["mehdi-ait", "Mehdi Ait", "Mehdi A.", "École Polytechnique", "15e - Balard", "2.6 km away", ["Coding", "Calculus", "Wi-Fi"], ["tech-help", "tutoring"], "Engineering student for coding, calculus, and practical home tech issues.", 4.9, 32, "Available tonight", "Usually replies in 9 min", photos[11], ["French", "English", "Arabic"], true, [["Calculus help", "Step-by-step problem solving and recap notes.", "€31/hour", "hourly", "Evenings", "tutoring"], ["Wi-Fi troubleshooting", "Router setup, speed checks, and device connection issues.", "€28/hour", "hourly", "Today", "tech-help"]]],
  ["anna-schmidt", "Anna Schmidt", "Anna S.", "EDHEC", "9e - Saint-Georges", "2.3 km away", ["German", "CV review", "Presentation design"], ["language-help", "creative-skills"], "EDHEC student helping with German conversation, CV polish, and clean presentation design.", 4.7, 13, "Available tomorrow", "Usually replies in 24 min", photos[0], ["German", "French", "English"], true, [["German conversation", "Speaking practice and vocabulary notes.", "€22/hour", "hourly", "Online", "language-help"], ["CV review", "Recruiting-focused CV feedback.", "€28 fixed price", "fixed", "Tomorrow", "creative-skills"]]],
  ["noah-perrin", "Noah Perrin", "Noah P.", "Université Paris-Saclay", "13e - Place d'Italie", "2.0 km away", ["IKEA assembly", "Moving", "Bike repair"], ["assembly", "moving-help", "bike-repair"], "Practical student for IKEA builds, bike fixes, and careful carrying around south Paris.", 4.8, 17, "Available this weekend", "Usually replies in 17 min", photos[1], ["French", "English"], true, [["IKEA assembly", "Wardrobes, desks, shelves, and missing-screw problem solving.", "€23/hour", "hourly", "Sunday", "assembly"], ["Bike check", "Basic brakes, chain, tyre pressure, and commuter setup.", "€18/hour", "hourly", "Saturday", "bike-repair"]]],
  ["lina-park", "Lina Park", "Lina P.", "SKEMA", "2e - Sentier", "1.4 km away", ["Mandarin", "Social media", "Photography"], ["language-help", "photography"], "Marketing student offering Mandarin conversation and quick social content shoots.", 4.6, 6, "Available Friday", "Usually replies in 38 min", photos[6], ["Mandarin", "English", "French"], true, [["Mandarin conversation", "Speaking practice and vocabulary for beginners.", "€21/hour", "hourly", "Online", "language-help"], ["Social content photos", "Casual profile and product-style photos.", "€40 fixed price", "fixed", "Friday", "photography"]]],
  ["paul-girard", "Paul Girard", "Paul G.", "PSB Paris School of Business", "10e - République", "1.1 km away", ["DJ lessons", "Event setup", "Moving"], ["creative-skills", "event-help", "moving-help"], "Student DJ who can teach beginner mixing, help set up small events, and carry equipment.", 4.7, 10, "Available tonight", "Usually replies in 27 min", photos[3], ["French", "English"], false, [["DJ lesson", "Controller basics, transitions, and playlist flow.", "€26/hour", "hourly", "Evenings", "creative-skills"], ["Event setup", "Tables, speakers, check-in, and tidy teardown.", "€20/hour", "hourly", "Weekends", "event-help"]]],
  ["riya-shah", "Riya Shah", "Riya S.", "HEC Paris", "Neuilly", "5.0 km away", ["Finance", "Accounting", "Presentation"], ["tutoring", "creative-skills"], "Finance student helping with accounting exercises, pitch decks, and business-school prep.", 4.9, 19, "Available tomorrow", "Usually replies in 13 min", photos[8], ["English", "French", "Hindi"], true, [["Finance tutoring", "Valuation basics, accounting, and case prep.", "€34/hour", "hourly", "Online", "tutoring"], ["Pitch deck review", "Storyline, slide flow, and visual cleanup.", "€30/hour", "hourly", "Online", "creative-skills"]]],
  ["antoine-blanc", "Antoine Blanc", "Antoine B.", "Sorbonne Université", "20e - Gambetta", "3.9 km away", ["Cat sitting", "Errands", "Plant care"], ["pet-sitting", "errands"], "Calm, reliable helper for cats, plants, and everyday errands on the east side of Paris.", 4.8, 11, "Available today", "Usually replies in 18 min", photos[9], ["French", "English"], true, [["Cat sitting", "Feeding, litter refresh, play, and short updates.", "€17/hour", "hourly", "Today", "pet-sitting"], ["Plant care", "Watering and basic checks while you are away.", "€18 fixed price", "fixed", "Weekends", "errands"]]],
  ["diane-morel", "Diane Morel", "Diane M.", "Sciences Po Paris", "7e - Solférino", "2.1 km away", ["Event hosting", "Makeup", "Photography"], ["event-help", "creative-skills", "photography"], "Experienced society volunteer for hosting, event prep, simple makeup, and group photos.", 5, 29, "Available Friday", "Usually replies in 8 min", photos[10], ["French", "English"], true, [["Event hosting", "Guest check-in, hosting support, and setup coordination.", "€27/hour", "hourly", "Friday", "event-help"], ["Event makeup", "Simple polished makeup before student events.", "€35 fixed price", "fixed", "Friday", "creative-skills"]]],
];

export const students: Student[] = [
  ...studentSeeds.map((seed, index) => createStudent(seed, index)),
  ...moreSeeds.map((seed, index) => {
    const [
      id,
      fullName,
      displayName,
      university,
      area,
      distance,
      skills,
      categoriesList,
      bio,
      rating,
      reviews,
      availabilityTag,
      responseTime,
      photo,
      languages,
      verified,
      serviceSeed,
    ] = seed;
    const lowestPrice = Math.min(
      ...serviceSeed.map((item) => Number(item[2].match(/\d+/)?.[0] || 20)),
    );
    return createStudent(
      {
        id,
        fullName,
        displayName,
        university,
        photo,
        area,
        distance,
        bio,
        skills,
        categories: categoriesList,
        serviceSeed,
        startingPrice: `€${lowestPrice}/hour`,
        startingPriceValue: lowestPrice,
        rating,
        reviews,
        availability: availabilityTag,
        availabilityTag,
        responseTime,
        responseRate: reviews <= 6 ? undefined : `${88 + (index % 12)}% response rate`,
        completedTasks: reviews <= 6 ? undefined : Math.max(3, Math.round(reviews / 2)),
        repeatBookings: reviews <= 6 ? undefined : index % 5,
        languages,
        serviceAreas: [area.split(" - ")[0], "Paris"],
        verified,
        newOnEtudo: reviews <= 6,
      },
      index + 6,
    );
  }),
];

export const openRequests: OpenRequest[] = [
  ["dog-walk-levallois", "Walk my dog tomorrow morning", "Pet care", "Levallois", "Tomorrow morning", "45 min", "€25", "Chloé", 4.9, 5, "Posted 12 min ago", "In person"],
  ["six-boxes-17e", "Help me move six boxes", "Moving help", "17e - Batignolles", "Saturday", "2 hours", "€45", "Max", 4.7, 8, "Posted 22 min ago", "In person"],
  ["carry-couch-11e", "Carry a couch upstairs", "Moving help", "11e - Oberkampf", "Tonight", "1 hour", "€30", "Jade", 4.8, 4, "Posted 37 min ago", "In person"],
  ["maths-exam-online", "Maths help before exam", "Tutoring", "Online", "Tonight", "90 min", "€32/hour", "Leo", 4.6, 7, "Posted 1 hour ago", "Online"],
  ["excel-model-escp", "Help with Excel model", "Tech help", "ESCP / 17e", "Tomorrow", "2 hours", "€30/hour", "Amir", 4.9, 6, "Posted 1 hour ago", "Hybrid"],
  ["leboncoin-chair", "Pick up chair from Leboncoin", "Everyday errands", "10e to 17e", "Sunday", "90 min", "€30", "Sofia", 5, 9, "Posted 2 hours ago", "In person"],
  ["birthday-photo", "Birthday photography", "Photography", "5e - Mouffetard", "Friday", "2 hours", "€85", "Inès", 4.7, 3, "Posted 2 hours ago", "In person"],
  ["ikea-wardrobe", "Build IKEA wardrobe", "Furniture assembly", "15e - Convention", "Sunday", "3 hours", "€75", "Arthur", 4.8, 11, "Posted 3 hours ago", "In person"],
  ["french-weekly", "French conversation practice", "Language help", "6e or online", "Weekly", "1 hour", "€17/hour", "Mia", 4.6, 4, "Posted 3 hours ago", "Hybrid"],
  ["dog-sitting-batignolles", "Dog sitting Saturday afternoon", "Pet care", "Batignolles", "Saturday afternoon", "4 hours", "€55", "Noémie", 4.9, 12, "Posted 4 hours ago", "In person"],
  ["laptop-setup-13e", "Laptop setup before internship", "Tech help", "13e - Tolbiac", "Tonight", "1 hour", "€25", "Sam", 4.5, 2, "Posted 4 hours ago", "In person"],
  ["presentation-design", "Presentation design cleanup", "Creative skills", "Online", "Tomorrow", "2 hours", "€50", "Lou", 4.8, 6, "Posted 5 hours ago", "Online"],
  ["trouser-hem", "Sew trouser hem", "Creative skills", "16e - Passy", "This weekend", "1 hour", "€18", "Ben", 4.7, 2, "Posted yesterday", "In person"],
  ["carry-luggage", "Help carry luggage", "Everyday errands", "Montparnasse", "Tomorrow morning", "45 min", "€20", "Ava", 4.9, 4, "Posted yesterday", "In person"],
  ["cat-visit", "Cat visit while I am away", "Pet care", "20e - Gambetta", "Sunday evening", "30 min", "€18", "Pauline", 5, 6, "Posted yesterday", "In person"],
  ["bike-flat", "Fix flat bike tyre", "Bike repair", "Canal Saint-Martin", "Today", "45 min", "€22", "Matteo", 4.8, 3, "Posted yesterday", "In person"],
  ["guitar-first-lesson", "Beginner guitar lesson", "Creative skills", "Online or 18e", "This weekend", "1 hour", "€20/hour", "Eli", 4.6, 5, "Posted yesterday", "Hybrid"],
  ["proofread-french", "Proofread French cover letter", "Language help", "Online", "Tonight", "45 min", "€22", "Lina", 4.7, 9, "Posted yesterday", "Online"],
  ["party-setup", "Small party setup help", "Event help", "3e - République", "Friday", "2 hours", "€42", "Thomas", 4.8, 5, "Posted 2 days ago", "In person"],
  ["plant-sitting", "Water plants next week", "Everyday errands", "11e - Voltaire", "Next week", "20 min", "€18", "Zoé", 4.9, 2, "Posted 2 days ago", "In person"],
  ["mandarin-practice", "Mandarin conversation practice", "Language help", "Online", "Weekly", "1 hour", "€21/hour", "Daniel", 4.5, 4, "Posted 2 days ago", "Online"],
  ["portrait-photo", "Need profile photos", "Photography", "7e - Invalides", "Saturday", "1 hour", "€45", "Marion", 4.8, 7, "Posted 3 days ago", "In person"],
].map(([id, title, category, area, timing, duration, budget, postedBy, posterRating, interested, postedAgo, mode]) => ({
  id: id as string,
  title: title as string,
  category: category as string,
  area: area as string,
  timing: timing as string,
  duration: duration as string,
  budget: budget as string,
  postedBy: postedBy as string,
  posterRating: posterRating as number,
  interested: interested as number,
  postedAgo: postedAgo as string,
  mode: mode as OpenRequest["mode"],
}));

export const conversations: Conversation[] = [
  {
    id: "camille",
    name: "Camille M.",
    avatar: students[0].photo,
    preview: "Yes, I can come around 18:30.",
    time: "12 min",
    messages: [
      { from: "them", text: "Yes, I can come around 18:30.", time: "18:02" },
      { from: "me", text: "Perfect, the entrance is on the courtyard side.", time: "18:04" },
    ],
  },
  {
    id: "hugo",
    name: "Hugo L.",
    avatar: students[3].photo,
    preview: "How many boxes do you have?",
    time: "28 min",
    messages: [
      { from: "them", text: "How many boxes do you have?", time: "17:42" },
      { from: "me", text: "Six medium boxes and one desk chair.", time: "17:46" },
    ],
  },
  {
    id: "emma",
    name: "Emma C.",
    avatar: students[6].photo,
    preview: "I can help with statistics tonight if you send the chapter.",
    time: "1 h",
    messages: [
      { from: "them", text: "I can help with statistics tonight if you send the chapter.", time: "16:20" },
      { from: "me", text: "Great, I will send the regression section.", time: "16:23" },
    ],
  },
];

export const notifications = [
  "Camille accepted your moving request",
  "3 students are interested in your open request",
  "Hugo replied to your message",
  "Your booking starts tomorrow at 18:00",
];

export const bookingHistory = [
  { student: students[3], service: "Moving help", date: "June 18", status: "Completed" },
  { student: students[0], service: "French conversation", date: "June 7", status: "Completed" },
  { student: students[2], service: "Event support", date: "May 29", status: "Completed" },
];

export const popularCategories = categories.filter((category) =>
  ["moving-help", "tutoring", "assembly", "tech-help", "pet-sitting", "errands"].includes(
    category.slug,
  ),
);

export const sortOptions = ["Recommended", "Highest rated", "Lowest price", "Fastest response"];
export const availabilityOptions = ["Any time", "Available now", "Available today", "Tonight", "This weekend", "Online"];
export const priceOptions = ["Any price", "Under €20/hour", "€20-€30/hour", "€30+/hour"];
export const universityOptions = ["Any university", ...Array.from(new Set(students.map((student) => student.university)))];
export const languageOptions = ["Any language", "French", "English", "Spanish", "Mandarin", "Arabic", "German", "Italian"];

export const searchSuggestions = [
  "Dog walking",
  "Moving help",
  "Maths tutor",
  "Build IKEA wardrobe",
  "Birthday photographer",
  "Laptop setup",
  "French conversation",
  "Presentation design",
];

const correctionRules = [
  { canonical: "dog walking", terms: ["dig wadlking", "dig alking", "dog waling", "walk my puppy", "pet walker", "dog sitter", "dog walker"] },
  { canonical: "maths tutoring", terms: ["math touter", "math help", "calculus help", "statistics tutor", "math tutor"] },
  { canonical: "furniture assembly", terms: ["build ikea", "assemble desk", "put wardrobe together", "ikea wardrobe"] },
  { canonical: "moving help", terms: ["moving boxes", "carry couch", "help move apartment", "heavy lifting"] },
  { canonical: "photography", terms: ["take pics", "birthday photographer", "portrait photos", "party photographer"] },
  { canonical: "tech help", terms: ["computer help", "wifi broken", "laptop setup", "wifi help"] },
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function correctSearchQuery(query = "") {
  const normalized = normalize(query);
  if (!normalized) return "";

  const directRule = correctionRules.find((rule) =>
    rule.terms.some((term) => normalize(term) === normalized || normalized.includes(normalize(term))),
  );

  if (directRule) return directRule.canonical;

  const fuzzyRule = correctionRules.find((rule) =>
    rule.terms.some((term) => tokenOverlap(normalized, normalize(term)) >= 0.45),
  );

  return fuzzyRule?.canonical || query.trim();
}

function tokenOverlap(a: string, b: string) {
  const aTokens = new Set(a.split(" ").filter(Boolean));
  const bTokens = b.split(" ").filter(Boolean);
  if (!aTokens.size || !bTokens.length) return 0;
  return bTokens.filter((token) => aTokens.has(token) || [...aTokens].some((item) => levenshtein(item, token) <= 2)).length / bTokens.length;
}

function levenshtein(a: string, b: string) {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j += 1) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      matrix[i][j] =
        a[i - 1] === b[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[a.length][b.length];
}

export function findStudent(id: string) {
  return students.find((student) => student.id === id);
}

export function findCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function searchStudents(query = "", category = "") {
  const corrected = correctSearchQuery(query);
  const normalizedQuery = normalize(corrected);
  const normalizedOriginal = normalize(query);
  const normalizedCategory = category.trim().toLowerCase();

  return students.filter((student) => {
    const categoryAliases = categories
      .filter((item) => student.categories.includes(item.slug))
      .flatMap((item) => [item.name, ...item.tags, ...item.aliases]);
    const haystack = [
      student.displayName,
      student.fullName,
      student.university,
      student.area,
      student.bio,
      ...student.skills,
      ...student.languages,
      ...student.serviceAreas,
      ...student.capabilities.map((capability) => `${capability.service} ${capability.description}`),
      ...student.categories,
      ...categoryAliases,
      ...student.services.flatMap((service) => [
        service.name,
        service.description,
        service.category,
      ]),
    ]
      .join(" ");

    const normalizedHaystack = normalize(haystack);
    const matchesQuery =
      !normalizedQuery ||
      normalizedHaystack.includes(normalizedQuery) ||
      normalizedHaystack.includes(normalizedOriginal) ||
      tokenOverlap(normalizedQuery, normalizedHaystack) > 0.22;
    const matchesCategory =
      !normalizedCategory || student.categories.includes(normalizedCategory);

    return matchesQuery && matchesCategory;
  });
}

export function studentServesArrondissement(student: Student, arrondissement: number) {
  const label = `${arrondissement}e`;
  return student.baseArrondissement === arrondissement || student.serviceAreas.some((area) => area.startsWith(label));
}

export function countStudentsByArrondissement(studentList: Student[]) {
  return Object.fromEntries(
    arrondissements.map((arrondissement) => [
      arrondissement.number,
      studentList.filter((student) => studentServesArrondissement(student, arrondissement.number)).length,
    ]),
  ) as Record<number, number>;
}

export function getPrimaryService(student: Student, category?: string, query?: string) {
  const corrected = correctSearchQuery(query || "");
  const normalizedQuery = normalize(corrected);
  return (
    student.services.find((service) => category && service.category === category) ||
    student.services.find((service) => normalizedQuery && normalize(service.name).includes(normalizedQuery)) ||
    student.services.find((service) => normalizedQuery && normalize(service.description).includes(normalizedQuery)) ||
    student.services[0]
  );
}
