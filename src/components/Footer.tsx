import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { site, algozenith } from "@/data/site";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-col",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          }
        }
      );

      gsap.to(".footer-bg-text", {
        y: -50,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1
        }
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full bg-black text-white overflow-hidden pt-12 md:pt-20 pb-28 md:pb-40">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16 mb-20 lg:mb-32">

          {/* Logo Section */}
          <div className="flex-shrink-0 footer-col">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img src="/favicon.png" alt="" className="h-10 w-12 md:h-16 md:w-20 object-contain" aria-hidden />
              <span className="text-3xl md:text-5xl font-normal tracking-tight">Code Wizards</span>
            </Link>
            <p className="text-gray-400 text-sm md:text-base max-w-xs leading-relaxed">
              © copyright Code Wizards {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 w-full lg:w-auto text-base">

            {/* Pages */}
            <div className="flex flex-col gap-4 footer-col">
              <h4 className="font-semibold text-base uppercase tracking-wider text-white">Pages</h4>
              <nav className="flex flex-col gap-3 text-gray-400">
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
                <Link to="/events" className="hover:text-white transition-colors">Events</Link>
                <Link to="/partners" className="hover:text-white transition-colors">Partners</Link>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </nav>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4 footer-col">
              <h4 className="font-semibold text-base uppercase tracking-wider text-white">Legal</h4>
              <nav className="flex flex-col gap-3 text-gray-400">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </nav>
            </div>

            {/* Register */}
            <div className="flex flex-col gap-4 footer-col">
              <h4 className="font-semibold text-base uppercase tracking-wider text-white">Register</h4>
              <nav className="flex flex-col gap-3 text-gray-400">
                <Link to="/registration" className="hover:text-white transition-colors">Register Now</Link>
              </nav>
            </div>

            {/* Social columns — always side by side */}
            <div className="col-span-2 grid grid-cols-2 gap-8 footer-col">

              {/* Code Wizards Socials */}
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-base uppercase tracking-wider text-white">Code Wizards</h4>
                <nav className="flex flex-col gap-3 text-gray-400">
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Instagram className="h-4 w-4 text-pink-500 flex-shrink-0" />
                    Instagram
                  </a>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Linkedin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    LinkedIn
                  </a>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    Email
                  </a>
                </nav>
              </div>

              {/* Algozenith ATU Socials */}
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-base uppercase tracking-wider text-white">Algozenith ATU</h4>
                <nav className="flex flex-col gap-3 text-gray-400">
                  <a href={algozenith.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Instagram className="h-4 w-4 text-pink-500 flex-shrink-0" />
                    Instagram
                  </a>
                  <a href={algozenith.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Linkedin className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    LinkedIn
                  </a>
                  <a href={`mailto:${algozenith.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    Email
                  </a>
                </nav>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Large Bottom Text Effect */}
      <div className="absolute bottom-0 md:bottom-[-5%] left-1/2 -translate-x-1/2 w-full select-none pointer-events-none leading-none z-0">
        <h1 className="footer-bg-text text-[16vw] md:text-[15vw] font-normal text-[#323232] whitespace-nowrap text-center tracking-tighter uppercase opacity-100">
          Code Wizards
        </h1>
      </div>
    </footer>
  );
};
