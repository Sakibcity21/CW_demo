import { Event } from "./events";

export const activities: Event[] = [
    {
        slug: "dev-sprint",
        title: "Dev Sprint",
        date: "2026-04-05",
        image: "/devsprint.png",
        summary: "Hands-on dev sprint — build, break, learn, and ship features.",
        location: "Workshop Room",
        registrationOpen: true,
        status: "ongoing"
    },
    {
        slug: "dsa-sprint",
        title: "DSA Sprint",
        date: "2026-01-31",
        image: "/dsa sprint.png",
        summary: "A rapid-fire DSA sprint to sharpen problem-solving and speed. Event completed.",
        location: "Lab 2",
        registrationOpen: false,
        status: "past"
    },
    {
        slug: "portfolio-competition",
        title: "CREATE - Portfolio Quest",
        date: "2025-11-12",
        image: "/CREATE.png",
        summary: "Showcase your web development skills by creating a stunning personal portfolio website in this exciting competition.",
        status: "past"
    },
    {
        slug: "linkedin-webinar",
        title: "Linkedin For Beginners",
        date: "2025-11-01",
        image: "/linkdinweb.png",
        summary: "Learn how to effectively use LinkedIn to build your professional network, showcase your skills, and land job opportunities.",
        status: "past"
    },
    {
        slug: "saas-expert-talk",
        title: "How to crack SAAS based company",
        date: "2025-09-20",
        image: "/ex talk 20-09-25.png",
        summary: "Join us for an insightful session with industry experts sharing their journey and tips on succeeding in SAAS-based companies.",
        status: "past"
    },
    {
        slug: "quiz-challenge",
        title: "Ultimate Quiz Challenge",
        date: "2025-09-20",
        image: "/quiz 20-06-25 banner.png",
        summary: "A comprehensive hands-on workshop covering graph data structures, traversal algorithms, and practical problem-solving.",
        status: "past"
    },
    // {
    //     slug: "weekly-dsa-sessions",
    //     title: "Weekly DSA Sessions",
    //     date: "Every Saturday",
    //     image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    //     summary: "Solve problems, clear concepts, and master algorithms every week.",
    //     status: "ongoing"
    // },
];
