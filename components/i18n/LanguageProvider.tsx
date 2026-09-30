"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type EtudoLanguage = "en" | "fr" | "cs";
type Translation = { fr: string; cs: string };

const translations: Record<string, Translation> = {
  "Student-to-student academics in Paris.": { fr: "L'accompagnement académique entre étudiants à Paris.", cs: "Akademická pomoc mezi studenty v Paříži." },
  "Learn from students who already took your course.": { fr: "Apprenez avec des étudiants qui ont déjà suivi votre cours.", cs: "Učte se od těch, co váš kurz absolvovali." },
  "Find verified student mentors and course notes from students who know your university, professor, and class.": { fr: "Trouvez des mentors étudiants vérifiés et des notes de cours créées par des étudiants qui connaissent votre université, votre professeur et votre cours.", cs: "Najděte ověřené studentské mentory a studijní materiály od studentů, kteří znají vaši univerzitu, vyučujícího i konkrétní kurz." },
  "Find a Mentor": { fr: "Trouver un mentor", cs: "Najít mentora" },
  "Browse Notes": { fr: "Parcourir les notes", cs: "Procházet poznámky" },
  "Popular searches:": { fr: "Recherches populaires :", cs: "Oblíbená vyhledávání:" },
  "Course-first discovery": { fr: "Recherche par cours", cs: "Hledání podle kurzu" },
  "Your course. Your professor.": { fr: "Votre cours. Votre professeur.", cs: "Váš kurz. Váš vyučující." },
  "Someone who's already done it.": { fr: "Quelqu'un qui l'a déjà suivi.", cs: "Někdo, kdo už ho absolvoval." },
  "Etudo connects students with verified mentors who already completed the same university courses, often with the same professor.": { fr: "Etudo met en relation les étudiants avec des mentors vérifiés qui ont déjà validé les mêmes cours universitaires, souvent avec le même professeur.", cs: "Etudo propojuje studenty s ověřenými mentory, kteří už stejné univerzitní kurzy absolvovali, často i u stejného vyučujícího." },
  "Mentors + Notes": { fr: "Mentors + Notes", cs: "Mentoři + poznámky" },
  "Verified mentors": { fr: "Mentors vérifiés", cs: "Ověření mentoři" },
  "Course-specific help across the city.": { fr: "De l'aide adaptée à votre cours, partout dans Paris.", cs: "Pomoc ke konkrétním kurzům po celé Paříži." },
  "Compare mentors by university, course, professor, price, rating, verification, and availability.": { fr: "Comparez les mentors par université, cours, professeur, prix, note, vérification et disponibilité.", cs: "Porovnejte mentory podle univerzity, kurzu, vyučujícího, ceny, hodnocení, ověření a dostupnosti." },
  "Paris mentor map": { fr: "Carte des mentors à Paris", cs: "Mapa mentorů v Paříži" },
  "Academic help across Paris.": { fr: "De l'aide académique partout dans Paris.", cs: "Akademická pomoc po celé Paříži." },
  "Explore verified mentors by university area, course, subject, availability, and online or in-person format.": { fr: "Explorez les mentors vérifiés par quartier universitaire, cours, matière, disponibilité et format en ligne ou en présentiel.", cs: "Prozkoumejte ověřené mentory podle univerzitní lokality, kurzu, předmětu, dostupnosti a online či osobní formy." },
  "A typical Etudo day": { fr: "Une journée type avec Etudo", cs: "Typický den s Etudo" },
  "Open left page": { fr: "Page de gauche", cs: "Levá stránka" },
  "Your knowledge has value.": { fr: "Vos connaissances ont de la valeur.", cs: "Vaše znalosti mají hodnotu." },
  "You already passed the course. Help another student do the same.": { fr: "Vous avez déjà validé ce cours. Aidez un autre étudiant à en faire autant.", cs: "Kurz už jste zvládli. Pomozte dalšímu studentovi zvládnout ho také." },
  "Open right page": { fr: "Page de droite", cs: "Pravá stránka" },
  "Earn with what you already know.": { fr: "Gagnez de l'argent grâce à ce que vous savez déjà.", cs: "Vydělávejte na tom, co už umíte." },
  "Set your mentoring rate.": { fr: "Fixez votre tarif de mentorat.", cs: "Nastavte si cenu za mentoring." },
  "Choose your availability.": { fr: "Choisissez vos disponibilités.", cs: "Vyberte si svou dostupnost." },
  "Sell notes from courses you completed.": { fr: "Vendez vos notes des cours que vous avez validés.", cs: "Prodávejte poznámky z kurzů, které jste absolvovali." },
  "Turn course experience into useful academic support for another student.": { fr: "Transformez votre expérience du cours en aide académique utile pour un autre étudiant.", cs: "Proměňte zkušenosti z kurzu v užitečnou akademickou podporu pro dalšího studenta." },
  "Your course notes have a next chapter.": { fr: "Vos notes de cours peuvent avoir une seconde vie.", cs: "Vaše poznámky mohou pokračovat dál." },
  "Become a Mentor": { fr: "Devenir mentor", cs: "Staňte se mentorem" },
  "Sell Notes": { fr: "Vendre des notes", cs: "Prodat poznámky" },
  "Etudo Pulse": { fr: "Etudo Pulse", cs: "Etudo Pulse" },
  "Academic activity around Paris": { fr: "Activité académique à Paris", cs: "Akademická aktivita v Paříži" },
  "Notes Marketplace": { fr: "Marché des notes", cs: "Tržiště studijních poznámek" },
  "Made for the class you're actually taking.": { fr: "Conçues pour le cours que vous suivez vraiment.", cs: "Vytvořeno pro kurz, který právě opravdu studujete." },
  "Preview and buy notes from students who already completed your course.": { fr: "Prévisualisez et achetez des notes d'étudiants qui ont déjà validé votre cours.", cs: "Prohlédněte si a kupujte poznámky od studentů, kteří už váš kurz absolvovali." },
  "How Etudo works": { fr: "Comment fonctionne Etudo", cs: "Jak Etudo funguje" },
  "How It Works": { fr: "Comment ça marche", cs: "Jak to funguje" },
  "One course can lead to a mentor, notes, or both.": { fr: "Un seul cours peut vous mener vers un mentor, des notes ou les deux.", cs: "Jeden kurz vás může dovést k mentorovi, poznámkám nebo k obojímu." },
  "Mentoring": { fr: "Mentorat", cs: "Mentoring" },
  "Find your course": { fr: "Trouvez votre cours", cs: "Najděte svůj kurz" },
  "Compare verified mentors": { fr: "Comparez les mentors vérifiés", cs: "Porovnejte ověřené mentory" },
  "Book a session": { fr: "Réservez une séance", cs: "Rezervujte si lekci" },
  "Learn from someone who already passed it": { fr: "Apprenez avec quelqu'un qui l'a déjà validé", cs: "Učte se od někoho, kdo už kurz zvládl" },
  "Notes": { fr: "Notes", cs: "Poznámky" },
  "Preview notes": { fr: "Prévisualiser les notes", cs: "Prohlédnout poznámky" },
  "Purchase": { fr: "Achetez", cs: "Kupte" },
  "Study": { fr: "Étudiez", cs: "Studujte" },
  "Built around trust": { fr: "Conçu autour de la confiance", cs: "Postaveno na důvěře" },
  "Find your course. Choose your next step.": { fr: "Trouvez votre cours. Choisissez la suite.", cs: "Najděte svůj kurz. Vyberte další krok." },
  "Etudo helps students compare verified course mentors, preview student notes, and learn from people who already took the class.": { fr: "Etudo aide les étudiants à comparer des mentors vérifiés pour leurs cours, prévisualiser des notes étudiantes et apprendre avec des personnes qui ont déjà suivi le cours.", cs: "Etudo pomáhá studentům porovnat ověřené mentory pro konkrétní kurzy, prohlížet studentské poznámky a učit se od lidí, kteří už daný kurz absolvovali." },
  "Student status verification": { fr: "Vérification du statut étudiant", cs: "Ověření statusu studenta" },
  "Course completion checks": { fr: "Vérification des cours validés", cs: "Ověření absolvování kurzu" },
  "Ratings and reviews": { fr: "Notes et avis", cs: "Hodnocení a recenze" },
  "Reporting and support": { fr: "Signalement et assistance", cs: "Nahlášení a podpora" },
  "Course-specific academic support, built for student life in Paris.": { fr: "Une aide académique adaptée aux cours, pensée pour la vie étudiante à Paris.", cs: "Akademická pomoc ke konkrétním kurzům, vytvořená pro studentský život v Paříži." },

  // Mentor signup page
  "Earn by helping students pass courses you already know.": { fr: "Gagnez de l’argent en aidant d’autres étudiants à réussir des cours que vous connaissez déjà.", cs: "Vydělávejte tím, že pomůžete studentům zvládnout kurzy, které už znáte." },
  "Add the courses you completed, show the professor context, set your price, and mentor around your studies.": { fr: "Ajoutez les cours que vous avez validés, indiquez le professeur, fixez votre tarif et organisez le mentorat autour de vos études.", cs: "Přidejte absolvované kurzy, uveďte vyučujícího, nastavte si cenu a přizpůsobte mentoring svému studiu." },
  "Mentor courses you have already completed": { fr: "Accompagnez des étudiants dans les cours que vous avez déjà validés", cs: "Pomáhejte s kurzy, které už jste absolvovali" },
  "Set your own hourly rate": { fr: "Fixez votre propre tarif horaire", cs: "Nastavte si vlastní hodinovou sazbu" },
  "Offer online or in-person sessions": { fr: "Proposez des séances en ligne ou en présentiel", cs: "Nabízejte online i osobní lekce" },
  "Build academic reputation": { fr: "Développez votre réputation académique", cs: "Budujte si akademickou reputaci" },
  "Verify course history privately": { fr: "Faites vérifier vos cours de manière confidentielle", cs: "Ověřte absolvované kurzy soukromě" },
  "Create your mentor profile": { fr: "Créez votre profil de mentor", cs: "Vytvořte si profil mentora" },
  "Start with one course. You can add more courses and note listings from your dashboard later.": { fr: "Commencez avec un cours. Vous pourrez ajouter d’autres cours et des notes depuis votre tableau de bord plus tard.", cs: "Začněte jedním kurzem. Další kurzy a nabídky poznámek můžete přidat později ze svého přehledu." },
  "Profile headline": { fr: "Titre du profil", cs: "Nadpis profilu" },
  "Financial Accounting mentor for ESCP students": { fr: "Mentor en Financial Accounting pour les étudiants de l’ESCP", cs: "Mentor Financial Accounting pro studenty ESCP" },
  "Course completed": { fr: "Cours validé", cs: "Absolvovaný kurz" },
  "Subject": { fr: "Matière", cs: "Předmět" },
  "Grade or result": { fr: "Note ou résultat", cs: "Známka nebo výsledek" },
  "17/20, A, distinction": { fr: "17/20, A, mention", cs: "17/20, A, vyznamenání" },
  "How you can help": { fr: "Comment vous pouvez aider", cs: "Jak můžete pomoci" },
  "Explain the exam, assignments, professor expectations, and topics you can mentor.": { fr: "Expliquez l’examen, les devoirs, les attentes du professeur et les sujets sur lesquels vous pouvez aider.", cs: "Popište zkoušku, úkoly, očekávání vyučujícího a témata, se kterými můžete pomoci." },
  "Hourly rate": { fr: "Tarif horaire", cs: "Hodinová sazba" },
  "Available days": { fr: "Jours disponibles", cs: "Dostupné dny" },
  "Monday, Wednesday, Saturday": { fr: "Lundi, mercredi, samedi", cs: "Pondělí, středa, sobota" },
  "Available times": { fr: "Heures disponibles", cs: "Dostupné časy" },
  "Session format": { fr: "Format de la séance", cs: "Forma lekce" },
  "Online and in person": { fr: "En ligne et en présentiel", cs: "Online i osobně" },
  "Online only": { fr: "En ligne uniquement", cs: "Pouze online" },
  "In person near campus": { fr: "En présentiel près du campus", cs: "Osobně poblíž kampusu" },
  "Languages": { fr: "Langues", cs: "Jazyky" },
  "French, English": { fr: "Français, anglais", cs: "Francouzština, angličtina" },
  "Course verification": { fr: "Vérification du cours", cs: "Ověření kurzu" },
  "Etudo may review student status, transcript details, or proof of course completion before displaying course-verified badges.": { fr: "Etudo peut vérifier le statut étudiant, des éléments du relevé de notes ou une preuve de validation du cours avant d’afficher le badge de cours vérifié.", cs: "Etudo může před zobrazením odznaku ověřeného kurzu zkontrolovat status studenta, údaje z výpisu známek nebo doklad o absolvování kurzu." },
  "Save draft": { fr: "Enregistrer le brouillon", cs: "Uložit koncept" },
  "Preview profile": { fr: "Prévisualiser le profil", cs: "Náhled profilu" },
  "Your mentor draft is ready to continue.": { fr: "Votre brouillon de profil mentor est prêt à être repris.", cs: "Koncept profilu mentora je připraven k dalším úpravám." },
  "Your mentor profile preview is ready.": { fr: "L’aperçu de votre profil mentor est prêt.", cs: "Náhled profilu mentora je připraven." },

  // Notes marketplace page
  "Study materials created by students who already took your course.": { fr: "Des supports d’étude créés par des étudiants qui ont déjà suivi votre cours.", cs: "Studijní materiály od studentů, kteří už váš kurz absolvovali." },
  "Search by university, course, professor, subject, title, or seller. Preview selected pages before buying.": { fr: "Recherchez par université, cours, professeur, matière, titre ou vendeur. Prévisualisez certaines pages avant l’achat.", cs: "Hledejte podle univerzity, kurzu, vyučujícího, předmětu, názvu nebo prodejce. Před nákupem si prohlédněte vybrané stránky." },
  "All Notes": { fr: "Toutes les notes", cs: "Všechny poznámky" },
  "Filters": { fr: "Filtres", cs: "Filtry" },
  "Reset": { fr: "Réinitialiser", cs: "Obnovit" },
  "Course, professor, seller": { fr: "Cours, professeur, vendeur", cs: "Kurz, vyučující, prodejce" },
  "Any subject": { fr: "Toutes les matières", cs: "Jakýkoli předmět" },
  "Price": { fr: "Prix", cs: "Cena" },
  "Any price": { fr: "Tous les prix", cs: "Jakákoli cena" },
  "Under €8": { fr: "Moins de 8 €", cs: "Do 8 €" },
  "Rating": { fr: "Évaluation", cs: "Hodnocení" },
  "Any rating": { fr: "Toutes les évaluations", cs: "Jakékoli hodnocení" },
  "Academic year": { fr: "Année universitaire", cs: "Akademický rok" },
  "Any year": { fr: "Toutes les années", cs: "Jakýkoli rok" },
  "File type": { fr: "Type de fichier", cs: "Typ souboru" },
  "Any file": { fr: "Tous les fichiers", cs: "Jakýkoli soubor" },
  "Slides": { fr: "Diapositives", cs: "Prezentace" },
  "Sort": { fr: "Trier", cs: "Řazení" },
  "Recommended": { fr: "Recommandé", cs: "Doporučené" },
  "Highest rated": { fr: "Mieux notés", cs: "Nejlépe hodnocené" },
  "Most purchased": { fr: "Plus achetés", cs: "Nejprodávanější" },
  "Newest": { fr: "Plus récents", cs: "Nejnovější" },
  "Price low to high": { fr: "Prix croissant", cs: "Cena od nejnižší" },
  "Price high to low": { fr: "Prix décroissant", cs: "Cena od nejvyšší" },
  "Apply filters": { fr: "Appliquer les filtres", cs: "Použít filtry" },
  "Organized by course, professor, university, and seller quality": { fr: "Classés par cours, professeur, université et qualité du vendeur", cs: "Uspořádáno podle kurzu, vyučujícího, univerzity a hodnocení prodejce" },
  "academic note packs": { fr: "packs de notes de cours", cs: "balíčky studijních poznámek" },
  "note packs": { fr: "packs de notes", cs: "balíčky poznámek" },

  "Search": { fr: "Rechercher", cs: "Hledat" },
  "Messages": { fr: "Messages", cs: "Zprávy" },
  "Notifications": { fr: "Notifications", cs: "Upozornění" },
  "Profile": { fr: "Profil", cs: "Profil" },
  "Tutoring sessions": { fr: "Séances de tutorat", cs: "Mentoringové lekce" },
  "Purchased notes": { fr: "Notes achetées", cs: "Zakoupené poznámky" },
  "Sell notes": { fr: "Vendre des notes", cs: "Prodat poznámky" },
  "Settings": { fr: "Paramètres", cs: "Nastavení" },
  "Saved notes": { fr: "Notes enregistrées", cs: "Uložené poznámky" },
  "Account": { fr: "Compte", cs: "Účet" },

  "Explore": { fr: "Explorer", cs: "Prozkoumat" },
  "Trust": { fr: "Confiance", cs: "Důvěra" },
  "Company": { fr: "Entreprise", cs: "Společnost" },
  "Academic verification": { fr: "Vérification académique", cs: "Akademické ověření" },
  "Safety": { fr: "Sécurité", cs: "Bezpečnost" },
  "Help centre": { fr: "Centre d'aide", cs: "Centrum nápovědy" },
  "About": { fr: "À propos", cs: "O nás" },
  "Contact": { fr: "Contact", cs: "Kontakt" },
  "Terms": { fr: "Conditions", cs: "Podmínky" },
  "Privacy": { fr: "Confidentialité", cs: "Soukromí" },
  "Course-specific mentors and student notes for university life.": { fr: "Des mentors par cours et des notes étudiantes pour la vie universitaire.", cs: "Mentoři pro konkrétní kurzy a studentské poznámky pro univerzitní život." },
  "Paris, France": { fr: "Paris, France", cs: "Paříž, Francie" },

  "University": { fr: "Université", cs: "Univerzita" },
  "Any university": { fr: "Toutes les universités", cs: "Jakákoli univerzita" },
  "Course": { fr: "Cours", cs: "Kurz" },
  "Professor": { fr: "Professeur", cs: "Vyučující" },
  "Course verified": { fr: "Cours vérifié", cs: "Kurz ověřen" },

  "Available tonight": { fr: "Disponible ce soir", cs: "Dostupný dnes večer" },
  "Online tomorrow": { fr: "En ligne demain", cs: "Online zítra" },
  "Friday 14:00": { fr: "Vendredi 14:00", cs: "Pátek 14:00" },
  "Monday 16:00": { fr: "Lundi 16:00", cs: "Pondělí 16:00" },
  "Campus-area availability": { fr: "Disponibilités autour du campus", cs: "Dostupnost v okolí kampusu" },
  "Online or campus study session": { fr: "Session en ligne ou sur le campus", cs: "Online nebo osobní studium na kampusu" },
  "Safe meeting areas near campus": { fr: "Lieux de rendez-vous sûrs près du campus", cs: "Bezpečná místa k setkání poblíž kampusu" },
  "Arrondissement-level mentor area": { fr: "Zone des mentors par arrondissement", cs: "Oblast mentorů podle pařížského obvodu" },
  "Three verified mentors around ESCP know Professor Dupont's accounting cases.": { fr: "Trois mentors vérifiés autour de l'ESCP connaissent les études de cas comptables du professeur Dupont.", cs: "Tři ověření mentoři v okolí ESCP znají účetní případové studie profesora Duponta." },
  "Compare mentors who already completed the same Dauphine problem sets.": { fr: "Comparez des mentors qui ont déjà réalisé les mêmes séries d'exercices à Dauphine.", cs: "Porovnejte mentory, kteří už řešili stejné sady úloh na Dauphine." },
  "Find mentors for linear algebra, proof structure, and exam preparation.": { fr: "Trouvez des mentors pour l'algèbre linéaire, la structure des démonstrations et la préparation aux examens.", cs: "Najděte mentory pro lineární algebru, strukturu důkazů a přípravu na zkoušky." },
  "Book law mentoring around essay structure, case law, and seminar preparation.": { fr: "Réservez un mentorat en droit pour la structure des dissertations, la jurisprudence et la préparation des séminaires.", cs: "Rezervujte si mentoring z práva zaměřený na strukturu eseje, judikaturu a přípravu na semináře." },
  "Camille opened two Financial Accounting slots near ESCP.": { fr: "Camille a ouvert deux créneaux de Financial Accounting près de l'ESCP.", cs: "Camille otevřela dva termíny Financial Accounting poblíž ESCP." },
  "A new Corporate Finance case-note pack was added today.": { fr: "Un nouveau pack de notes de cas de Corporate Finance a été ajouté aujourd'hui.", cs: "Dnes byl přidán nový balíček poznámek k případovým studiím z Corporate Finance." },
  "Youssef is available online for Microeconomics tomorrow.": { fr: "Youssef est disponible en ligne demain pour Microeconomics.", cs: "Youssef je zítra dostupný online pro Microeconomics." },
  "Léa added Linear Algebra problem sheet notes.": { fr: "Léa a ajouté des notes sur les feuilles d'exercices de Linear Algebra.", cs: "Léa přidala poznámky k úlohám z Linear Algebra." },
  "Marc can review European Law essay plans this week.": { fr: "Marc peut relire des plans de dissertation d'European Law cette semaine.", cs: "Marc může tento týden zkontrolovat osnovy esejí z European Law." }
};

function translateCore(text: string, language: EtudoLanguage) {
  if (language === "en") return text;
  const direct = translations[text];
  if (direct) return direct[language];

  const soldBy = text.match(/^Sold by (.+)$/);
  if (soldBy) return language === "fr" ? `Vendu par ${soldBy[1]}` : `Prodává ${soldBy[1]}`;
  const grade = text.match(/^Grade received: (.+)$/);
  if (grade) return language === "fr" ? `Note obtenue : ${grade[1]}` : `Získaná známka: ${grade[1]}`;
  const updated = text.match(/^Updated (.+)$/);
  if (updated) return language === "fr" ? `Mis à jour ${updated[1]}` : `Aktualizováno ${updated[1]}`;
  const pages = text.match(/^(\d+) pages$/);
  if (pages) return language === "fr" ? `${pages[1]} pages` : `${pages[1]} stran`;
  const purchases = text.match(/^(\d+) purchases$/);
  if (purchases) return language === "fr" ? `${purchases[1]} achats` : `${purchases[1]} nákupů`;
  const km = text.match(/^([\d.]+) km away$/);
  if (km) {
    const value = km[1].replace(".", ",");
    return language === "fr" ? `à ${value} km` : `${value} km daleko`;
  }
  const meters = text.match(/^(\d+) m away$/);
  if (meters) return language === "fr" ? `à ${meters[1]} m` : `${meters[1]} m daleko`;
  const professor = text.match(/^Professor (.+)$/);
  if (professor) return language === "fr" ? `Professeur ${professor[1]}` : `Profesor ${professor[1]}`;
  const academicPacks = text.match(/^(\d+) academic note packs$/);
  if (academicPacks) return language === "fr" ? `${academicPacks[1]} packs de notes de cours` : `${academicPacks[1]} balíčků studijních poznámek`;
  const subjectPacks = text.match(/^(\d+) (.+) note packs$/);
  if (subjectPacks) return language === "fr" ? `${subjectPacks[1]} packs de notes · ${subjectPacks[2]}` : `${subjectPacks[1]} balíčků poznámek · ${subjectPacks[2]}`;

  return text;
}

function translateTextNode(text: string, language: EtudoLanguage) {
  const match = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!match) return text;
  const [, leading, core, trailing] = match;
  if (!core) return text;
  return `${leading}${translateCore(core, language)}${trailing}`;
}

type LanguageContextValue = {
  language: EtudoLanguage;
  setLanguage: (language: EtudoLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<EtudoLanguage>("en");
  const originals = useRef(new WeakMap<Text, string>());\n  const attributeOriginals = useRef(new WeakMap<Element, Map<string, string>>());\n  const observerRef = useRef<MutationObserver | null>(null);

  const setLanguage = useCallback((nextLanguage: EtudoLanguage) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("etudo-language", nextLanguage);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("etudo-language") as EtudoLanguage | null;
    if (saved === "en" || saved === "fr" || saved === "cs") {
      setLanguageState(saved);
      return;
    }
    const browserLanguage = window.navigator.language.toLowerCase();
    if (browserLanguage.startsWith("cs")) setLanguageState("cs");
    else if (browserLanguage.startsWith("fr")) setLanguageState("fr");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;

    const translateNode = (node: Text) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("[data-no-translate='true']") || parent.closest("script, style, noscript")) return;

      const currentText = node.nodeValue ?? "";
      const stored = originals.current.get(node);
      let original = stored ?? currentText;

      if (stored) {
        const knownVariants = [
          stored,
          translateTextNode(stored, "fr"),
          translateTextNode(stored, "cs"),
        ];
        if (!knownVariants.includes(currentText)) original = currentText;
      }

      originals.current.set(node, original);
      const translated = translateTextNode(original, language);
      if (currentText !== translated) node.nodeValue = translated;
    };

    const translateAttribute = (element: Element, attribute: "placeholder") => {
      const currentValue = element.getAttribute(attribute);
      if (!currentValue) return;

      let values = attributeOriginals.current.get(element);
      if (!values) {
        values = new Map<string, string>();
        attributeOriginals.current.set(element, values);
      }

      const stored = values.get(attribute);
      let original = stored ?? currentValue;
      if (stored) {
        const knownVariants = [stored, translateCore(stored, "fr"), translateCore(stored, "cs")];
        if (!knownVariants.includes(currentValue)) original = currentValue;
      }

      values.set(attribute, original);
      const translated = translateCore(original, language);
      if (currentValue !== translated) element.setAttribute(attribute, translated);
    };

    const translateElement = (element: Element) => {
      if (element.closest("[data-no-translate='true']")) return;
      if (element.hasAttribute("placeholder")) translateAttribute(element, "placeholder");
    };

    const translateTree = (root: Node) => {
      if (root.nodeType === Node.TEXT_NODE) translateNode(root as Text);
      if (root instanceof Element) translateElement(root);

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let current = walker.nextNode();
      while (current) {
        translateNode(current as Text);
        current = walker.nextNode();
      }

      if (root instanceof Element) {
        root.querySelectorAll("[placeholder]").forEach((element) => translateElement(element));
      }
    };

    const reconnect = () => observerRef.current?.observe(document.body, { childList: true, subtree: true, characterData: true });

    observerRef.current?.disconnect();
    translateTree(document.body);

    const observer = new MutationObserver((mutations) => {
      observer.disconnect();
      for (const mutation of mutations) {
        if (mutation.type === "characterData") translateTree(mutation.target);
        else mutation.addedNodes.forEach((node) => translateTree(node));
      }
      reconnect();
    });

    observerRef.current = observer;
    reconnect();
    return () => observer.disconnect();
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
