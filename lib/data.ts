export type Student = {
  id: string;
  name: string;
  university: string;
  photo: string;
  neighborhood: string;
  bio: string;
  skills: string[];
  categories: string[];
  services: string[];
  price: string;
  rating: number;
  reviews: number;
  availability: string;
  responseTime: string;
  languages: string[];
  verified: boolean;
};

export type ServiceCategory = {
  slug: string;
  name: string;
  description: string;
  avgPrice: string;
  tags: string[];
};

export const categories: ServiceCategory[] = [
  {
    slug: "moving-help",
    name: "Moving help",
    description: "Lift boxes, move furniture, pack vans, and carry items up Paris staircases.",
    avgPrice: "18-28 EUR/hr",
    tags: ["Furniture", "Van loading", "Heavy lifting"],
  },
  {
    slug: "tutoring",
    name: "Tutoring",
    description: "One-to-one support for maths, economics, coding, French, and exam prep.",
    avgPrice: "20-35 EUR/hr",
    tags: ["Maths", "Languages", "Coding"],
  },
  {
    slug: "assembly",
    name: "Furniture assembly",
    description: "IKEA builds, desk setup, shelves, beds, and room refreshes.",
    avgPrice: "18-30 EUR/hr",
    tags: ["IKEA", "Shelves", "Repairs"],
  },
  {
    slug: "photography",
    name: "Photography",
    description: "Graduation photos, profile shoots, events, and content days.",
    avgPrice: "35-70 EUR/hr",
    tags: ["Portraits", "Events", "Editing"],
  },
  {
    slug: "language-help",
    name: "Language help",
    description: "Conversation practice, translation, proofreading, and pronunciation.",
    avgPrice: "16-30 EUR/hr",
    tags: ["French", "English", "Spanish"],
  },
  {
    slug: "pet-sitting",
    name: "Pet sitting",
    description: "Dog walks, cat visits, feeding, and overnight care around campus areas.",
    avgPrice: "12-25 EUR/hr",
    tags: ["Dog walks", "Cat visits", "Overnight"],
  },
  {
    slug: "errands",
    name: "Errands",
    description: "Queueing, pickup, deliveries, admin help, and last-minute tasks.",
    avgPrice: "14-24 EUR/hr",
    tags: ["Pickup", "Delivery", "Admin"],
  },
  {
    slug: "tech-help",
    name: "Tech help",
    description: "Laptop setup, Wi-Fi troubleshooting, Notion systems, and basic repairs.",
    avgPrice: "20-40 EUR/hr",
    tags: ["Laptop", "Wi-Fi", "Productivity"],
  },
  {
    slug: "event-help",
    name: "Event help",
    description: "Check-in desks, setup, hosting support, teardown, and student society events.",
    avgPrice: "16-28 EUR/hr",
    tags: ["Hosting", "Setup", "Check-in"],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    description: "Move-out cleaning, shared flat resets, dishes, laundry, and tidy-ups.",
    avgPrice: "15-25 EUR/hr",
    tags: ["Move-out", "Laundry", "Flat reset"],
  },
  {
    slug: "furniture-transport",
    name: "Furniture transport",
    description: "Marketplace pickup, carrying, metro-friendly moves, and small van coordination.",
    avgPrice: "20-45 EUR/hr",
    tags: ["Leboncoin", "Pickup", "Delivery"],
  },
];

export const students: Student[] = [
  {
    id: "camille-martin",
    name: "Camille Martin",
    university: "Sorbonne Universite",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    neighborhood: "5e - Latin Quarter",
    bio: "Master's student in literature who helps with small moves, French practice, and tidy apartment resets. Calm, punctual, and very used to old Paris buildings.",
    skills: ["Moving", "French tutoring", "Cleaning", "Packing"],
    categories: ["moving-help", "language-help", "cleaning"],
    services: ["Help moving", "French conversation", "Move-out cleaning"],
    price: "22 EUR/hr",
    rating: 4.9,
    reviews: 48,
    availability: "Weekday evenings, Sunday afternoons",
    responseTime: "Usually replies in 12 min",
    languages: ["French", "English"],
    verified: true,
  },
  {
    id: "youssef-benali",
    name: "Youssef Benali",
    university: "Universite Paris Cite",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    neighborhood: "13e - Bibliotheque",
    bio: "Engineering student with tools, patience, and a practical brain. Best for desks, shelves, Wi-Fi, and anything that came in a flat box.",
    skills: ["Furniture assembly", "Tech setup", "Repairs", "Transport"],
    categories: ["assembly", "tech-help", "furniture-transport"],
    services: ["IKEA assembly", "Laptop setup", "Small furniture transport"],
    price: "25 EUR/hr",
    rating: 4.8,
    reviews: 36,
    availability: "Tuesday, Thursday, Saturday",
    responseTime: "Usually replies in 25 min",
    languages: ["French", "Arabic", "English"],
    verified: true,
  },
  {
    id: "lea-moreau",
    name: "Lea Moreau",
    university: "Sciences Po Paris",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    neighborhood: "7e - Saint-Germain",
    bio: "Policy student and society event lead. Great for event check-ins, photography, errands, and last-minute coordination when plans get messy.",
    skills: ["Events", "Photography", "Errands", "Copywriting"],
    categories: ["event-help", "photography", "errands"],
    services: ["Event staffing", "Portrait photos", "Admin errands"],
    price: "28 EUR/hr",
    rating: 5,
    reviews: 31,
    availability: "Mornings and weekends",
    responseTime: "Usually replies in 8 min",
    languages: ["French", "English", "Spanish"],
    verified: true,
  },
  {
    id: "hugo-laurent",
    name: "Hugo Laurent",
    university: "Universite Paris Dauphine-PSL",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
    neighborhood: "16e - Porte Dauphine",
    bio: "Economics student who tutors maths, statistics, Excel, and finance basics. Structured lessons, quick recap notes, and exam-focused practice.",
    skills: ["Maths", "Statistics", "Excel", "Finance"],
    categories: ["tutoring", "tech-help"],
    services: ["Maths tutoring", "Stats prep", "Spreadsheet help"],
    price: "32 EUR/hr",
    rating: 4.9,
    reviews: 54,
    availability: "Monday to Thursday evenings",
    responseTime: "Usually replies in 18 min",
    languages: ["French", "English"],
    verified: true,
  },
  {
    id: "amina-diallo",
    name: "Amina Diallo",
    university: "ESCP Business School",
    photo:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=900&q=80",
    neighborhood: "11e - Oberkampf",
    bio: "Bilingual business student who supports English practice, errands, pet sitting, and polished CV/profile photography on weekends.",
    skills: ["English tutoring", "Pet sitting", "Photography", "Errands"],
    categories: ["language-help", "pet-sitting", "photography", "errands"],
    services: ["English conversation", "Cat sitting", "CV photos"],
    price: "24 EUR/hr",
    rating: 4.7,
    reviews: 27,
    availability: "Friday afternoons and weekends",
    responseTime: "Usually replies in 35 min",
    languages: ["French", "English", "Wolof"],
    verified: true,
  },
  {
    id: "marc-vidal",
    name: "Marc Vidal",
    university: "CentraleSupelec",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
    neighborhood: "14e - Cite Universitaire",
    bio: "Robotics student with a cargo bike and a practical streak. Helpful for furniture pickups, tech troubleshooting, and fast errands across the south of Paris.",
    skills: ["Furniture transport", "Tech help", "Errands", "Assembly"],
    categories: ["furniture-transport", "tech-help", "errands", "assembly"],
    services: ["Furniture pickup", "Router setup", "Desk assembly"],
    price: "27 EUR/hr",
    rating: 4.8,
    reviews: 42,
    availability: "Most afternoons",
    responseTime: "Usually replies in 20 min",
    languages: ["French", "English", "Catalan"],
    verified: true,
  },
];

export const featuredStudent = students[0];

export function findStudent(id: string) {
  return students.find((student) => student.id === id);
}

export function searchStudents(query = "", category = "") {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedCategory = category.trim().toLowerCase();

  return students.filter((student) => {
    const haystack = [
      student.name,
      student.university,
      student.bio,
      ...student.skills,
      ...student.services,
      ...student.categories,
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
    const matchesCategory =
      !normalizedCategory || student.categories.includes(normalizedCategory);

    return matchesQuery && matchesCategory;
  });
}
