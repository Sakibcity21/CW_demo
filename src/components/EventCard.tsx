import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Event } from "@/data/events";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  layout?: "horizontal" | "vertical";
}

export const EventCard = ({ event, layout = "horizontal" }: EventCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%", // Start when top of card hits 90% of viewport
          toggleActions: "play none none reverse",
          once: true // Animate only once per session
        }
      }
    );
  }, []);

  const formattedDate = !isNaN(new Date(event.date).getTime()) && !event.date.includes("Every")
    ? new Date(event.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : event.date;

  const isHorizontal = layout === "horizontal";

  return (
    <div ref={cardRef} className="w-full">
      <Card className={cn(
        "glass-card border-none overflow-hidden rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.01] flex",
        isHorizontal ? "flex-col sm:flex-row w-full max-w-2xl mx-auto" : "flex-col h-full"
      )}>
        <div className={cn(
          "relative overflow-hidden bg-muted",
          isHorizontal ? "w-full sm:w-2/5 md:w-1/3 aspect-video sm:aspect-auto" : "w-full aspect-[4/5]"
        )}>
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 will-change-transform hover:scale-105"
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-60 pointer-events-none",
            isHorizontal && "sm:hidden"
          )} />
        </div>

        <div className={cn(
          "flex flex-col flex-1 justify-between",
          isHorizontal ? "p-5 sm:p-6" : "p-6"
        )}>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="text-xl sm:text-2xl font-bold leading-tight link-underline-gradient">
                {event.title}
              </CardTitle>
              {event.registrationOpen && (
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30 shrink-0">Open</Badge>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground w-fit rounded-md bg-secondary/50 px-2.5 py-1">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formattedDate}</span>
              </div>

              {event.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground w-fit rounded-md bg-secondary/50 px-2.5 py-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3">
              {event.summary}
            </p>
          </div>

          <div className={cn(
            "mt-6 pt-4 border-t border-border/50 flex flex-wrap items-center gap-4",
            !isHorizontal && "mt-auto"
          )}>
            {event.link && (
              <Button asChild variant="outline" className="w-full sm:w-auto" aria-label={`View details for ${event.title}`}>
                <Link to={event.link}>
                  View Details
                </Link>
              </Button>
            )}
            {event.registrationOpen ? (
              <Button asChild className="w-full sm:w-auto btn-animated-border group ml-auto" aria-label={`Register for ${event.title}`}>
                {event.registrationLink ? (
                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="gap-2">
                    Register Now
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                ) : event.link ? (
                  <Link to={event.link} className="gap-2">
                    Register Now
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                ) : (
                  <Link to={`/registration?event=${event.slug}`} className="gap-2">
                    Register Now
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                )}
              </Button>
            ) : (
              <div className="text-sm font-medium text-muted-foreground italic ml-auto w-full sm:w-auto text-right">
                {event.status === "past" ? "Event Completed" : "Registration Closed"}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
