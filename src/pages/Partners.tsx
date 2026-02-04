import { partners } from "@/data/partners";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Partners = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current?.children || [],
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out"
                }
            );

            gsap.fromTo(".partner-card",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".partner-grid",
                        start: "top 85%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen py-20 pb-40">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-20 space-y-4">
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Partners</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
                        Collaborating with industry leaders to bring the best opportunities to our community.
                    </p>
                </div>

                {/* Partners Grid - 2x2 Layout */}
                <div className="partner-grid grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-32">
                    {partners.map((partner, index) => (
                        <Card key={partner.name} className="partner-card glass-card border-none overflow-hidden hover:shadow-cyan-500/10 transition-all duration-300">
                            <CardContent className="p-0 flex flex-col h-full">
                                {/* Partner Info Section */}
                                <div className="p-8 sm:p-10 flex-1 space-y-6">
                                    <div className="h-24 flex items-center justify-start">
                                        <img
                                            src={partner.logo}
                                            alt={`${partner.name} logo`}
                                            className="h-full w-auto max-w-[200px] object-contain filter brightness-0 invert opacity-80"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-3xl font-bold">{partner.name}</h3>
                                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                                                {partner.type}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-lg leading-relaxed">
                                            {partner.description}
                                        </p>
                                    </div>

                                    {partner.website !== "#" && (
                                        <a
                                            href={partner.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                                        >
                                            Visit Website <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>

                                {/* Ambassador Section */}
                                <div className="bg-white/5 p-6 sm:p-8 border-t border-white/10 mt-auto">
                                    <div className="flex flex-col gap-4">
                                        {partner.ambassadors.map((ambassador, i) => (
                                            <div key={i} className="flex items-center gap-6">
                                                <div className="relative shrink-0">
                                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-primary/20 bg-muted">
                                                        <img
                                                            src={ambassador.image}
                                                            alt={ambassador.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-black text-xs font-bold border-2 border-black" title="Verified Ambassador">
                                                        <span>✓</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Student Representative</p>
                                                    <h4 className="text-xl font-bold text-white">{ambassador.name}</h4>
                                                    <p className="text-primary text-sm font-medium">{ambassador.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="partner-cta relative overflow-hidden rounded-[2rem] glass-card border border-primary/20 p-12 text-center shadow-2xl transition-all duration-300 hover:scale-[1.01]">
                        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                Partner With Us
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                                Connect with our vibrant community of developers. Reach out to discuss sponsorship and collaboration opportunities.
                            </p>
                            <Button
                                asChild
                                size="lg"
                                className="btn-animated-border h-auto py-4 px-10 text-xl rounded-full font-semibold shadow-lg hover:shadow-cyan-500/20 active:scale-95 transition-all duration-300"
                            >
                                <Link to="/contact">
                                    Become a Partner
                                    <ArrowRight className="ml-2 h-6 w-6" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Partners;
