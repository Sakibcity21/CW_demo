import { EventCard } from "@/components/EventCard";
import { upcoming, past } from "@/data/events";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Events = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".events-header > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="events-header text-center mb-16 space-y-4">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Events</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
            Join us for workshops, hackathons, and tech talks designed to boost your coding skills.
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-8 animate-fade-in">
            {upcoming.length === 0 ? (
              <Card className="glass-card border-none max-w-2xl mx-auto text-center">
                <CardContent className="p-12 space-y-6">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <CalendarClock className="h-10 w-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold">Coming Soon!</h3>
                    <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                      We're cooking up something special. Stay tuned for updated hackathons, workshops, and tech talks coming your way.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6 justify-items-center max-w-5xl mx-auto">
                {upcoming.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 gap-6 justify-items-center max-w-5xl mx-auto">
              {past.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;
