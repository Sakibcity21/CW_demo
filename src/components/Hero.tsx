import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { site } from "@/data/site";
import CodeMockup from "@/components/CodeMockup";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current?.children || [],
        { y: 100, opacity: 0, rotateX: -45 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.1, duration: 1.2 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          textRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current?.children || [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          mockupRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" },
          "-=1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero_bg_4.png"
          alt="Hero Background"
          className="w-full h-full object-bottom opacity-100 "
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute -left-24 top-10 w-80 h-80 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl transform-gpu z-0" />
      <div className="absolute right-8 bottom-8 w-96 h-96 bg-accent/20 rounded-full blur-3xl transform-gpu z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: text */}
          <div className="lg:col-span-7 hero-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/6 border border-primary/12 backdrop-blur-sm glass mb-6">
              <Sparkles className="h-4 w-4 text-cyan-300" aria-hidden />
              <span className="text-sm font-medium text-primary">An initiative by <span className="font-semibold">DYP-ATU</span>
              </span>
            </div>

            <div className="max-w-3xl">
              <h1 ref={headlineRef} className="text-4xl sm:text-6xl lg:text-[7.5rem] leading-none font-normal tracking-tight -ml-1 perspective-[1000px]">
                <div className="block">Code Wizards</div>
              </h1>
              <h3 ref={subtitleRef} className="text-xl sm:text-3xl lg:text-[3.1rem] leading-tight font-extrabold tracking-tight mt-3 sm:mt-4">
                <div className="block">Empowering Coders of Tomorrow</div>
              </h3>

              <p ref={textRef} className="mt-4 sm:mt-6 text-sm sm:text-lg text-muted-foreground max-w-2xl">
                A student-driven club fostering innovation, learning, and collaboration through code. Join us to learn, build, and grow together.
              </p>

              <div ref={ctaRef} className="mt-6 sm:mt-8 hero-cta-row flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/registration" className="btn-animated-border inline-flex justify-center items-center gap-2 sm:gap-3 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold text-primary-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50" aria-label="Register for event">
                  Join Us Today {site.shortName}
                </Link>

                <Link to="/events" className="inline-flex justify-center items-center gap-2 sm:gap-3 rounded-full px-5 py-2.5 sm:px-5 sm:py-3 text-base sm:text-lg font-medium border border-muted/30 bg-background/20 hover:bg-muted/5 focus:outline-none focus:ring-2 focus:ring-primary/40" aria-label="View Events">
                  View Upcoming Events
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: code mockup */}
          <div className="lg:col-span-5">
            <div ref={mockupRef} className="hero-illustration">
              <CodeMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
