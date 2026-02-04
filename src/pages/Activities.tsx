import { EventCard } from "@/components/EventCard";
import { activities } from "@/data/activities";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Activities = () => {
    const categories = ["upcoming", "ongoing", "past"];
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const hallOfFameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current?.children || [],
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }
            );

            gsap.fromTo(".hof-card",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: hallOfFameRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen py-20">
            <div className="container mx-auto px-4">
                <div ref={headerRef} className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
                        Club <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Activities</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
                        Beyond major events, join our regular sessions to build consistency and skills.
                    </p>
                </div>

                <Tabs defaultValue="ongoing" className="w-full">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                        <TabsTrigger value="past">Past</TabsTrigger>
                    </TabsList>

                    {categories.map((category) => {
                        const filtered = activities.filter(a => a.status === category);
                        return (
                            <TabsContent key={category} value={category} className="space-y-8 animate-fade-in">
                                {filtered.length === 0 ? (
                                    <Card className="glass-card border-none max-w-2xl mx-auto text-center">
                                        <CardContent className="p-12 space-y-6">
                                            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                                <CalendarClock className="h-10 w-10 text-primary" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-bold capitalize">No {category} Activities</h3>
                                                <p className="text-lg text-muted-foreground">
                                                    Check back later for {category} activities or explore other categories.
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                                        {filtered.map((activity) => (
                                            <EventCard key={activity.slug} event={activity} layout="vertical" />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                        );
                    })}
                </Tabs>

                <div ref={hallOfFameRef} className="mt-20 mb-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Fame</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                            Celebrating the brilliant minds who triumphed in our recent challenges.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {[
                            {
                                img: "/create winners.png",
                                title: "Create Challenge",
                                desc: "Honoring the most creative minds."
                            },
                            {
                                img: "/quiz winners.png",
                                title: "Quiz Competition",
                                desc: "Celebrating the sharpest intellects."
                            },
                            {
                                img: "/giveaway winners.png",
                                title: "Giveaway Winners",
                                desc: "Congratulations to our lucky winners."
                            }
                        ].map((item, index) => (
                            <Card key={index} className="hof-card glass-card border-none overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-500 hover:translate-y-[-5px]">
                                <CardContent className="p-0">
                                    <div className="relative aspect-[4/5] w-full overflow-hidden group">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
                                        <div className="absolute bottom-0 left-0 p-5 w-full">
                                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                            <p className="text-gray-300 text-sm line-clamp-2">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Activities;
