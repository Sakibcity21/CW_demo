
export interface Partner {
    name: string;
    type: string;
    logo: string;
    description: string;
    website: string;
    ambassadors: {
        name: string;
        role: string;
        image: string;
    }[];
}

export const partners: Partner[] = [
    {
        name: "GeeksforGeeks",
        type: "Campus Mantri",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg",
        description: "GeeksforGeeks provides resources for computer science students.",
        website: "https://www.geeksforgeeks.org/",
        ambassadors: [
            {
                name: "Omkar Patil",
                role: "GFG Campus Mantri",
                image: "/omkar.jpeg"
            }
        ]
    },
    {
        name: "Algozenith",
        type: "Core Team",
        logo: "/algozenith.png",
        description: "Master competitive programming and DSA with Algozenith ATU.",
        website: "https://www.instagram.com/algozenith_atu_/",
        ambassadors: [
            {
                name: "Shivam Giri",
                role: "Campus Lead",
                image: "/shivam.jpeg"
            },
            {
                name: "Shivendra Ghatage",
                role: "Tech Lead",
                image: "/placeholder.svg" // Placeholder as user didn't provide individual image, just group photo ref
            },
            {
                name: "Sakib Sayyad",
                role: "Content & Design Lead",
                image: "/sakib.jpeg"
            },
            {
                name: "Nandan Gaikwad",
                role: "Media & Outreach Lead",
                image: "/nandan.jpeg"
            }
        ]
    },
    {
        name: "LetsUpgrade",
        type: "Education Partner",
        logo: "/LU.png",
        description: "Upskilling platform for students and professionals.",
        website: "https://letsupgrade.in/",
        ambassadors: [
            {
                name: "Omkar Patil",
                role: "Student Partner",
                image: "/omkar.jpeg"
            }
        ]
    },
    {
        name: "Gemini",
        type: "AI Partner",
        logo: "/gemini.png",
        description: "Supercharging development with advanced AI.",
        website: "https://deepmind.google/technologies/gemini/",
        ambassadors: [
            {
                name: "Anish",
                role: "Google Ambassador",
                image: "/anish.jpeg"
            }
        ]
    }
];
