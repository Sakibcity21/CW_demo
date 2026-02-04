import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { activities } from "@/data/activities";
import { Calendar } from "lucide-react";

export const ActivitiesCarousel: React.FC = () => {
    const items = activities;
    // duration scales with number of items so speed feels consistent
    const durationSec = Math.max(12, items.length * 3.5);

    return (
        <section aria-label="Our Activities" className="w-full">
            <div className="marquee" role="region" aria-roledescription="carousel" aria-label="Activities marquee">
                <div
                    className="marquee__track"
                    style={{ ['--marquee-duration' as any]: `${durationSec}s` }}
                    tabIndex={0}
                >
                    {/* two copies for seamless infinite loop */}
                    {[0, 1].map((rep) => (
                        <div key={rep} className="marquee__group inline-flex items-stretch gap-6">
                            {items.map((activity) => {
                                const formattedDate = activity.date; // Date might be a string like "Every Saturday" or ISO date, using as is or formatting if needed. 
                                // The current Event type defines date as string, so we'll try to check if it's a valid date or just display it.
                                // Given the mixed data ("2026-04-05" and "Every Saturday"), simple display is safer or a check.

                                let displayDate = activity.date;
                                const dateObj = new Date(activity.date);
                                if (!isNaN(dateObj.getTime()) && !activity.date.includes("Every")) {
                                    displayDate = dateObj.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    });
                                }

                                return (
                                    <div
                                        key={`${rep}-${activity.slug}`}
                                        className="marquee-item flex-shrink-0 min-w-[260px] md:min-w-[300px] lg:min-w-[320px]"
                                        role="group"
                                        aria-label={activity.title}
                                        tabIndex={-1}
                                    >
                                        <Card className="glass-card border-none overflow-hidden rounded-xl max-w-[360px] hover:scale-[1.02] transition-transform duration-300">
                                            <div className="relative w-full overflow-hidden bg-muted aspect-[4/5]">
                                                <img
                                                    src={activity.image}
                                                    alt={activity.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                            </div>
                                            <CardContent className="p-4 md:p-6">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                    <Calendar className="h-4 w-4 text-primary" />
                                                    {displayDate}
                                                </div>
                                                <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                                                <p className="text-sm text-muted-foreground line-clamp-2">{activity.summary}</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ActivitiesCarousel;
