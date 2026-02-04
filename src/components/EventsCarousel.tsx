import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { past } from "@/data/events";
import { Calendar } from "lucide-react";

export const EventsCarousel: React.FC = () => {
  const items = past;
  // duration scales with number of items so speed feels consistent
  const durationSec = Math.max(12, items.length * 3.5);

  return (
    <section aria-label="Past events" className="w-full">
      <div className="marquee" role="region" aria-roledescription="carousel" aria-label="Past events marquee">
        <div
          className="marquee__track"
          style={{ ['--marquee-duration' as any]: `${durationSec}s` }}
          tabIndex={0}
        >
          {/* two copies for seamless infinite loop */}
          {[0, 1].map((rep) => (
            <div key={rep} className="marquee__group inline-flex items-stretch gap-6">
              {items.map((event) => {
                const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                return (
                  <div
                    key={`${rep}-${event.slug}`}
                    className="marquee-item flex-shrink-0 min-w-[260px] md:min-w-[300px] lg:min-w-[320px]"
                    role="group"
                    aria-label={event.title}
                    tabIndex={-1}
                  >
                    <Card className="overflow-hidden rounded-xl max-w-[360px]">
                      <div className="relative w-full overflow-hidden bg-muted aspect-[4/5]">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          {formattedDate}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{event.summary}</p>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Fallback grid for very small screens + reduced-motion handled in CSS */}
      <noscript>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((event) => (
            <Card key={`noscript-${event.slug}`} className="overflow-hidden rounded-xl">
              <div className="relative w-full overflow-hidden bg-muted aspect-[4/5]">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">{new Date(event.date).toLocaleDateString()}</div>
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{event.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </noscript>
    </section>
  );
};

export default EventsCarousel;
