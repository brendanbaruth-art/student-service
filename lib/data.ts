export type ServiceOffering = {
  name: string;
  description: string;
  price: string;
  pricingType: "hourly" | "fixed";
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
  bio: string;
  skills: string[];
  categories: string[];
  services: ServiceOffering[];
  startingPrice: string;
  startingPriceValue: number;
  rating: number;
  reviews: number;
  availability: string;
  responseTime: string;
  languages: string[];
  serviceAreas: string[];
  verified: boolean;
  reviewSnippets: Review[];
};

export type ServiceCategory = {
  slug: string;
  name: string;
  description: string;
  startingPrice: string;
  tags: string[];
};

export const categories: ServiceCategory[] = [
  {
    slug: "moving-help",
    name: "Moving help",
    description: "Packing, lifting, van loading, and careful help with small Paris moves.",
    startingPrice: "From €18/hour",
    tags: ["Boxes", "Furniture", "Van loading"],
  },
  {
    slug: "tutoring",
    name: "Tutoring",
    description: "Focused academic support for maths, languages, economics, coding, and exams.",
    startingPrice: "From €22/hour",
    tags: ["Maths", "Languages", "Exams"],
  },
  {
    slug: "assembly",
    name: "Furniture assembly",
    description: "Flat-pack furniture, shelves, desks, beds, and room setup.",
    startingPrice: "From €20/hour",
    tags: ["IKEA", "Shelves", "Desk setup"],
  },
  {
    slug: "tech-help",
    name: "Tech help",
    description: "Laptop setup, Wi-Fi troubleshooting, device support, and productivity tools.",
    startingPrice: "From €24/hour",
    tags: ["Laptop", "Wi-Fi", "Setup"],
  },
  {
    slug: "pet-sitting",
    name: "Pet care",
    description: "Dog walks, cat visits, feeding, and calm care around university schedules.",
    startingPrice: "From €16/hour",
    tags: ["Dog walks", "Cat visits", "Feeding"],
  },
  {
    slug: "errands",
    name: "Everyday errands",
    description: "Pickup, delivery, queueing, admin support, and time-sensitive tasks.",
    startingPrice: "From €15/hour",
    tags: ["Pickup", "Delivery", "Admin"],
  },
  {
    slug: "photography",
    name: "Photography",
    description: "Portraits, graduation photos, event coverage, and light editing.",
    startingPrice: "From €35/hour",
    tags: ["Portraits", "Events", "Editing"],
  },
  {
    slug: "language-help",
    name: "Language help",
    description: "Conversation practice, proofreading, translation, and pronunciation support.",
    startingPrice: "From €18/hour",
    tags: ["French", "English", "Spanish"],
  },
  {
    slug: "event-help",
    name: "Event help",
    description: "Check-in desks, setup, hosting support, and student society events.",
    startingPrice: "From €18/hour",
    tags: ["Check-in", "Setup", "Hosting"],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    description: "Shared flat resets, move-out cleaning, dishes, laundry, and tidy-ups.",
    startingPrice: "From €17/hour",
    tags: ["Move-out", "Flat reset", "Laundry"],
  },
  {
    slug: "furniture-transport",
    name: "Furniture transport",
    description: "Pickup, carrying, marketplace purchases, and small-item delivery.",
    startingPrice: "From €25/hour",
    tags: ["Pickup", "Delivery", "Marketplace"],
  },
];

export const students: Student[] = [
  {
    id: "camille-martin",
    fullName: "Camille Martin",
    displayName: "Camille M.",
    university: "Sorbonne Université",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    area: "5e - Latin Quarter",
    bio: "Literature master's student offering dependable help with small moves, French conversation, and apartment reset tasks.",
    skills: ["Moving", "French tutoring", "Packing", "Cleaning"],
    categories: ["moving-help", "language-help", "cleaning"],
    services: [
      {
        name: "Moving help",
        description: "Boxes, light furniture, packing, and careful stair carry support.",
        price: "€22/hour",
        pricingType: "hourly",
        availability: "Weekday evenings",
        category: "moving-help",
      },
      {
        name: "French conversation",
        description: "Conversation practice, pronunciation, and short written feedback.",
        price: "€24/hour",
        pricingType: "hourly",
        availability: "Sunday afternoons",
        category: "language-help",
      },
      {
        name: "Move-out cleaning",
        description: "Kitchen, bathroom, and shared-room reset before handing back keys.",
        price: "€35 fixed price",
        pricingType: "fixed",
        availability: "Saturday mornings",
        category: "cleaning",
      },
    ],
    startingPrice: "€22/hour",
    startingPriceValue: 22,
    rating: 4.9,
    reviews: 48,
    availability: "Evenings and Sunday afternoons",
    responseTime: "Replies in about 12 min",
    languages: ["French", "English"],
    serviceAreas: ["5e", "6e", "13e"],
    verified: true,
    reviewSnippets: [
      { author: "Nina", rating: 5, text: "Careful, punctual, and very easy to coordinate with." },
      { author: "Alex", rating: 5, text: "Great French conversation session with practical notes after." },
    ],
  },
  {
    id: "youssef-benali",
    fullName: "Youssef Benali",
    displayName: "Youssef B.",
    university: "Université Paris Cité",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    area: "13e - Bibliothèque",
    bio: "Engineering student with tools and a calm, precise approach to furniture assembly, device setup, and small repairs.",
    skills: ["Furniture assembly", "Tech setup", "Repairs", "Transport"],
    categories: ["assembly", "tech-help", "furniture-transport"],
    services: [
      {
        name: "Furniture assembly",
        description: "Desks, shelves, beds, chairs, and flat-pack furniture setup.",
        price: "€25/hour",
        pricingType: "hourly",
        availability: "Tuesday and Thursday",
        category: "assembly",
      },
      {
        name: "Laptop and Wi-Fi setup",
        description: "Laptop configuration, Wi-Fi troubleshooting, and software setup.",
        price: "€28/hour",
        pricingType: "hourly",
        availability: "Saturday afternoons",
        category: "tech-help",
      },
      {
        name: "Small furniture transport",
        description: "Pickup coordination and carrying for compact furniture pieces.",
        price: "€40 fixed price",
        pricingType: "fixed",
        availability: "Saturday mornings",
        category: "furniture-transport",
      },
    ],
    startingPrice: "€25/hour",
    startingPriceValue: 25,
    rating: 4.8,
    reviews: 36,
    availability: "Tuesday, Thursday, Saturday",
    responseTime: "Replies in about 25 min",
    languages: ["French", "Arabic", "English"],
    serviceAreas: ["12e", "13e", "14e"],
    verified: true,
    reviewSnippets: [
      { author: "Maya", rating: 5, text: "Built a desk and shelving unit quickly, with everything level." },
      { author: "Louis", rating: 4.8, text: "Solved my router issue and explained the fix clearly." },
    ],
  },
  {
    id: "lea-moreau",
    fullName: "Léa Moreau",
    displayName: "Léa M.",
    university: "Sciences Po Paris",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    area: "7e - Saint-Germain",
    bio: "Policy student with experience supporting society events, portraits, admin errands, and guest check-in.",
    skills: ["Event support", "Photography", "Errands", "Coordination"],
    categories: ["event-help", "photography", "errands"],
    services: [
      {
        name: "Event support",
        description: "Guest check-in, setup, hosting support, and tidy teardown.",
        price: "€28/hour",
        pricingType: "hourly",
        availability: "Mornings and weekends",
        category: "event-help",
      },
      {
        name: "Portrait photography",
        description: "CV, LinkedIn, graduation, and student society portraits.",
        price: "€55 fixed price",
        pricingType: "fixed",
        availability: "Weekend afternoons",
        category: "photography",
      },
      {
        name: "Admin errands",
        description: "Pickup, queueing, document delivery, and campus errands.",
        price: "€20/hour",
        pricingType: "hourly",
        availability: "Friday mornings",
        category: "errands",
      },
    ],
    startingPrice: "€20/hour",
    startingPriceValue: 20,
    rating: 5,
    reviews: 31,
    availability: "Mornings and weekends",
    responseTime: "Replies in about 8 min",
    languages: ["French", "English", "Spanish"],
    serviceAreas: ["6e", "7e", "15e"],
    verified: true,
    reviewSnippets: [
      { author: "Sam", rating: 5, text: "Professional event support from setup through check-in." },
      { author: "Clara", rating: 5, text: "Portraits looked polished and were delivered quickly." },
    ],
  },
  {
    id: "hugo-laurent",
    fullName: "Hugo Laurent",
    displayName: "Hugo L.",
    university: "Université Paris Dauphine - PSL",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
    area: "16e - Porte Dauphine",
    bio: "Economics student offering structured tutoring for maths, statistics, Excel, and finance fundamentals.",
    skills: ["Maths", "Statistics", "Excel", "Finance"],
    categories: ["tutoring", "tech-help"],
    services: [
      {
        name: "Maths tutoring",
        description: "Problem-solving sessions with concise recap notes after each lesson.",
        price: "€32/hour",
        pricingType: "hourly",
        availability: "Monday to Thursday evenings",
        category: "tutoring",
      },
      {
        name: "Statistics preparation",
        description: "Exam preparation, practice questions, and method review.",
        price: "€34/hour",
        pricingType: "hourly",
        availability: "Wednesday evenings",
        category: "tutoring",
      },
      {
        name: "Spreadsheet help",
        description: "Excel formulas, spreadsheet cleanup, and study dashboards.",
        price: "€30/hour",
        pricingType: "hourly",
        availability: "Monday evenings",
        category: "tech-help",
      },
    ],
    startingPrice: "€30/hour",
    startingPriceValue: 30,
    rating: 4.9,
    reviews: 54,
    availability: "Monday to Thursday evenings",
    responseTime: "Replies in about 18 min",
    languages: ["French", "English"],
    serviceAreas: ["8e", "16e", "17e"],
    verified: true,
    reviewSnippets: [
      { author: "Inès", rating: 5, text: "Clear explanations and a useful plan before my statistics exam." },
      { author: "Theo", rating: 4.9, text: "Helped me understand formulas instead of just fixing the file." },
    ],
  },
  {
    id: "amina-diallo",
    fullName: "Amina Diallo",
    displayName: "Amina D.",
    university: "ESCP Business School",
    photo:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=900&q=80",
    area: "11e - Oberkampf",
    bio: "Bilingual business student available for English practice, pet care, errands, and profile photo sessions.",
    skills: ["English tutoring", "Pet care", "Photography", "Errands"],
    categories: ["language-help", "pet-sitting", "photography", "errands"],
    services: [
      {
        name: "English conversation",
        description: "Speaking practice, vocabulary, and interview preparation.",
        price: "€24/hour",
        pricingType: "hourly",
        availability: "Friday afternoons",
        category: "language-help",
      },
      {
        name: "Cat visits",
        description: "Feeding, litter refresh, play time, and short visit updates.",
        price: "€18/hour",
        pricingType: "hourly",
        availability: "Weekends",
        category: "pet-sitting",
      },
      {
        name: "Profile photos",
        description: "Simple CV, LinkedIn, and profile portraits with light editing.",
        price: "€45 fixed price",
        pricingType: "fixed",
        availability: "Sunday afternoons",
        category: "photography",
      },
    ],
    startingPrice: "€18/hour",
    startingPriceValue: 18,
    rating: 4.7,
    reviews: 27,
    availability: "Friday afternoons and weekends",
    responseTime: "Replies in about 35 min",
    languages: ["French", "English", "Wolof"],
    serviceAreas: ["10e", "11e", "20e"],
    verified: true,
    reviewSnippets: [
      { author: "Robin", rating: 4.8, text: "Reliable cat visits with helpful updates after each stop." },
      { author: "Jade", rating: 4.7, text: "Good interview practice and very encouraging feedback." },
    ],
  },
  {
    id: "marc-vidal",
    fullName: "Marc Vidal",
    displayName: "Marc V.",
    university: "CentraleSupélec",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
    area: "14e - Cité Universitaire",
    bio: "Engineering student available for compact furniture transport, device setup, errands, and assembly support.",
    skills: ["Furniture transport", "Tech help", "Errands", "Assembly"],
    categories: ["furniture-transport", "tech-help", "errands", "assembly"],
    services: [
      {
        name: "Furniture pickup",
        description: "Small furniture pickup, carrying, and short-distance delivery.",
        price: "€42 fixed price",
        pricingType: "fixed",
        availability: "Most afternoons",
        category: "furniture-transport",
      },
      {
        name: "Router setup",
        description: "Wi-Fi setup, speed checks, and basic troubleshooting.",
        price: "€27/hour",
        pricingType: "hourly",
        availability: "Tuesday afternoons",
        category: "tech-help",
      },
      {
        name: "Desk assembly",
        description: "Desk and chair assembly with basic tools included.",
        price: "€29/hour",
        pricingType: "hourly",
        availability: "Thursday afternoons",
        category: "assembly",
      },
    ],
    startingPrice: "€27/hour",
    startingPriceValue: 27,
    rating: 4.8,
    reviews: 42,
    availability: "Most afternoons",
    responseTime: "Replies in about 20 min",
    languages: ["French", "English", "Catalan"],
    serviceAreas: ["13e", "14e", "15e"],
    verified: true,
    reviewSnippets: [
      { author: "Eva", rating: 4.9, text: "Coordinated pickup clearly and handled the furniture carefully." },
      { author: "Noah", rating: 4.8, text: "Fast desk assembly and tidy work." },
    ],
  },
];

export const popularCategories = categories.filter((category) =>
  ["moving-help", "tutoring", "assembly", "tech-help", "pet-sitting", "errands"].includes(
    category.slug,
  ),
);

export const sortOptions = ["Recommended", "Highest rated", "Lowest price", "Fastest response"];
export const availabilityOptions = ["This week", "Today", "Evenings", "Weekends"];
export const priceOptions = ["Any price", "Under €20/hour", "€20-€30/hour", "€30+/hour"];

export function findStudent(id: string) {
  return students.find((student) => student.id === id);
}

export function findCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function searchStudents(query = "", category = "") {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedCategory = category.trim().toLowerCase();

  return students.filter((student) => {
    const haystack = [
      student.displayName,
      student.fullName,
      student.university,
      student.area,
      student.bio,
      ...student.skills,
      ...student.languages,
      ...student.serviceAreas,
      ...student.categories,
      ...student.services.flatMap((service) => [
        service.name,
        service.description,
        service.category,
      ]),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
    const matchesCategory =
      !normalizedCategory || student.categories.includes(normalizedCategory);

    return matchesQuery && matchesCategory;
  });
}

export function getPrimaryService(student: Student, category?: string, query?: string) {
  const normalizedQuery = query?.toLowerCase() || "";
  return (
    student.services.find((service) => category && service.category === category) ||
    student.services.find((service) => normalizedQuery && service.name.toLowerCase().includes(normalizedQuery)) ||
    student.services[0]
  );
}
