import { SponsorCard } from "@/components/SponsorCard";
import { Button } from "@/components/ui/button";
import { sponsors } from "@/data/sponsors";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Sponsors = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 space-y-16">
        <div className="text-center space-y-4 animate-fade-in mb-16">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Sponsors</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
            We're grateful to our amazing sponsors who make our events and initiatives possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>

        {/* Become a Sponsor CTA */}
        <section className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] glass-card border border-primary/20 p-12 text-center shadow-2xl">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Become a Sponsor
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                Partner with Code Wizards to empower the next generation of developers.
                Reach 200+ talented students and support innovation in tech education.
              </p>
              <Button
                asChild
                size="lg"
                className="btn-animated-border h-auto py-4 px-10 text-xl rounded-full font-semibold shadow-lg hover:shadow-cyan-500/20 active:scale-95 transition-all duration-300"
              >
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sponsors;
