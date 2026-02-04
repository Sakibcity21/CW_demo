import { MemberCard } from "@/components/MemberCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { core } from "@/data/members";
import { site } from "@/data/site";
import { Users, Calendar, Target, Trophy } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      const headerTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      headerTl.fromTo(".about-header > *",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2 }
      );

      // Mission & Vision
      gsap.fromTo(".mission-card",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".mission-section",
            start: "top 80%",
          }
        }
      );
      gsap.fromTo(".vision-card",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".mission-section",
            start: "top 80%",
          }
        }
      );

      // Initiatives Grid
      gsap.fromTo(".initiative-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".initiatives-grid",
            start: "top 85%",
          }
        }
      );

      // Stats Counter Animation
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((stat) => {
        const endValue = parseInt(stat.getAttribute("data-value") || "0", 10);
        gsap.fromTo(stat,
          { innerText: 0 },
          {
            innerText: endValue,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              once: true,
            },
            onUpdate: function () {
              stat.innerText = Math.ceil(this.targets()[0].innerText) + "+";
            }
          }
        );
      });

      // Core Team
      gsap.fromTo(".member-card-anim",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".core-team-grid",
            start: "top 85%",
          }
        }
      );

      // Roadmap
      gsap.utils.toArray(".roadmap-item").forEach((item: any, i) => {
        gsap.fromTo(item,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen py-20">
      <div className="container mx-auto px-4 space-y-20">
        {/* Header */}
        <div className="about-header text-center space-y-6 py-12">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Code Wizards</span>
          </h1>
          <p className="text-xl sm:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            {site.description}
          </p>
        </div>

        {/* Mission & Vision */}
        <section className="mission-section max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="mission-card space-y-6">
              <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Our Mission</h2>
              <Card className="glass-card border-none h-full">
                <CardContent className="p-8 space-y-4 text-lg text-muted-foreground leading-relaxed font-light">
                  <p>
                    Code Wizards is a vibrant community of passionate student developers, designers, and tech enthusiasts dedicated to fostering a culture of innovation, collaboration, and continuous learning.
                  </p>
                  <p>
                    Our club provides a platform for students to:
                  </p>
                  <ul className="space-y-3 list-disc list-inside text-foreground/80 pl-2">
                    <li>Collaborate on meaningful tech projects</li>
                    <li>Learn competitive programming</li>
                    <li>Gain hands-on experience with emerging tech</li>
                    <li>Build real-world problem-solving skills</li>
                    <li>Grow in an inclusive and supportive environment</li>
                  </ul>
                  <p className="pt-2 text-foreground font-medium">
                    We believe in learning by doing — where every member can explore, build, and thrive.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Vision */}
            <div className="vision-card space-y-6">
              <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">Our Vision</h2>
              <Card className="glass-card border-none h-full">
                <CardContent className="p-8 space-y-4 text-lg text-muted-foreground leading-relaxed font-light">
                  <p>
                    To constitute a global community of innovators where technology bridges the gap between imagination and reality, empowering every student to shape the future.
                  </p>
                  <p>
                    We envision a world where:
                  </p>
                  <ul className="space-y-3 list-disc list-inside text-foreground/80 pl-2">
                    <li>Every student has access to mentorship and resources</li>
                    <li>Innovation is driven by collaboration, not just competition</li>
                    <li>Technology is used to solve real-world community problems</li>
                    <li>Diverse perspectives fuel creative solutions</li>
                    <li>Lifelong learning becomes a core habit for success</li>
                  </ul>
                  <p className="pt-2 text-foreground font-medium">
                    Creating a legacy of leaders who drive technological advancement with purpose and empathy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Current Initiatives */}
        <section>
          <h2 className="text-3xl font-semibold text-center mb-8"> Current Initiatives</h2>
          <div className="initiatives-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <Card className="initiative-card glass-card border-none hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"> Weekly DSA Sessions</div>
                <p className="text-muted-foreground text-lg">
                  Structured problem-solving sessions to strengthen coding fundamentals.
                </p>
              </CardContent>
            </Card>
            <Card className="initiative-card glass-card border-none hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"> Monthly Hackathons</div>
                <p className="text-muted-foreground text-lg">
                  Quick, high-energy competitions to spark creativity and teamwork.
                </p>
              </CardContent>
            </Card>
            <Card className="initiative-card glass-card border-none hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"> Industry Mentorship</div>
                <p className="text-muted-foreground text-lg">
                  Guidance from industry professionals through sessions, reviews, and mentoring.
                </p>
              </CardContent>
            </Card>
            <Card className="initiative-card glass-card border-none hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"> Open Source</div>
                <p className="text-muted-foreground text-lg">
                  Encouraging students to contribute to real-world open-source projects.
                </p>
              </CardContent>
            </Card>
            <Card className="initiative-card glass-card border-none hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"> Tech Talks Series</div>
                <p className="text-muted-foreground text-lg">
                  Inviting experts to share knowledge about modern tools, frameworks, and technologies.
                </p>
              </CardContent>
            </Card>
            <Card className="initiative-card glass-card border-none hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"> Project Showcases</div>
                <p className="text-muted-foreground text-lg">
                  Providing members a stage to present their projects and gain feedback.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Grid */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Our Impact</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card border-none text-center hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 space-y-4">
                <Users className="h-16 w-16 mx-auto text-primary animate-pulse" />
                <div className="text-5xl font-bold tracking-tight stat-number" data-value="200">0+</div>
                <div className="text-muted-foreground text-lg uppercase tracking-wide">Active Members</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-none text-center hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 space-y-4">
                <Calendar className="h-16 w-16 mx-auto text-accent animate-pulse" />
                <div className="text-5xl font-bold tracking-tight stat-number" data-value="20">0+</div>
                <div className="text-muted-foreground text-lg uppercase tracking-wide">Events Organized</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-none text-center hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 space-y-4">
                <Target className="h-16 w-16 mx-auto text-primary animate-pulse" />
                <div className="text-5xl font-bold tracking-tight stat-number" data-value="10">0+</div>
                <div className="text-muted-foreground text-lg uppercase tracking-wide">Industry Partners</div>
              </CardContent>
            </Card>
            <Card className="glass-card border-none text-center hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 space-y-4">
                <Trophy className="h-16 w-16 mx-auto text-accent animate-pulse" />
                <div className="text-5xl font-bold tracking-tight stat-number" data-value="5">0+</div>
                <div className="text-muted-foreground text-lg uppercase tracking-wide">Awards Won</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Team */}
        <section>
          <h2 className="text-3xl font-semibold text-center mb-8">Meet Our Core Team</h2>
          <div className="core-team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {core.map((member) => (
              <div key={member.name} className="member-card-anim">
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto py-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Roadmap</span> 2025–26
          </h2>

          <div className="space-y-6">

            {/* JULY – AUGUST 2025 */}
            <Card className="roadmap-item glass-card border-none hover:shadow-lg transition-transform hover:-translate-y-1 duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 mt-1 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">
                      July – August 2025: Foundation & Onboarding
                    </h3>
                    <div className="font-semibold text-primary mb-3">
                      Building the Base
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Club orientation & member onboarding",
                        "Introduction to Web Development & Git/GitHub",
                        "Weekly DSA basics sessions",
                        "Community building & internal practice tasks",
                        "Planning for CREATE & semester activities"
                      ].map((item, i) => (
                        <li key={i} className="text-muted-foreground flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEPTEMBER 2025 */}
            <Card className="roadmap-item glass-card border-none hover:shadow-lg transition-transform hover:-translate-y-1 duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 mt-1 rounded-full bg-green-500" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">
                      September 2025: Learning & Exposure
                    </h3>
                    <div className="font-semibold text-primary mb-3">
                      Industry Awareness
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Expert Talk / Industry Interaction Session",
                        "Technical quiz & coding challenges",
                        "DSA Sprint — problem-solving competition",
                        "LinkedIn & career guidance session",
                        "Mini internal hackathon"
                      ].map((item, i) => (
                        <li key={i} className="text-muted-foreground flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* OCT – NOV 2025 */}
            <Card className="roadmap-item glass-card border-none hover:shadow-lg transition-transform hover:-translate-y-1 duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 mt-1 rounded-full bg-orange-500" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">
                      October – November 2025: Flagship Competition Phase
                    </h3>
                    <div className="font-semibold text-primary mb-3">
                      Build & Showcase
                    </div>
                    <ul className="space-y-2">
                      {[
                        "CREATE — Portfolio Quest (Web Development Competition)",
                        "Hands-on HTML, CSS & JavaScript workshops",
                        "Project submission & evaluation",
                        "Result announcement & winner showcase",
                        "Portfolio & resume guidance sessions"
                      ].map((item, i) => (
                        <li key={i} className="text-muted-foreground flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DECEMBER 2025 */}
            <Card className="roadmap-item glass-card border-none hover:shadow-lg transition-transform hover:-translate-y-1 duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 mt-1 rounded-full bg-red-500" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">
                      December 2025: Reflection & Skill Strengthening
                    </h3>
                    <div className="font-semibold text-primary mb-3">
                      Review & Improve
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Open-source & GitHub contribution drive",
                        "Advanced DSA & logic-building sessions",
                        "Member performance review",
                        "Planning for next semester activities"
                      ].map((item, i) => (
                        <li key={i} className="text-muted-foreground flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* JAN – FEB 2026 */}
            <Card className="roadmap-item hover:shadow-lg transition-shadow bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 mt-1 rounded-full bg-purple-500" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">
                      January – February 2026: Analysis & Documentation Phase
                    </h3>
                    <div className="font-semibold text-primary mb-3">
                      Think Like Industry
                    </div>
                    <ul className="space-y-2">
                      {[
                        "DEVSPRINT — PRD & Case Study Documentation Event",
                        "IEEE-style documentation workshops",
                        "IGNITION — Club Kickoff & Website Launch (Feb 10)",
                        "Industry speaker sessions & panel discussion",
                        "Prize distribution & recognition"
                      ].map((item, i) => (
                        <li key={i} className="text-muted-foreground flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MARCH – APRIL 2026 */}
            <Card className="roadmap-item glass-card border-none hover:shadow-lg transition-transform hover:-translate-y-1 duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 mt-1 rounded-full bg-slate-500" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">
                      March – April 2026: Innovation & Development
                    </h3>
                    <div className="font-semibold text-primary mb-3">
                      Apply & Build
                    </div>
                    <ul className="space-y-2">
                      {[
                        "REIMAGINE — Website Redesign & Innovation Challenge",
                        "Cloud, DevOps & modern tech sessions",
                        "Mini development sprints",
                        "Student Fest participation & collaboration"
                      ].map((item, i) => (
                        <li key={i} className="text-muted-foreground flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MAY – JUNE 2026 */}
            <Card className="roadmap-item glass-card border-none hover:shadow-lg transition-transform hover:-translate-y-1 duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 mt-1 rounded-full bg-gray-500" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">
                      May – June 2026: Wrap-Up & Handover
                    </h3>
                    <div className="font-semibold text-primary mb-3">
                      Reflect & Transition
                    </div>
                    <ul className="space-y-2">
                      {[
                        "Year-end community meetup",
                        "Member appreciation & certificates",
                        "Core team handover",
                        "Roadmap planning for Academic Year 2026–27"
                      ].map((item, i) => (
                        <li key={i} className="text-muted-foreground flex gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
