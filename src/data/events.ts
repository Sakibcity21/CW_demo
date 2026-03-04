export type Event = {
  slug: string;
  title: string;
  date: string;
  image: string;
  summary: string;
  location?: string;
  registrationOpen?: boolean;
  status?: "coming soon" | "announced soon" | "upcoming" | "past" | "ongoing";
  link?: string;
  registrationLink?: string;
};

export const upcoming: Event[] = [
  {
    slug: "student-fest-2026",
    title: "Student Fest 2026",
    date: "2026-03-07",
    image: "/student-fest-2026.png",
    summary: "A TECHNICAL SESSION & NETWORKING EVENT organized by Code Wizards coding club at D. Y. Patil Agricultural & Technical University.",
    location: "University Conference Hall (On-Campus)",
    registrationOpen: false,
    status: "upcoming",
    link: "/student-fest-2026"
  },
];

export const past: Event[] = [
  {
    slug: "ignition",
    title: "Ignition",
    date: "2025-11-15",
    image: "/ignition.png",
    summary: "Ignition — the kickoff for builders, coders, and creators. Event completed.",
    location: "Main Auditorium",
    registrationOpen: false,
  },
];
