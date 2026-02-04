import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import gsap from "gsap";

import { site } from "@/data/site";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Events", path: "/events" },
  { label: "Activities", path: "/activities" },
  { label: "Partners", path: "/partners" },
  { label: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(".nav-logo",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(".nav-link",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(".nav-cta",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between nav-bar h-20 md:h-16">
          <Link to="/" className="flex items-center gap-3 nav-logo focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-md" aria-label="Home">
            <div className="flex items-center justify-center">
              <img src="/favicon.png" alt="" className="h-10 w-12 object-contain" aria-hidden />
            </div>
            <span className="sr-only">{site.name}</span>
            <span className="hidden md:inline text-3xl font-normal tracking-tight">Code Wizards</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                className="nav-link text-lg font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                aria-label={link.label}
              >
                <span className="link-underline-gradient">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Button asChild className="nav-cta hidden lg:inline-flex btn-animated-border btn-glow" aria-label="Register">
                <Link to="/registration" className="px-5 py-3 rounded-full text-2xl">Register</Link>
              </Button>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
              <button
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => setOpen((s) => !s)}
                className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer (simple) */}
        {open && (
          <div className="md:hidden mt-2 pb-6 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setOpen(false)} className="px-4 py-3 rounded-md text-lg font-semibold hover:bg-muted/10">
                  {link.label}
                </Link>
              ))}
              <Link to="/registration" onClick={() => setOpen(false)} className="mx-4">
                <div className="w-full text-center btn-animated-border rounded-full px-6 py-3 text-2xl">Register</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
