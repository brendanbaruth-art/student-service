import type { Student } from "@/lib/data";

export type University = {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  area: string;
};

export type Professor = {
  id: string;
  name: string;
  universityId: string;
  department: string;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  code: string;
  universityId: string;
  professorId: string;
  subject: string;
  level: string;
  description: string;
};

export type MentorProfile = {
  id: string;
  firstName: string;
  displayName: string;
  photo: string;
  universityId: string;
  program: string;
  year: string;
  bio: string;
  hourlyRate: number;
  rating: number;
  reviews: number;
  completedSessions: number;
  nextAvailable: string;
  availabilityBucket: "Today" | "This week" | "Weekend" | "Online";
  modes: Array<"Online" | "In person">;
  verified: boolean;
  responseTime: string;
  courseIds: string[];
  professorIds: string[];
  area: string;
  distance: string;
  distanceMeters: number;
  arrondissement: number;
  approximateLatitude: number;
  approximateLongitude: number;
  joinedAt: string;
  courseHighlights: Array<{
    courseId: string;
    professorId: string;
    grade: string;
    verified: boolean;
    note: string;
  }>;
};

export type NoteListing = {
  id: string;
  title: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerRating: number;
  sellerGrade: string;
  sellerSales: number;
  courseId: string;
  professorId: string;
  universityId: string;
  subject: string;
  description: string;
  included: string[];
  previewContent: Array<{
    heading: string;
    body: string[];
    formula?: string;
  }>;
  pageCount: number;
  previewPages: number[];
  fileType: "PDF" | "DOCX" | "Slides";
  price: string;
  priceValue: number;
  rating: number;
  ratingCount: number;
  purchases: number;
  lastUpdated: string;
  academicYear: string;
  semester: "Fall" | "Spring" | "Full year";
  tags: string[];
};

export type MentorFilterInput = {
  q?: string;
  university?: string;
  subject?: string;
  course?: string;
  professor?: string;
  price?: string;
  availability?: string;
  distance?: string;
  rating?: string;
  mode?: string;
  verified?: string;
  sort?: string;
};

export type NoteFilterInput = {
  q?: string;
  university?: string;
  subject?: string;
  course?: string;
  professor?: string;
  price?: string;
  rating?: string;
  academicYear?: string;
  fileType?: string;
  sort?: string;
};

export const universities: University[] = [
  { id: "escp", name: "ESCP Business School", shortName: "ESCP", city: "Paris", country: "France", area: "11e / 17e" },
  { id: "dauphine", name: "Université Paris Dauphine - PSL", shortName: "Dauphine", city: "Paris", country: "France", area: "16e" },
  { id: "sorbonne", name: "Sorbonne Université", shortName: "Sorbonne", city: "Paris", country: "France", area: "5e" },
  { id: "paris-cite", name: "Université Paris Cité", shortName: "Paris Cité", city: "Paris", country: "France", area: "13e" },
  { id: "sciences-po", name: "Sciences Po Paris", shortName: "Sciences Po", city: "Paris", country: "France", area: "7e" },
  { id: "assas", name: "Panthéon-Assas Université", shortName: "Assas", city: "Paris", country: "France", area: "6e" },
  { id: "pantheon-sorbonne", name: "Université Paris 1 Panthéon-Sorbonne", shortName: "Paris 1", city: "Paris", country: "France", area: "5e" },
  { id: "centralesupelec", name: "CentraleSupélec", shortName: "CentraleSupélec", city: "Paris-Saclay", country: "France", area: "Paris-Saclay" },
];

export const professors: Professor[] = [
  { id: "claire-dupont", name: "Professor Claire Dupont", universityId: "escp", department: "Accounting" },
  { id: "marc-lefevre", name: "Professor Marc Lefèvre", universityId: "escp", department: "Finance" },
  { id: "nadia-bourdon", name: "Professor Nadia Bourdon", universityId: "escp", department: "Marketing" },
  { id: "sophie-martin", name: "Professor Sophie Martin", universityId: "dauphine", department: "Economics" },
  { id: "pierre-lambert", name: "Professor Pierre Lambert", universityId: "dauphine", department: "Statistics" },
  { id: "julien-moreau", name: "Professor Julien Moreau", universityId: "sorbonne", department: "Mathematics" },
  { id: "helene-rousseau", name: "Professor Hélène Rousseau", universityId: "sorbonne", department: "Languages" },
  { id: "amina-belkacem", name: "Professor Amina Belkacem", universityId: "paris-cite", department: "Computer Science" },
  { id: "thomas-nguyen", name: "Professor Thomas Nguyen", universityId: "paris-cite", department: "Statistics" },
  { id: "elise-garnier", name: "Professor Élise Garnier", universityId: "sciences-po", department: "Law" },
  { id: "lucas-bernard", name: "Professor Lucas Bernard", universityId: "sciences-po", department: "Economics" },
  { id: "marie-fournier", name: "Professor Marie Fournier", universityId: "assas", department: "Law" },
  { id: "antoine-mercier", name: "Professor Antoine Mercier", universityId: "pantheon-sorbonne", department: "Management" },
  { id: "sarah-klein", name: "Professor Sarah Klein", universityId: "centralesupelec", department: "Computer Science" },
  { id: "victor-aron", name: "Professor Victor Aron", universityId: "centralesupelec", department: "Mathematics" },
];

export const courses: Course[] = [
  { id: "financial-accounting", slug: "financial-accounting", title: "Financial Accounting", code: "ACC201", universityId: "escp", professorId: "claire-dupont", subject: "Accounting", level: "Bachelor", description: "Statements, journal entries, balance sheets, consolidation basics, and final exam cases." },
  { id: "corporate-finance", slug: "corporate-finance", title: "Corporate Finance", code: "FIN302", universityId: "escp", professorId: "marc-lefevre", subject: "Finance", level: "Master", description: "Valuation, capital budgeting, WACC, debt policy, and applied case questions." },
  { id: "consumer-marketing", slug: "consumer-marketing", title: "Consumer Marketing", code: "MKT210", universityId: "escp", professorId: "nadia-bourdon", subject: "Marketing", level: "Bachelor", description: "Segmentation, brand positioning, consumer research, and campaign case studies." },
  { id: "microeconomics", slug: "microeconomics", title: "Microeconomics", code: "ECO110", universityId: "dauphine", professorId: "sophie-martin", subject: "Economics", level: "Bachelor", description: "Consumer theory, producer theory, equilibrium, welfare, and exam-style proofs." },
  { id: "applied-statistics", slug: "applied-statistics", title: "Applied Statistics", code: "STAT205", universityId: "dauphine", professorId: "pierre-lambert", subject: "Statistics", level: "Bachelor", description: "Regression, confidence intervals, hypothesis tests, and applied data interpretation." },
  { id: "linear-algebra", slug: "linear-algebra", title: "Linear Algebra", code: "MATH104", universityId: "sorbonne", professorId: "julien-moreau", subject: "Mathematics", level: "Bachelor", description: "Matrices, vector spaces, linear maps, eigenvalues, and problem sheets." },
  { id: "academic-french", slug: "academic-french", title: "Academic French", code: "FR201", universityId: "sorbonne", professorId: "helene-rousseau", subject: "Languages", level: "Bachelor", description: "Academic writing, presentation structure, essay clarity, and oral exam preparation." },
  { id: "data-structures", slug: "data-structures", title: "Data Structures", code: "CS210", universityId: "paris-cite", professorId: "amina-belkacem", subject: "Computer Science", level: "Bachelor", description: "Algorithms, trees, graphs, hash tables, complexity, and coding assignment preparation." },
  { id: "probability-models", slug: "probability-models", title: "Probability Models", code: "STAT310", universityId: "paris-cite", professorId: "thomas-nguyen", subject: "Statistics", level: "Master", description: "Random variables, distributions, Markov chains, and applied probability exercises." },
  { id: "european-law", slug: "european-law", title: "European Law", code: "LAW240", universityId: "sciences-po", professorId: "elise-garnier", subject: "Law", level: "Master", description: "EU institutions, case law, direct effect, supremacy, and structured essay preparation." },
  { id: "political-economy", slug: "political-economy", title: "Political Economy", code: "ECO260", universityId: "sciences-po", professorId: "lucas-bernard", subject: "Economics", level: "Bachelor", description: "Institutions, incentives, public policy tradeoffs, and essay-based exams." },
  { id: "contract-law", slug: "contract-law", title: "Contract Law", code: "LAW115", universityId: "assas", professorId: "marie-fournier", subject: "Law", level: "Bachelor", description: "Contract formation, performance, liability, case commentary, and legal method." },
  { id: "strategic-management", slug: "strategic-management", title: "Strategic Management", code: "MGT301", universityId: "pantheon-sorbonne", professorId: "antoine-mercier", subject: "Management", level: "Master", description: "Industry analysis, competitive advantage, strategy cases, and presentation frameworks." },
  { id: "machine-learning", slug: "machine-learning", title: "Machine Learning", code: "CS420", universityId: "centralesupelec", professorId: "sarah-klein", subject: "Computer Science", level: "Master", description: "Supervised learning, model evaluation, optimization, and project implementation." },
  { id: "calculus-optimization", slug: "calculus-optimization", title: "Calculus and Optimization", code: "MATH220", universityId: "centralesupelec", professorId: "victor-aron", subject: "Mathematics", level: "Bachelor", description: "Multivariable calculus, constrained optimization, gradients, and exam problem solving." },
];

const photos = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=900&q=80",
];

type MentorSeed = Omit<MentorProfile, "photo" | "courseIds" | "professorIds" | "courseHighlights" | "verified" | "responseTime" | "joinedAt"> & {
  photoIndex: number;
  verified?: boolean;
  responseTime?: string;
  joinedAt?: string;
  highlights: Array<{ courseId: string; grade: string; note: string; verified?: boolean }>;
};

const mentorSeeds: MentorSeed[] = [
  { id: "camille-martin", firstName: "Camille", displayName: "Camille M.", photoIndex: 0, universityId: "escp", program: "Master in Management", year: "M2", bio: "Second-year ESCP student specializing in finance. I took Financial Accounting with Professor Dupont last year and focus on clear exam methods and practice problems.", hourlyRate: 28, rating: 4.9, reviews: 48, completedSessions: 126, nextAvailable: "Available tonight", availabilityBucket: "Today", modes: ["Online", "In person"], verified: true, responseTime: "Replies in 12 min", area: "ESCP / 17e", distance: "1.1 km away", distanceMeters: 1100, arrondissement: 17, approximateLatitude: 48.8873, approximateLongitude: 2.3068, joinedAt: "March 2025", highlights: [{ courseId: "financial-accounting", grade: "17/20", note: "Knows Professor Dupont's final exam structure and marking style." }, { courseId: "corporate-finance", grade: "16/20", note: "Strong on WACC and valuation case methods." }] },
  { id: "youssef-benali", firstName: "Youssef", displayName: "Youssef B.", photoIndex: 1, universityId: "dauphine", program: "Economics and Applied Mathematics", year: "L3", bio: "Economics student at Dauphine. I enjoy breaking down difficult microeconomics concepts into simple diagrams and examples.", hourlyRate: 24, rating: 4.8, reviews: 36, completedSessions: 91, nextAvailable: "Online tomorrow", availabilityBucket: "Online", modes: ["Online"], verified: true, responseTime: "Replies in 20 min", area: "Dauphine / 16e", distance: "2.4 km away", distanceMeters: 2400, arrondissement: 16, approximateLatitude: 48.8718, approximateLongitude: 2.2744, joinedAt: "April 2025", highlights: [{ courseId: "microeconomics", grade: "16/20", note: "Previously completed the same Dauphine microeconomics problem sets." }, { courseId: "applied-statistics", grade: "15.5/20", note: "Helps with regression exercises and interpretation." }] },
  { id: "lea-moreau", firstName: "Léa", displayName: "Léa M.", photoIndex: 2, universityId: "sorbonne", program: "Mathematics", year: "M1", bio: "Mathematics student at Sorbonne. I turn abstract linear algebra into clear steps and exam-ready methods.", hourlyRate: 26, rating: 4.9, reviews: 42, completedSessions: 104, nextAvailable: "Friday 14:00", availabilityBucket: "This week", modes: ["Online", "In person"], verified: true, responseTime: "Replies in 18 min", area: "Sorbonne / 5e", distance: "850 m away", distanceMeters: 850, arrondissement: 5, approximateLatitude: 48.8462, approximateLongitude: 2.345, joinedAt: "January 2025", highlights: [{ courseId: "linear-algebra", grade: "18/20", note: "Course verified with transcript review." }, { courseId: "calculus-optimization", grade: "17/20", note: "Good at optimization problem walkthroughs." }] },
  { id: "amina-diallo", firstName: "Amina", displayName: "Amina D.", photoIndex: 4, universityId: "paris-cite", program: "Computer Science", year: "L3", bio: "Computer science student at Paris Cité. I help students debug assignments and understand data structures instead of memorizing them.", hourlyRate: 30, rating: 4.7, reviews: 29, completedSessions: 73, nextAvailable: "Today 17:00", availabilityBucket: "Today", modes: ["Online"], verified: true, responseTime: "Replies in 9 min", area: "Université Paris Cité / 13e", distance: "3.2 km away", distanceMeters: 3200, arrondissement: 13, approximateLatitude: 48.8302, approximateLongitude: 2.3561, joinedAt: "September 2025", highlights: [{ courseId: "data-structures", grade: "A", note: "Completed the same coding assignments last year." }, { courseId: "probability-models", grade: "15/20", note: "Comfortable with probability exercises for CS students." }] },
  { id: "marc-vidal", firstName: "Marc", displayName: "Marc V.", photoIndex: 5, universityId: "sciences-po", program: "European Affairs", year: "M2", bio: "Sciences Po student focused on European Law essays. I help with case memorisation, structure, and seminar arguments.", hourlyRate: 27, rating: 4.8, reviews: 31, completedSessions: 64, nextAvailable: "Monday 16:00", availabilityBucket: "This week", modes: ["Online", "In person"], verified: true, responseTime: "Replies in 25 min", area: "Sciences Po / 7e", distance: "1.8 km away", distanceMeters: 1800, arrondissement: 7, approximateLatitude: 48.8556, approximateLongitude: 2.3187, joinedAt: "May 2025", highlights: [{ courseId: "european-law", grade: "16.5/20", note: "Knows Professor Garnier's essay feedback patterns." }, { courseId: "political-economy", grade: "16/20", note: "Strong on policy essay plans." }] },
  { id: "nina-robert", firstName: "Nina", displayName: "Nina R.", photoIndex: 6, universityId: "escp", program: "Bachelor in Management", year: "B3", bio: "ESCP student with a strong accounting foundation. I focus on journal entries, balance sheets, and time-saving revision plans.", hourlyRate: 22, rating: 4.6, reviews: 18, completedSessions: 41, nextAvailable: "Tomorrow morning", availabilityBucket: "This week", modes: ["In person"], verified: true, responseTime: "Replies in 35 min", area: "ESCP / 11e", distance: "1.6 km away", distanceMeters: 1600, arrondissement: 11, approximateLatitude: 48.8614, approximateLongitude: 2.3801, joinedAt: "October 2025", highlights: [{ courseId: "financial-accounting", grade: "15.5/20", note: "Helps first-year students build clean accounting routines." }] },
  { id: "hugo-laurent", firstName: "Hugo", displayName: "Hugo L.", photoIndex: 3, universityId: "dauphine", program: "Data and Economics", year: "M1", bio: "Dauphine student who likes turning statistics exercises into checklists. I can help online or near campus.", hourlyRate: 25, rating: 4.8, reviews: 33, completedSessions: 88, nextAvailable: "Available today", availabilityBucket: "Today", modes: ["Online", "In person"], verified: true, responseTime: "Replies in 14 min", area: "Dauphine / 16e", distance: "2.1 km away", distanceMeters: 2100, arrondissement: 16, approximateLatitude: 48.872, approximateLongitude: 2.2755, joinedAt: "February 2025", highlights: [{ courseId: "applied-statistics", grade: "17/20", note: "Specializes in regression and hypothesis testing." }, { courseId: "microeconomics", grade: "15/20", note: "Good at exam diagrams." }] },
  { id: "sofia-ramos", firstName: "Sofia", displayName: "Sofia R.", photoIndex: 7, universityId: "assas", program: "Law", year: "L3", bio: "Assas law student. I help students organize contract law commentary and avoid common methodology mistakes.", hourlyRate: 23, rating: 4.7, reviews: 24, completedSessions: 52, nextAvailable: "Weekend", availabilityBucket: "Weekend", modes: ["Online", "In person"], verified: true, responseTime: "Replies in 30 min", area: "Assas / 6e", distance: "950 m away", distanceMeters: 950, arrondissement: 6, approximateLatitude: 48.8468, approximateLongitude: 2.3294, joinedAt: "June 2025", highlights: [{ courseId: "contract-law", grade: "16/20", note: "Strong on case commentary structure." }] },
  { id: "tom-nguyen", firstName: "Tom", displayName: "Tom N.", photoIndex: 9, universityId: "centralesupelec", program: "Engineering", year: "M1", bio: "Engineering student at CentraleSupélec. I explain machine learning models with practical examples and project debugging.", hourlyRate: 32, rating: 4.9, reviews: 39, completedSessions: 97, nextAvailable: "Online tonight", availabilityBucket: "Online", modes: ["Online"], verified: true, responseTime: "Replies in 11 min", area: "Paris-Saclay", distance: "4.8 km away", distanceMeters: 4800, arrondissement: 14, approximateLatitude: 48.7098, approximateLongitude: 2.164, joinedAt: "January 2025", highlights: [{ courseId: "machine-learning", grade: "A", note: "Helps with model evaluation and Python projects." }, { courseId: "calculus-optimization", grade: "17/20", note: "Strong optimization foundation." }] },
  { id: "ines-boucher", firstName: "Inès", displayName: "Inès B.", photoIndex: 8, universityId: "pantheon-sorbonne", program: "Management", year: "M1", bio: "Paris 1 management student. I help students turn strategy cases into structured arguments and clean slides.", hourlyRate: 24, rating: 4.6, reviews: 21, completedSessions: 49, nextAvailable: "Wednesday afternoon", availabilityBucket: "This week", modes: ["Online", "In person"], verified: true, responseTime: "Replies in 40 min", area: "Panthéon-Sorbonne / 5e", distance: "1.3 km away", distanceMeters: 1300, arrondissement: 5, approximateLatitude: 48.846, approximateLongitude: 2.344, joinedAt: "November 2025", highlights: [{ courseId: "strategic-management", grade: "16/20", note: "Good at case frameworks and presentation plans." }] },
];

type ExtraMentorRow = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  number,
  number,
  number,
  number,
  string,
  MentorSeed["availabilityBucket"],
  readonly ("Online" | "In person")[],
  string,
  string,
  number,
  number,
  number,
  number,
  MentorSeed["highlights"],
];

const extraMentorRows: ExtraMentorRow[] = [
  ["adam-cohen", "Adam", "Adam C.", "escp", "Master in Finance", "M1", "I focus on valuation logic and formula discipline. Students usually book me before corporate finance case exams.", 29, 4.8, 27, 66, "Thursday evening", "This week", ["Online", "In person"], "ESCP / 11e", "1.9 km away", 1900, 11, 48.861, 2.381, [{ courseId: "corporate-finance", grade: "17/20", note: "Strong on WACC, DCF, and case structure." }]],
  ["maria-ivanova", "Maria", "Maria I.", "escp", "Marketing and Strategy", "M2", "I help students prepare clear marketing cases and understand what Professor Bourdon expects in written analysis.", 23, 4.7, 19, 44, "Tomorrow 18:00", "This week", ["Online"], "ESCP / 17e", "2.0 km away", 2000, 17, 48.887, 2.308, [{ courseId: "consumer-marketing", grade: "16.5/20", note: "Professor-specific case and campaign feedback." }]],
  ["sacha-perrin", "Sacha", "Sacha P.", "dauphine", "Applied Economics", "L3", "I break down microeconomics into diagrams, definitions, and exam timing. Best for students who feel lost in proofs.", 22, 4.6, 16, 38, "Today 19:00", "Today", ["Online"], "Dauphine / 16e", "2.6 km away", 2600, 16, 48.872, 2.274, [{ courseId: "microeconomics", grade: "15.5/20", note: "Works through diagrams and welfare problems." }]],
  ["manon-fabre", "Manon", "Manon F.", "dauphine", "Statistics and Data", "M1", "I like making statistics feel less abstract. I focus on examples, interpretation, and clean calculator workflows.", 26, 4.9, 34, 80, "Available today", "Today", ["Online", "In person"], "Dauphine / 16e", "2.8 km away", 2800, 16, 48.871, 2.276, [{ courseId: "applied-statistics", grade: "18/20", note: "Excellent at regression interpretation." }]],
  ["elena-marchal", "Elena", "Elena M.", "sorbonne", "Mathematics", "L3", "I help students move from memorized methods to understanding linear algebra proofs. Calm, step-by-step sessions.", 24, 4.8, 26, 61, "Weekend", "Weekend", ["In person"], "Sorbonne / 5e", "1.0 km away", 1000, 5, 48.846, 2.346, [{ courseId: "linear-algebra", grade: "17/20", note: "Focuses on proof logic and diagonalisation." }]],
  ["paul-meyer", "Paul", "Paul M.", "sorbonne", "French Literature", "M1", "I support international students with academic French writing, presentation structure, and oral exam confidence.", 21, 4.7, 22, 57, "Friday morning", "This week", ["Online", "In person"], "Sorbonne / 5e", "900 m away", 900, 5, 48.8465, 2.3458, [{ courseId: "academic-french", grade: "17/20", note: "Strong academic writing and oral presentation coaching." }]],
  ["leo-garcia", "Léo", "Léo G.", "paris-cite", "Computer Science", "M1", "I help with algorithms by tracing code and drawing data structures. Good for assignment rescue and exam review.", 28, 4.8, 31, 77, "Online tonight", "Online", ["Online"], "Paris Cité / 13e", "3.0 km away", 3000, 13, 48.831, 2.356, [{ courseId: "data-structures", grade: "A", note: "Specializes in trees, graphs, and complexity." }]],
  ["emma-schmitt", "Emma", "Emma S.", "paris-cite", "Applied Maths", "L3", "I make probability exercises more visual. Students book me for distributions, Markov chains, and exam drills.", 25, 4.6, 18, 46, "Thursday 16:00", "This week", ["Online", "In person"], "Paris Cité / 13e", "3.5 km away", 3500, 13, 48.829, 2.354, [{ courseId: "probability-models", grade: "16/20", note: "Strong on random variables and Markov chains." }]],
  ["clara-devaux", "Clara", "Clara D.", "sciences-po", "Public Policy", "M1", "I help students prepare political economy essays with structured arguments and clear evidence.", 26, 4.7, 25, 59, "Tomorrow afternoon", "This week", ["Online"], "Sciences Po / 7e", "1.7 km away", 1700, 7, 48.855, 2.319, [{ courseId: "political-economy", grade: "16.5/20", note: "Good at essay plans and policy tradeoffs." }]],
  ["nathan-kim", "Nathan", "Nathan K.", "sciences-po", "European Affairs", "M2", "I work with students on EU law case recall and concise introductions. Sessions are practical and exam-focused.", 28, 4.9, 44, 110, "Today 18:00", "Today", ["Online", "In person"], "Sciences Po / 7e", "1.5 km away", 1500, 7, 48.856, 2.318, [{ courseId: "european-law", grade: "17/20", note: "Strong case law memory system." }]],
  ["jade-morin", "Jade", "Jade M.", "assas", "Private Law", "M1", "I help law students build case commentary reflexes and avoid overlong, unfocused answers.", 24, 4.8, 30, 69, "Weekend", "Weekend", ["In person"], "Assas / 6e", "1.2 km away", 1200, 6, 48.847, 2.329, [{ courseId: "contract-law", grade: "17/20", note: "Method-focused contract law coaching." }]],
  ["mehdi-aziz", "Mehdi", "Mehdi A.", "pantheon-sorbonne", "Strategy", "M2", "I coach strategic management cases with simple frameworks and strong conclusions. Helpful before group presentations.", 25, 4.6, 17, 42, "Monday morning", "This week", ["Online", "In person"], "Paris 1 / 5e", "1.4 km away", 1400, 5, 48.846, 2.343, [{ courseId: "strategic-management", grade: "16/20", note: "Case frameworks and slide storytelling." }]],
  ["olivia-hart", "Olivia", "Olivia H.", "centralesupelec", "Engineering", "M2", "I mentor machine learning students on model selection, feature engineering, and project reports.", 34, 4.9, 41, 102, "Online this week", "Online", ["Online"], "Paris-Saclay", "4.6 km away", 4600, 14, 48.71, 2.164, [{ courseId: "machine-learning", grade: "A", note: "Project-focused ML mentoring." }]],
  ["quentin-leroy", "Quentin", "Quentin L.", "centralesupelec", "Engineering", "L3", "I help students solve optimization problems without skipping steps. Good for weekly exercise sheets.", 27, 4.7, 20, 51, "Friday 17:00", "This week", ["Online"], "Paris-Saclay", "4.9 km away", 4900, 14, 48.711, 2.166, [{ courseId: "calculus-optimization", grade: "17.5/20", note: "Strong on gradients and constraints." }]],
  ["romane-petit", "Romane", "Romane P.", "escp", "Accounting and Control", "M1", "I focus on Financial Accounting basics and exam templates. I like making messy statements feel manageable.", 24, 4.7, 23, 55, "Available today", "Today", ["Online", "In person"], "ESCP / 11e", "1.5 km away", 1500, 11, 48.862, 2.379, [{ courseId: "financial-accounting", grade: "16/20", note: "Great for journal entries and balance sheets." }]],
  ["benjamin-rossi", "Benjamin", "Benjamin R.", "escp", "Corporate Finance", "M2", "I help students structure finance cases under time pressure. We work through formulas and decision logic together.", 31, 4.8, 37, 95, "Tomorrow evening", "This week", ["Online"], "ESCP / 17e", "2.2 km away", 2200, 17, 48.887, 2.307, [{ courseId: "corporate-finance", grade: "18/20", note: "Very strong valuation and case exam mentor." }]],
  ["eva-dumont", "Eva", "Eva D.", "dauphine", "Economics", "L3", "I tutor microeconomics with examples first, then formal proofs. Good for students who need confidence before exams.", 23, 4.6, 15, 35, "Weekend", "Weekend", ["Online", "In person"], "Dauphine / 16e", "2.9 km away", 2900, 16, 48.871, 2.273, [{ courseId: "microeconomics", grade: "15/20", note: "Patient diagram-based approach." }]],
  ["malo-renard", "Malo", "Malo R.", "dauphine", "Statistics", "M1", "I focus on applied statistics, especially turning formulas into interpretation. I can also review R outputs.", 27, 4.8, 28, 72, "Online today", "Online", ["Online"], "Dauphine / 16e", "2.3 km away", 2300, 16, 48.872, 2.276, [{ courseId: "applied-statistics", grade: "17/20", note: "Regression, tests, and data interpretation." }]],
  ["alice-monnier", "Alice", "Alice M.", "sorbonne", "Mathematics", "L3", "I help students prepare linear algebra exercises with clean methods and repeated practice.", 23, 4.7, 20, 48, "Thursday", "This week", ["In person"], "Sorbonne / 5e", "1.2 km away", 1200, 5, 48.846, 2.347, [{ courseId: "linear-algebra", grade: "16.5/20", note: "Works well for exercise sheet preparation." }]],
  ["samir-rahmani", "Samir", "Samir R.", "paris-cite", "Computer Science", "L3", "I tutor data structures with drawings, pseudocode, and debugging. Best for practical assignment support.", 26, 4.6, 18, 43, "Tomorrow", "This week", ["Online", "In person"], "Paris Cité / 13e", "3.4 km away", 3400, 13, 48.83, 2.357, [{ courseId: "data-structures", grade: "A-", note: "Assignment and complexity support." }]],
];

const extraMentors: MentorSeed[] = extraMentorRows.map((item, index) => ({
  id: item[0] as string,
  firstName: item[1] as string,
  displayName: item[2] as string,
  universityId: item[3] as string,
  program: item[4] as string,
  year: item[5] as string,
  bio: item[6] as string,
  hourlyRate: item[7] as number,
  rating: item[8] as number,
  reviews: item[9] as number,
  completedSessions: item[10] as number,
  nextAvailable: item[11] as string,
  availabilityBucket: item[12] as MentorSeed["availabilityBucket"],
  modes: [...item[13]] as MentorSeed["modes"],
  area: item[14] as string,
  distance: item[15] as string,
  distanceMeters: item[16] as number,
  arrondissement: item[17] as number,
  approximateLatitude: item[18] as number,
  approximateLongitude: item[19] as number,
  highlights: item[20] as MentorSeed["highlights"],
  photoIndex: (index + 10) % photos.length,
  verified: true,
}));

export const mentors: MentorProfile[] = [...mentorSeeds, ...extraMentors].slice(0, 30).map((seed, index) => {
  const courseIds = seed.highlights.map((highlight) => highlight.courseId);
  const professorIds = courseIds.map((courseId) => getCourse(courseId)?.professorId || "");
  return {
    ...seed,
    photo: photos[seed.photoIndex % photos.length],
    verified: seed.verified ?? true,
    responseTime: seed.responseTime || `Replies in ${10 + (index % 6) * 5} min`,
    joinedAt: seed.joinedAt || `${["January", "March", "May", "September", "November"][index % 5]} 2025`,
    courseIds,
    professorIds,
    courseHighlights: seed.highlights.map((highlight) => ({
      courseId: highlight.courseId,
      professorId: getCourse(highlight.courseId)?.professorId || "",
      grade: highlight.grade,
      verified: highlight.verified ?? true,
      note: highlight.note,
    })),
  };
});

const subjectInclusions: Record<string, string[]> = {
  Accounting: ["Lecture summaries", "Journal entry examples", "Exam preparation", "Practice questions", "Professor-specific tips"],
  Finance: ["Formula sheet", "Case walkthroughs", "Valuation templates", "Exam preparation", "Common pitfalls"],
  Economics: ["Diagram templates", "Proof steps", "Essay plans", "Practice problems", "Professor-specific tips"],
  Mathematics: ["Worked exercises", "Key definitions", "Proof methods", "Formula snippets", "Problem sheet solutions"],
  "Computer Science": ["Pseudocode", "Annotated examples", "Complexity notes", "Assignment planning", "Exam practice"],
  Law: ["Case summaries", "Essay structures", "Legal method", "Key doctrine", "Professor-specific feedback"],
  Statistics: ["Formula explanations", "Tables", "Worked tests", "Interpretation examples", "Practice questions"],
  Marketing: ["Case frameworks", "Campaign examples", "Research summaries", "Presentation notes", "Exam checklist"],
  Management: ["Strategy frameworks", "Case summaries", "Slide structures", "Oral presentation notes", "Exam checklist"],
  Languages: ["Writing templates", "Oral exam prompts", "Vocabulary lists", "Essay structures", "Common corrections"],
};

const noteTitlesByCourse: Record<string, string[]> = {
  "financial-accounting": ["Final Exam Notes", "Journal Entries Workbook", "Balance Sheet Revision Pack", "Professor Dupont Exam Tips", "Consolidation Cheat Sheet"],
  "corporate-finance": ["Case Pack", "Valuation Formula Notes", "WACC and DCF Workbook", "Final Revision Slides", "Capital Budgeting Examples"],
  microeconomics: ["Diagram and Proof Guide", "Consumer Theory Notes", "Exam Pack", "Welfare Problems Workbook", "Professor Martin Revision Sheet"],
  "linear-algebra": ["Problem Sheet Solutions", "Eigenvalues Revision Pack", "Proof Methods Notes", "Matrix Exercises Workbook", "Final Exam Summary"],
  "data-structures": ["Assignment Guide", "Trees and Graphs Notes", "Complexity Cheat Sheet", "Hash Tables Workbook", "Exam Coding Patterns"],
  "european-law": ["Case Law Essay Pack", "EU Institutions Notes", "Direct Effect Revision", "Seminar Preparation Guide"],
  "applied-statistics": ["Regression Workbook", "Hypothesis Testing Notes", "Statistics Final Pack", "Data Interpretation Guide"],
  "consumer-marketing": ["Marketing Case Notes", "Segmentation and Positioning Pack", "Campaign Analysis Guide", "Consumer Research Summary"],
  "strategic-management": ["Strategy Case Pack", "Frameworks Revision Notes", "Presentation Guide", "Competitive Advantage Summary"],
  "contract-law": ["Contract Law Commentary Pack", "Liability Revision Notes", "Legal Method Workbook", "Case Summary Pack"],
  "machine-learning": ["Model Evaluation Notes", "Machine Learning Project Guide", "Algorithms Summary Pack", "Python Patterns Workbook"],
  "probability-models": ["Probability Models Notes", "Markov Chains Workbook", "Distribution Summary Pack"],
  "academic-french": ["Academic French Writing Pack", "Oral Exam Preparation Notes", "Essay Structure Guide"],
  "political-economy": ["Political Economy Essay Pack", "Policy Tradeoffs Notes", "Institutions Revision Guide"],
  "calculus-optimization": ["Optimization Workbook", "Calculus Formula Notes", "Gradient Methods Pack"],
};

function makePreview(course: Course, title: string): NoteListing["previewContent"] {
  return [
    {
      heading: `${course.title.toUpperCase()} - Core framework`,
      formula: course.subject === "Accounting" ? "Assets = Liabilities + Equity" : course.subject === "Finance" ? "Enterprise Value = Equity Value + Net Debt" : course.subject === "Statistics" ? "t = (estimate - value) / standard error" : undefined,
      body: ["Key concepts from the lecture sequence", "Professor-specific emphasis and likely exam angles", "Common mistakes to avoid in timed answers"],
    },
    {
      heading: `${title.replace("Notes", "").trim()} - Practice method`,
      body: ["Step-by-step worked example", "Checklist for the exam answer", "Short summary box for last-minute revision"],
    },
    {
      heading: "Locked full notes preview",
      body: ["Additional examples, tables, and practice questions are included in the full file.", "Preview pages are selected to show structure without revealing the whole document."],
    },
  ];
}

export const noteListings: NoteListing[] = courses.flatMap((course, courseIndex) => {
  const titles = noteTitlesByCourse[course.id] || [`${course.title} Notes`, `${course.title} Exam Pack`];
  return titles.map((suffix, noteIndex) => {
    const seller = mentors.find((mentor) => mentor.courseIds.includes(course.id)) || mentors[(courseIndex + noteIndex) % mentors.length];
    const professor = getProfessor(course.professorId);
    const sellerGrade = seller.courseHighlights.find((highlight) => highlight.courseId === course.id)?.grade || seller.courseHighlights[0]?.grade || "16/20";
    const title = `${course.title} ${suffix}`;
    const priceValue = 6.99 + ((courseIndex + noteIndex) % 7);
    return {
      id: `${course.slug}-${suffix.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`,
      title,
      sellerId: seller.id,
      sellerName: seller.displayName,
      sellerAvatar: seller.photo,
      sellerRating: seller.rating,
      sellerGrade,
      sellerSales: 48 + courseIndex * 9 + noteIndex * 6,
      courseId: course.id,
      professorId: course.professorId,
      universityId: course.universityId,
      subject: course.subject,
      description: `Complete revision notes for ${course.title}, including lecture summaries, exam methods, ${professor?.name || "professor"}-specific tips, and practice material for the main assessment.`,
      included: subjectInclusions[course.subject] || ["Lecture summaries", "Exam preparation", "Practice questions", "Professor-specific tips"],
      previewContent: makePreview(course, title),
      pageCount: 28 + ((courseIndex + noteIndex) % 6) * 5,
      previewPages: noteIndex % 3 === 0 ? [1, 2, 4] : [1, 2],
      fileType: noteIndex % 5 === 0 ? "Slides" : "PDF",
      price: `€${priceValue.toFixed(2)}`,
      priceValue,
      rating: Number((4.5 + ((courseIndex + noteIndex) % 5) * 0.1).toFixed(1)),
      ratingCount: 12 + courseIndex * 2 + noteIndex * 3,
      purchases: 35 + courseIndex * 11 + noteIndex * 7,
      lastUpdated: ["January 2026", "March 2026", "April 2026", "May 2026", "June 2026"][(courseIndex + noteIndex) % 5],
      academicYear: noteIndex % 2 === 0 ? "2025-2026" : "2024-2025",
      semester: noteIndex % 3 === 0 ? "Fall" : noteIndex % 3 === 1 ? "Spring" : "Full year",
      tags: [course.subject, "Exam prep", "Professor-specific"],
    } satisfies NoteListing;
  });
}).slice(0, 58);

export const subjects = Array.from(new Set(courses.map((course) => course.subject))).sort();
export const academicYears = Array.from(new Set(noteListings.map((note) => note.academicYear))).sort().reverse();

export function getUniversity(id: string) {
  return universities.find((university) => university.id === id);
}

export function getProfessor(id: string) {
  return professors.find((professor) => professor.id === id);
}

export function getCourse(idOrSlug: string) {
  return courses.find((course) => course.id === idOrSlug || course.slug === idOrSlug);
}

export function getMentor(id: string) {
  return mentors.find((mentor) => mentor.id === id);
}

export function getNote(id: string) {
  return noteListings.find((note) => note.id === id);
}

export function mentorsForCourse(courseId: string) {
  return mentors.filter((mentor) => mentor.courseIds.includes(courseId));
}

export function notesForCourse(courseId: string) {
  return noteListings.filter((note) => note.courseId === courseId);
}

export function formatCourseContext(courseId: string, professorId?: string) {
  const course = getCourse(courseId);
  const professor = getProfessor(professorId || course?.professorId || "");
  const university = getUniversity(course?.universityId || "");

  return {
    course,
    professor,
    university,
    label: [university?.name, course?.title, professor?.name].filter(Boolean).join(" - "),
  };
}

function normalize(value = "") {
  return value.trim().toLowerCase();
}

function includesValue(source: string | undefined, query: string) {
  return normalize(source).includes(query);
}

function mentorSearchText(mentor: MentorProfile) {
  const university = getUniversity(mentor.universityId);
  const courseText = mentor.courseIds.map((courseId) => {
    const context = formatCourseContext(courseId);
    return [context.course?.title, context.professor?.name, context.course?.subject, context.university?.name].join(" ");
  }).join(" ");
  return [mentor.displayName, mentor.firstName, mentor.program, mentor.bio, mentor.area, university?.name, university?.shortName, courseText].join(" ");
}

function noteSearchText(note: NoteListing) {
  const context = formatCourseContext(note.courseId, note.professorId);
  return [note.title, note.sellerName, note.subject, note.description, context.course?.title, context.professor?.name, context.university?.name, context.university?.shortName].join(" ");
}

export function filterMentors(input: MentorFilterInput = {}) {
  const query = normalize(input.q);
  const courseQuery = normalize(input.course);
  const professorQuery = normalize(input.professor);
  let result = mentors.filter((mentor) => {
    const university = getUniversity(mentor.universityId);
    const primary = formatCourseContext(mentor.courseHighlights[0].courseId, mentor.courseHighlights[0].professorId);
    const mentorCourses = mentor.courseIds.map((courseId) => getCourse(courseId));
    const mentorProfessors = mentor.professorIds.map((professorId) => getProfessor(professorId));
    const matchesQuery = !query || includesValue(mentorSearchText(mentor), query);
    const matchesUniversity = !input.university || input.university === "all" || mentor.universityId === input.university || normalize(university?.name).includes(normalize(input.university));
    const matchesSubject = !input.subject || input.subject === "all" || mentorCourses.some((course) => course?.subject === input.subject);
    const matchesCourse = !courseQuery || mentorCourses.some((course) => includesValue(course?.title, courseQuery) || includesValue(course?.slug, courseQuery));
    const matchesProfessor = !professorQuery || mentorProfessors.some((professor) => includesValue(professor?.name, professorQuery));
    const matchesPrice = !input.price || input.price === "all" || (input.price === "under25" ? mentor.hourlyRate < 25 : input.price === "25to30" ? mentor.hourlyRate >= 25 && mentor.hourlyRate <= 30 : mentor.hourlyRate > 30);
    const matchesAvailability = !input.availability || input.availability === "all" || mentor.availabilityBucket === input.availability;
    const matchesDistance = !input.distance || input.distance === "all" || (input.distance === "under1" ? mentor.distanceMeters < 1000 : input.distance === "under3" ? mentor.distanceMeters <= 3000 : mentor.distanceMeters > 3000);
    const matchesRating = !input.rating || input.rating === "all" || mentor.rating >= Number(input.rating);
    const matchesMode = !input.mode || input.mode === "all" || mentor.modes.includes(input.mode as "Online" | "In person");
    const matchesVerified = input.verified !== "true" || mentor.courseHighlights.some((highlight) => highlight.verified);
    return matchesQuery && matchesUniversity && matchesSubject && matchesCourse && matchesProfessor && matchesPrice && matchesAvailability && matchesDistance && matchesRating && matchesMode && matchesVerified && Boolean(primary.course);
  });

  result = [...result].sort((a, b) => {
    if (input.sort === "highest-rated") return b.rating - a.rating;
    if (input.sort === "lowest-price") return a.hourlyRate - b.hourlyRate;
    if (input.sort === "nearest") return a.distanceMeters - b.distanceMeters;
    if (input.sort === "most-sessions") return b.completedSessions - a.completedSessions;
    return (b.rating * 20 + b.completedSessions / 4) - (a.rating * 20 + a.completedSessions / 4);
  });

  return result;
}

export function filterNotes(input: NoteFilterInput = {}) {
  const query = normalize(input.q);
  const courseQuery = normalize(input.course);
  const professorQuery = normalize(input.professor);
  let result = noteListings.filter((note) => {
    const context = formatCourseContext(note.courseId, note.professorId);
    const matchesQuery = !query || includesValue(noteSearchText(note), query);
    const matchesUniversity = !input.university || input.university === "all" || note.universityId === input.university;
    const matchesSubject = !input.subject || input.subject === "all" || note.subject === input.subject;
    const matchesCourse = !courseQuery || includesValue(context.course?.title, courseQuery) || includesValue(context.course?.slug, courseQuery);
    const matchesProfessor = !professorQuery || includesValue(context.professor?.name, professorQuery);
    const matchesPrice = !input.price || input.price === "all" || (input.price === "under8" ? note.priceValue < 8 : input.price === "8to11" ? note.priceValue >= 8 && note.priceValue <= 11 : note.priceValue > 11);
    const matchesRating = !input.rating || input.rating === "all" || note.rating >= Number(input.rating);
    const matchesYear = !input.academicYear || input.academicYear === "all" || note.academicYear === input.academicYear;
    const matchesFile = !input.fileType || input.fileType === "all" || note.fileType === input.fileType;
    return matchesQuery && matchesUniversity && matchesSubject && matchesCourse && matchesProfessor && matchesPrice && matchesRating && matchesYear && matchesFile;
  });

  result = [...result].sort((a, b) => {
    if (input.sort === "highest-rated") return b.rating - a.rating;
    if (input.sort === "most-purchased") return b.purchases - a.purchases;
    if (input.sort === "newest") return b.lastUpdated.localeCompare(a.lastUpdated);
    if (input.sort === "price-low") return a.priceValue - b.priceValue;
    if (input.sort === "price-high") return b.priceValue - a.priceValue;
    return (b.rating * 20 + b.purchases / 10) - (a.rating * 20 + a.purchases / 10);
  });

  return result;
}

export function searchAcademic(query = "") {
  const value = normalize(query);
  if (!value) {
    return { courses, mentors, notes: noteListings };
  }

  const matchingCourses = courses.filter((course) => {
    const professor = getProfessor(course.professorId);
    const university = getUniversity(course.universityId);
    return [course.title, course.code, course.subject, professor?.name, university?.name].some((item) => includesValue(item, value));
  });

  return {
    courses: matchingCourses,
    mentors: filterMentors({ q: query }),
    notes: filterNotes({ q: query }),
  };
}

export function mentorsToMapStudents(input: MentorProfile[] = mentors): Student[] {
  return input.map((mentor) => {
    const highlight = mentor.courseHighlights[0];
    const context = formatCourseContext(highlight.courseId, highlight.professorId);
    const university = getUniversity(mentor.universityId);
    return {
      id: mentor.id,
      fullName: mentor.displayName,
      displayName: mentor.displayName,
      university: university?.name || "",
      photo: mentor.photo,
      area: mentor.area,
      distance: mentor.distance,
      bio: mentor.bio,
      skills: [context.course?.title || "", context.professor?.name || "", context.course?.subject || ""].filter(Boolean),
      categories: ["academic-mentoring"],
      services: [{ name: context.course?.title || "Course mentoring", description: mentor.bio, price: `€${mentor.hourlyRate}/hour`, pricingType: "hourly", availability: mentor.nextAvailable, category: "academic-mentoring" }],
      startingPrice: `€${mentor.hourlyRate}/hour`,
      startingPriceValue: mentor.hourlyRate,
      rating: mentor.rating,
      reviews: mentor.reviews,
      availability: mentor.nextAvailable,
      availabilityTag: mentor.nextAvailable,
      responseTime: mentor.responseTime,
      responseRate: "96%",
      completedTasks: mentor.completedSessions,
      repeatBookings: Math.round(mentor.completedSessions * 0.32),
      languages: ["French", "English"],
      serviceAreas: [mentor.area],
      baseArrondissement: mentor.arrondissement,
      approximateLatitude: mentor.approximateLatitude,
      approximateLongitude: mentor.approximateLongitude,
      weeklyAvailability: [],
      languageLevels: [],
      capabilities: [
        { service: context.course?.title || "Course mentoring", enabled: true, price: mentor.hourlyRate, pricingType: "hourly", description: `Completed with grade ${highlight.grade}.`, availability: mentor.nextAvailable, category: "academic-mentoring" },
        { service: context.professor?.name || "Professor-specific support", enabled: true, price: mentor.hourlyRate, pricingType: "hourly", description: "Professor-specific exam preparation.", availability: mentor.nextAvailable, category: "academic-mentoring" },
        { service: mentor.distance, enabled: true, price: mentor.hourlyRate, pricingType: "hourly", description: "Approximate area distance.", availability: mentor.nextAvailable, category: "academic-mentoring" },
      ],
      memberSince: mentor.joinedAt,
      travelNote: "Approximate campus or arrondissement-level meeting area.",
      verified: mentor.verified,
      reviewSnippets: [],
    };
  });
}
