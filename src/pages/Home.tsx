import { Link } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { ActivitiesCarousel } from "@/components/ActivitiesCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* Activities Section */}
      <section className="py-24 md:py-32 bg-muted/10 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-24 space-y-4">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-foreground">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Activities</span>
            </h2>
            <p className="text-lg sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our workshops, hackathons, and regular sessions.
            </p>
          </div>
          <ActivitiesCarousel />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-12 overflow-hidden">
        {/* Dark gradient blur effects */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-md p-12 md:p-24 text-center shadow-2xl">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary shadow-inner mb-2 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span>Join the Revolution</span>
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white">
                Want to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Collaborate</span> With Us?
              </h2>

              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Whether you want to host a workshop, sponsor an event, or partner with us, we'd love to hear from you!
              </p>

              <div className="pt-6">
                <Button
                  asChild
                  size="lg"
                  className="btn-animated-border h-auto py-4 px-10 text-xl rounded-full font-semibold shadow-lg hover:shadow-cyan-500/20 active:scale-95 transition-all duration-300"
                >
                  <Link to="/contact" className="flex items-center gap-3">
                    Get in Touch
                    <ArrowRight className="w-6 h-6" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
