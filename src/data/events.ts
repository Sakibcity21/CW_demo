export type Event = {
  slug: string;
  title: string;
  date: string;
  image: string;
  summary: string;
  location?: string;
  registrationOpen?: boolean;
  status?: "coming soon" | "announced soon" | "upcoming" | "past" | "ongoing";
};

export const upcoming: Event[] = [];

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
