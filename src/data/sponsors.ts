export type Sponsor = {
  name: string;
  description: string;
  logo: string;
  url?: string;
};

export const sponsors: Sponsor[] = [
  {
    name: "Algozenith",
    description: "Competitive programming platform sponsorship for coding contests and practice sessions.",
    logo: "/algozenith.png",
    url: "#",
  },
  {
    name: "Gemini Student progrmam",
    description: "Sponsorship for hackathons and coding competitions.",
    logo: "/gemini.png",
    url: "#",
  },
  {
    name: "LetsUpgrade",
    description: "Online tech education platform sponsorship for workshops and training sessions.",
    logo: "/LU.png",
    url: "#",
  },
  // {
  //   name: "DataSync Inc.",
  //   description: "API access and data services for hackathons and competitions.",
  //   logo: "/placeholder.svg",
  //   url: "#",
  // },
  // {
  //   name: "PixelPerfect Design",
  //   description: "Design tools and resources for UI/UX workshops.",
  //   logo: "/placeholder.svg",
  //   url: "#",
  // },
  // {
  //   name: "CloudForge",
  //   description: "Hosting and deployment services for student applications.",
  //   logo: "/placeholder.svg",
  //   url: "#",
  // },
];
