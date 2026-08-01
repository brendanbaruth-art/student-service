export const heroSearchExamples = [
  "Dog walking",
  "Moving help",
  "Statistics tutor",
  "Furniture assembly",
  "Photography",
];

export const skillMoments = [
  {
    studentId: "camille-martin",
    name: "Camille M.",
    service: "Dog walking",
    area: "17e",
    availability: "Available tonight",
    price: "€26/hour",
    travel: "12 minutes away",
    university: "Sorbonne Université",
  },
  {
    studentId: "hugo-laurent",
    name: "Hugo L.",
    service: "Statistics tutoring",
    area: "16e",
    availability: "Free after 17:00",
    price: "€22/hour",
    travel: "Online or near Dauphine",
    university: "Université Paris Dauphine - PSL",
  },
  {
    studentId: "youssef-benali",
    name: "Youssef B.",
    service: "Furniture assembly",
    area: "13e",
    availability: "Saturday afternoon",
    price: "€25/hour",
    travel: "Has a basic toolkit",
    university: "Université Paris Cité",
  },
  {
    studentId: "lea-moreau",
    name: "Léa M.",
    service: "Birthday photography",
    area: "5e",
    availability: "Weekend evenings",
    price: "€35 fixed price",
    travel: "Near Saint-Germain",
    university: "Sciences Po Paris",
  },
];

export const parisMotionMoments = [
  {
    time: "08:00",
    task: "Dog walking in the 17e",
    area: "17e",
    areaNumber: 17,
    studentId: "camille-martin",
    preview: "Camille can cover an early walk before class.",
    detail: "Approximate availability",
    center: [2.3068, 48.8873] as [number, number],
    zoom: 12.7,
  },
  {
    time: "13:00",
    task: "Excel help near ESCP",
    area: "11e",
    areaNumber: 11,
    studentId: "hugo-laurent",
    preview: "Hugo helps with formulas, models, and exam prep.",
    detail: "Online or near République",
    center: [2.3797, 48.8584] as [number, number],
    zoom: 12.9,
  },
  {
    time: "17:30",
    task: "Moving boxes in Batignolles",
    area: "17e",
    areaNumber: 17,
    studentId: "youssef-benali",
    preview: "Youssef can help carry boxes after lectures.",
    detail: "Two-hour moving request",
    center: [2.3068, 48.8873] as [number, number],
    zoom: 13,
  },
  {
    time: "20:00",
    task: "Birthday photography in the 5e",
    area: "5e",
    areaNumber: 5,
    studentId: "lea-moreau",
    preview: "Léa is available for a short evening shoot.",
    detail: "Fixed-price event help",
    center: [2.3509, 48.8445] as [number, number],
    zoom: 13.1,
  },
];

export const pulseItems = [
  "Camille is available for dog walking tonight.",
  "Hugo listed moving help in the 17e.",
  "Maya added party photography.",
  "Four students can help with Excel near ESCP.",
  "Adam is available for plant care this weekend.",
];

export const homepageRequests = [
  {
    title: "Need help moving six boxes",
    area: "17e",
    timing: "Saturday",
    budget: "€45",
  },
  {
    title: "Dog walker tomorrow morning",
    area: "Levallois",
    timing: "Tomorrow",
    budget: "€25",
  },
  {
    title: "Need help with an Excel model",
    area: "Near ESCP",
    timing: "Tomorrow",
    budget: "€20/hour",
  },
];
