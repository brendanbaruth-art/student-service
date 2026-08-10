export type University = {
  id: string;
  name: string;
  city: string;
  country: string;
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
  modes: Array<"Online" | "In person">;
  verified: boolean;
  responseTime: string;
  courseIds: string[];
  professorIds: string[];
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
  sellerName: string;
  sellerRating: number;
  courseId: string;
  professorId: string;
  universityId: string;
  subject: string;
  description: string;
  pageCount: number;
  previewPages: number[];
  fileType: "PDF" | "DOCX" | "Slides";
  price: string;
  rating: number;
  purchases: number;
  lastUpdated: string;
  tags: string[];
};

export const universities: University[] = [
  { id: "escp", name: "ESCP Business School", city: "Paris", country: "France" },
  { id: "dauphine", name: "Université Paris Dauphine - PSL", city: "Paris", country: "France" },
  { id: "sorbonne", name: "Sorbonne Université", city: "Paris", country: "France" },
  { id: "paris-cite", name: "Université Paris Cité", city: "Paris", country: "France" },
  { id: "sciences-po", name: "Sciences Po Paris", city: "Paris", country: "France" },
];

export const professors: Professor[] = [
  { id: "claire-dupont", name: "Professor Claire Dupont", universityId: "escp", department: "Accounting" },
  { id: "marc-lefevre", name: "Professor Marc Lefèvre", universityId: "escp", department: "Finance" },
  { id: "sophie-martin", name: "Professor Sophie Martin", universityId: "dauphine", department: "Economics" },
  { id: "julien-moreau", name: "Professor Julien Moreau", universityId: "sorbonne", department: "Mathematics" },
  { id: "amina-belkacem", name: "Professor Amina Belkacem", universityId: "paris-cite", department: "Computer Science" },
  { id: "elise-garnier", name: "Professor Élise Garnier", universityId: "sciences-po", department: "Law" },
];

export const courses: Course[] = [
  {
    id: "financial-accounting",
    slug: "financial-accounting",
    title: "Financial Accounting",
    code: "ACC201",
    universityId: "escp",
    professorId: "claire-dupont",
    subject: "Accounting",
    level: "Bachelor",
    description: "Core accounting course covering statements, journal entries, consolidation basics, and final exam cases.",
  },
  {
    id: "corporate-finance",
    slug: "corporate-finance",
    title: "Corporate Finance",
    code: "FIN302",
    universityId: "escp",
    professorId: "marc-lefevre",
    subject: "Finance",
    level: "Master",
    description: "Valuation, capital budgeting, WACC, debt policy, and applied case questions.",
  },
  {
    id: "microeconomics",
    slug: "microeconomics",
    title: "Microeconomics",
    code: "ECO110",
    universityId: "dauphine",
    professorId: "sophie-martin",
    subject: "Economics",
    level: "Bachelor",
    description: "Consumer theory, producer theory, market equilibrium, welfare, and exam-style proofs.",
  },
  {
    id: "linear-algebra",
    slug: "linear-algebra",
    title: "Linear Algebra",
    code: "MATH104",
    universityId: "sorbonne",
    professorId: "julien-moreau",
    subject: "Mathematics",
    level: "Bachelor",
    description: "Matrices, vector spaces, linear maps, eigenvalues, diagonalisation, and problem sheets.",
  },
  {
    id: "data-structures",
    slug: "data-structures",
    title: "Data Structures",
    code: "CS210",
    universityId: "paris-cite",
    professorId: "amina-belkacem",
    subject: "Computer Science",
    level: "Bachelor",
    description: "Algorithms, trees, graphs, hash tables, complexity, and coding assignment preparation.",
  },
  {
    id: "european-law",
    slug: "european-law",
    title: "European Law",
    code: "LAW240",
    universityId: "sciences-po",
    professorId: "elise-garnier",
    subject: "Law",
    level: "Master",
    description: "EU institutions, case law, direct effect, supremacy, and structured essay preparation.",
  },
];

const photos = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=900&q=80",
];

export const mentors: MentorProfile[] = [
  {
    id: "camille-martin",
    firstName: "Camille",
    displayName: "Camille M.",
    photo: photos[0],
    universityId: "escp",
    program: "Master in Management",
    year: "M2",
    bio: "Camille helps students prepare for accounting cases, professor-specific grading expectations, and exam formats from ESCP core courses.",
    hourlyRate: 28,
    rating: 4.9,
    reviews: 48,
    completedSessions: 126,
    nextAvailable: "Tonight 18:30",
    modes: ["Online", "In person"],
    verified: true,
    responseTime: "Replies in 12 min",
    courseIds: ["financial-accounting", "corporate-finance"],
    professorIds: ["claire-dupont", "marc-lefevre"],
    courseHighlights: [
      {
        courseId: "financial-accounting",
        professorId: "claire-dupont",
        grade: "17/20",
        verified: true,
        note: "Knows the final exam structure and Professor Dupont's marking style.",
      },
    ],
  },
  {
    id: "youssef-benali",
    firstName: "Youssef",
    displayName: "Youssef B.",
    photo: photos[1],
    universityId: "dauphine",
    program: "Economics and Applied Mathematics",
    year: "L3",
    bio: "Youssef focuses on microeconomics problem sets, diagrams, and proof logic for students who need a precise exam plan.",
    hourlyRate: 24,
    rating: 4.8,
    reviews: 36,
    completedSessions: 91,
    nextAvailable: "Tomorrow 10:00",
    modes: ["Online"],
    verified: true,
    responseTime: "Replies in 20 min",
    courseIds: ["microeconomics", "linear-algebra"],
    professorIds: ["sophie-martin", "julien-moreau"],
    courseHighlights: [
      {
        courseId: "microeconomics",
        professorId: "sophie-martin",
        grade: "16/20",
        verified: true,
        note: "Previously completed the same Dauphine microeconomics course.",
      },
    ],
  },
  {
    id: "lea-moreau",
    firstName: "Léa",
    displayName: "Léa M.",
    photo: photos[2],
    universityId: "sorbonne",
    program: "Mathematics",
    year: "M1",
    bio: "Léa turns abstract maths into clear steps, especially for linear algebra exercises and oral exam preparation.",
    hourlyRate: 26,
    rating: 4.9,
    reviews: 42,
    completedSessions: 104,
    nextAvailable: "Friday 14:00",
    modes: ["Online", "In person"],
    verified: true,
    responseTime: "Replies in 18 min",
    courseIds: ["linear-algebra"],
    professorIds: ["julien-moreau"],
    courseHighlights: [
      {
        courseId: "linear-algebra",
        professorId: "julien-moreau",
        grade: "18/20",
        verified: true,
        note: "Course verified with transcript review.",
      },
    ],
  },
  {
    id: "amina-diallo",
    firstName: "Amina",
    displayName: "Amina D.",
    photo: photos[4],
    universityId: "paris-cite",
    program: "Computer Science",
    year: "L3",
    bio: "Amina mentors students through data structure assignments, debugging, complexity analysis, and exam-style algorithm questions.",
    hourlyRate: 30,
    rating: 4.7,
    reviews: 29,
    completedSessions: 73,
    nextAvailable: "Today 17:00",
    modes: ["Online"],
    verified: true,
    responseTime: "Replies in 9 min",
    courseIds: ["data-structures"],
    professorIds: ["amina-belkacem"],
    courseHighlights: [
      {
        courseId: "data-structures",
        professorId: "amina-belkacem",
        grade: "A",
        verified: true,
        note: "Completed the same coding assignments last year.",
      },
    ],
  },
  {
    id: "marc-vidal",
    firstName: "Marc",
    displayName: "Marc V.",
    photo: photos[5],
    universityId: "sciences-po",
    program: "European Affairs",
    year: "M2",
    bio: "Marc helps with European Law essays, case memorisation, and building argument structures for seminar participation.",
    hourlyRate: 27,
    rating: 4.8,
    reviews: 31,
    completedSessions: 64,
    nextAvailable: "Monday 16:00",
    modes: ["Online", "In person"],
    verified: true,
    responseTime: "Replies in 25 min",
    courseIds: ["european-law"],
    professorIds: ["elise-garnier"],
    courseHighlights: [
      {
        courseId: "european-law",
        professorId: "elise-garnier",
        grade: "16.5/20",
        verified: true,
        note: "Knows Professor Garnier's essay feedback patterns.",
      },
    ],
  },
];

export const noteListings: NoteListing[] = [
  {
    id: "financial-accounting-final-notes",
    title: "Financial Accounting Final Exam Notes",
    sellerName: "Camille",
    sellerRating: 4.9,
    courseId: "financial-accounting",
    professorId: "claire-dupont",
    universityId: "escp",
    subject: "Accounting",
    description: "Structured final exam notes with consolidation examples, journal entry patterns, and common Professor Dupont pitfalls.",
    pageCount: 38,
    previewPages: [1, 2],
    fileType: "PDF",
    price: "€8.99",
    rating: 4.8,
    purchases: 126,
    lastUpdated: "May 2026",
    tags: ["Final exam", "Worked examples", "Professor-specific"],
  },
  {
    id: "corporate-finance-case-pack",
    title: "Corporate Finance Case Pack",
    sellerName: "Camille",
    sellerRating: 4.9,
    courseId: "corporate-finance",
    professorId: "marc-lefevre",
    universityId: "escp",
    subject: "Finance",
    description: "Valuation templates, WACC formulas, and professor-style case walkthroughs.",
    pageCount: 44,
    previewPages: [1, 3],
    fileType: "PDF",
    price: "€10.99",
    rating: 4.7,
    purchases: 84,
    lastUpdated: "April 2026",
    tags: ["Cases", "Valuation", "Templates"],
  },
  {
    id: "microeconomics-diagrams",
    title: "Microeconomics Diagram and Proof Guide",
    sellerName: "Youssef",
    sellerRating: 4.8,
    courseId: "microeconomics",
    professorId: "sophie-martin",
    universityId: "dauphine",
    subject: "Economics",
    description: "Clean diagrams, proof templates, and exam reasoning steps for Dauphine microeconomics.",
    pageCount: 31,
    previewPages: [1, 2],
    fileType: "PDF",
    price: "€7.49",
    rating: 4.9,
    purchases: 97,
    lastUpdated: "June 2026",
    tags: ["Diagrams", "Proofs", "Exam prep"],
  },
  {
    id: "linear-algebra-problem-sheets",
    title: "Linear Algebra Problem Sheet Solutions",
    sellerName: "Léa",
    sellerRating: 4.9,
    courseId: "linear-algebra",
    professorId: "julien-moreau",
    universityId: "sorbonne",
    subject: "Mathematics",
    description: "Step-by-step solutions for vector spaces, eigenvalues, and diagonalisation exercises.",
    pageCount: 52,
    previewPages: [1, 2, 4],
    fileType: "PDF",
    price: "€9.99",
    rating: 4.8,
    purchases: 111,
    lastUpdated: "March 2026",
    tags: ["Problem sheets", "Solutions", "Exam revision"],
  },
  {
    id: "data-structures-assignment-guide",
    title: "Data Structures Assignment Guide",
    sellerName: "Amina",
    sellerRating: 4.7,
    courseId: "data-structures",
    professorId: "amina-belkacem",
    universityId: "paris-cite",
    subject: "Computer Science",
    description: "Annotated code patterns, complexity notes, and assignment planning for trees, graphs, and hash tables.",
    pageCount: 46,
    previewPages: [1, 2],
    fileType: "PDF",
    price: "€11.99",
    rating: 4.6,
    purchases: 72,
    lastUpdated: "May 2026",
    tags: ["Algorithms", "Assignments", "Code"],
  },
];

export const subjects = Array.from(new Set(courses.map((course) => course.subject))).sort();

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

export function searchAcademic(query = "") {
  const value = query.trim().toLowerCase();
  if (!value) {
    return { courses, mentors, notes: noteListings };
  }

  const matches = (...items: Array<string | undefined>) =>
    items.filter(Boolean).some((item) => item!.toLowerCase().includes(value));

  const matchingCourses = courses.filter((course) => {
    const professor = getProfessor(course.professorId);
    const university = getUniversity(course.universityId);
    return matches(course.title, course.code, course.subject, professor?.name, university?.name);
  });

  const matchingMentors = mentors.filter((mentor) => {
    const university = getUniversity(mentor.universityId);
    const mentorCourses = mentor.courseIds.map((courseId) => getCourse(courseId)?.title).join(" ");
    const mentorProfessors = mentor.professorIds.map((professorId) => getProfessor(professorId)?.name).join(" ");
    return matches(mentor.displayName, mentor.program, university?.name, mentorCourses, mentorProfessors, mentor.bio);
  });

  const matchingNotes = noteListings.filter((note) => {
    const context = formatCourseContext(note.courseId, note.professorId);
    return matches(note.title, note.subject, note.description, context.course?.title, context.professor?.name, context.university?.name);
  });

  return { courses: matchingCourses, mentors: matchingMentors, notes: matchingNotes };
}
