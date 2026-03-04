import { useEffect, useRef, useState, useCallback } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import "../styles/student-fest.css";

/* ───────────────── Animated Counter Hook ───────────────── */
function useAnimatedCounter(target: number, duration = 2000) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const animated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animated.current) {
                    animated.current = true;
                    const start = performance.now();
                    const step = (now: number) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [target, duration]);

    return { count, ref };
}

/* ───────────────── Reveal on Scroll Hook ───────────────── */
function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("sf-revealed");
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
}

/* ───────────────── Navbar ───────────────── */
function SFNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = useCallback((id: string) => {
        setMobileOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <nav className={`sf-navbar ${scrolled ? "sf-navbar--scrolled" : ""}`}>
            <div className="sf-navbar__inner">
                <a href="#sf-hero" className="sf-navbar__logo" onClick={(e) => { e.preventDefault(); scrollTo("sf-hero"); }}>
                    {/* <img src="/favicon_2.png" alt="CW" className="sf-navbar__logo-icon" /> */}
                    <span className="sf-navbar__logo-text">STUDENT FEST</span>
                    <span className="sf-navbar__logo-year">2026</span>
                </a>

                <div className={`sf-navbar__links ${mobileOpen ? "sf-navbar__links--open" : ""}`}>
                    {[
                        ["ABOUT", "sf-about"],
                        ["AGENDA", "sf-schedule"],
                        ["SPEAKERS", "sf-speakers"],
                        // ["REGISTER", "sf-register"],
                    ].map(([label, id]) => (
                        <button key={id} className="sf-navbar__link" onClick={() => scrollTo(id)}>
                            {label}
                        </button>
                    ))}
                    <button className="sf-hero__bar-cta sf-navbar__cta" onClick={() => scrollTo("sf-register")}>
                        COMING SOON
                    </button>
                </div>

                <button
                    className="sf-navbar__hamburger"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`sf-hamburger-line ${mobileOpen ? "sf-hamburger-line--open" : ""}`} />
                    <span className={`sf-hamburger-line ${mobileOpen ? "sf-hamburger-line--open" : ""}`} />
                    <span className={`sf-hamburger-line ${mobileOpen ? "sf-hamburger-line--open" : ""}`} />
                </button>
            </div>
        </nav>
    );
}

/* ═══════════════════════════════════════════════════════════
   HERO SECTION — FTX26 Style
   Giant title bottom-left, venue info right, white banner bar below
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
    return (
        <section id="sf-hero" className="sf-hero">
            {/* Aurora Background behind the hero content */}
            <AuroraBackground className="sf-hero__aurora dark">
                {/* Grid overlay */}
                <div className="sf-hero__grid" />

                {/* Main hero area */}
                <div className="sf-hero__main">
                    <div className="sf-hero__main-inner">
                        <h1 className="sf-hero__giant-title sf-animate-up" style={{ animationDelay: "0.15s" }}>
                            <span className="sf-hero__giant-line">STUDENT</span>
                            <span className="sf-hero__giant-line">FEST <span className="sf-hero__giant-accent">2026</span></span>
                        </h1>
                        <div className="sf-hero__venue-block sf-animate-up" style={{ animationDelay: "0.35s" }}>
                            <p className="sf-hero__venue-name">DYP-ATU, TALSANDE, KOLHAPUR</p>
                            <p className="sf-hero__venue-date">MARCH 7, 2026</p>
                        </div>
                    </div>
                </div>
            </AuroraBackground>

            {/* Dark announcement bar */}
            <div className="sf-hero__bar sf-hero__bar--dark sf-animate-up" style={{ animationDelay: "0.55s" }}>
                <div className="sf-hero__bar-inner">
                    <div className="sf-hero__bar-content">
                        <h2 className="sf-hero__bar-title">A TECHNICAL SESSION & NETWORKING EVENT</h2>
                        <button
                            className="sf-hero__bar-cta"
                            onClick={() => document.getElementById("sf-register")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            COMING SOON
                        </button>
                    </div>
                    <p className="sf-hero__bar-desc">
                        A CURATED GATHERING OF STUDENTS, FACULTY, AND INDUSTRY EXPERTS FOR A DAY OF LEARNING, CAREER GUIDANCE, AND NETWORKING.
                    </p>
                </div>
            </div>
        </section>
    );
}

/* ───────────────── Stats Section ───────────────── */
function StatsSection() {
    const revealRef = useReveal();
    const stats = [
        { value: 120, suffix: "+", label: "Students" },
        { value: 10, suffix: "+", label: "Faculties" },
        { value: 4, suffix: "+", label: "Technical Sessions" },
        { value: 1, suffix: "", label: "Panel Discussion" },
    ];

    return (
        <section className="sf-stats" ref={revealRef}>
            <div className="sf-container sf-reveal-item">
                <div className="sf-stats__grid">
                    {stats.map((stat, i) => {
                        const { count, ref } = useAnimatedCounter(stat.value);
                        return (
                            <div key={i} className="sf-stats__card" ref={ref}>
                                <span className="sf-stats__number">
                                    {count}
                                    <span className="sf-stats__suffix">{stat.suffix}</span>
                                </span>
                                <span className="sf-stats__label">{stat.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ───────────────── About Section ───────────────── */
function AboutSection() {
    const revealRef = useReveal();
    return (
        <section id="sf-about" className="sf-about" ref={revealRef}>
            <div className="sf-container">
                <div className="sf-about__grid sf-reveal-item">
                    <div className="sf-about__text">
                        <span className="sf-section-tag">About the Event</span>
                        <h2 className="sf-section-title">
                            Reimagining Student Careers in the Age of Technology
                        </h2>
                        <p className="sf-about__desc">
                            Student Fest 2026 brings together students, faculty, and industry-oriented speakers for a day of technical learning, career guidance, and meaningful networking. Curated by Code Wizards, the event focuses on real-world tech exposure and student growth.
                        </p>
                        <div className="sf-about__highlights">
                            <div className="sf-about__highlight-item">
                                <div className="sf-about__highlight-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                </div>
                                <span>Industry-Oriented Sessions</span>
                            </div>
                            <div className="sf-about__highlight-item">
                                <div className="sf-about__highlight-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                </div>
                                <span>Live Panel Discussion</span>
                            </div>
                            <div className="sf-about__highlight-item">
                                <div className="sf-about__highlight-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                </div>
                                <span>Career & Skill Guidance</span>
                            </div>
                        </div>
                    </div>
                    <div className="sf-about__visual">
                        <div className="sf-about__3d-scene">
                            {/* 3D Rotating Cube */}
                            <div className="sf-about__cube">
                                <div className="sf-about__cube-face sf-about__cube-face--front">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                                </div>
                                <div className="sf-about__cube-face sf-about__cube-face--back">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(6,214,160,0.6)" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                </div>
                                <div className="sf-about__cube-face sf-about__cube-face--right">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                </div>
                                <div className="sf-about__cube-face sf-about__cube-face--left">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                                </div>
                                <div className="sf-about__cube-face sf-about__cube-face--top">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(236,72,153,0.6)" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                </div>
                                <div className="sf-about__cube-face sf-about__cube-face--bottom">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </div>
                            </div>
                            {/* Glow ring */}
                            <div className="sf-about__3d-ring" />
                            <div className="sf-about__3d-ring sf-about__3d-ring--2" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ───────────────── Why Attend Section ───────────────── */
function WhyAttendSection() {
    const revealRef = useReveal();
    const items = [
        {
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--sf-accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" /></svg>,
            title: "Industry-Oriented Sessions",
            desc: "Technical sessions focused on real-world industry trends and technologies."
        },
        {
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--sf-accent-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
            title: "Career & Skill Guidance",
            desc: "Insights from experts to help you navigate your career path in tech."
        },
        {
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--sf-accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
            title: "Networking Opportunities",
            desc: "Connect with peers, mentors, and industry professionals."
        },
        {
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--sf-accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
            title: "Panel Discussion & Q&A",
            desc: "Engage directly with panelists in a live discussion and Q&A session."
        },
        {
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>,
            title: "Prize Distribution",
            desc: "Recognition and prizes for outstanding participants and contributors."
        },
        {
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>,
            title: "Tea, Coffee & Refreshment",
            desc: "Complimentary refreshments provided throughout the event."
        },
    ];

    return (
        <section className="sf-why" ref={revealRef}>
            <div className="sf-container">
                <div className="sf-reveal-item">
                    <span className="sf-section-tag sf-section-tag--center">Why Attend?</span>
                    <h2 className="sf-section-title sf-section-title--center">
                        Everything You Need for a Day of Growth
                    </h2>
                </div>
                <div className="sf-why__grid sf-reveal-item" style={{ animationDelay: "0.2s" }}>
                    {items.map((item, i) => (
                        <div key={i} className="sf-why__card">
                            <div className="sf-why__card-icon">{item.icon}</div>
                            <h3 className="sf-why__card-title">{item.title}</h3>
                            <p className="sf-why__card-desc">{item.desc}</p>
                            <div className="sf-why__card-glow" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ───────────────── Schedule Section ───────────────── */
function ScheduleSection() {
    const revealRef = useReveal();
    const schedule = [
        { time: "09:00 – 09:20", title: "Registration & Arrival", desc: "Registration & Arrival of Students and Guests", tag: "arrival" },
        { time: "09:20 – 09:50", title: "Inauguration & Welcome Address", desc: "University Authorities & Organizing Team", tag: "ceremony" },
        { time: "09:50 – 10:30", title: "Session 1 – Industry Expectations from Developers in the AI Era", tag: "session" },
        { time: "10:30 – 10:40", title: "Tea Break", tag: "break" },
        { time: "10:45 – 11:25", title: "Session 2 – Cyber Security Foundation", tag: "session" },
        { time: "11:30 – 11:35", title: "Transition Break", tag: "break" },
        { time: "11:40 – 12:20", title: "Session 3 – Cloud Computing", tag: "session" },
        { time: "12:20 – 12:50", title: "Refreshment Break", tag: "break" },
        { time: "01:00 – 01:40", title: "Session 4 – Generative AI", tag: "session" },
        { time: "01:40 – 01:45", title: "Transition Break", tag: "break" },
        { time: "01:45 – 03:30", title: "Panel Discussion & Student Q&A", tag: "panel" },
        { time: "03:30 – 03:45", title: "Vote of Thanks & Closing Remarks", tag: "ceremony" },
    ];

    const tagColors: Record<string, string> = {
        arrival: "#3b82f6",
        ceremony: "#8b5cf6",
        session: "#06d6a0",
        break: "#f59e0b",
        panel: "#ec4899",
        networking: "#14b8a6",
    };

    return (
        <section id="sf-schedule" className="sf-schedule" ref={revealRef}>
            <div className="sf-container">
                <div className="sf-reveal-item">
                    <span className="sf-section-tag sf-section-tag--center">Event Agenda</span>
                    <h2 className="sf-section-title sf-section-title--center">
                        Student Fest 2026 – Event Schedule
                    </h2>
                </div>
                <div className="sf-schedule__timeline sf-reveal-item" style={{ animationDelay: "0.2s" }}>
                    {schedule.map((item, i) => (
                        <div key={i} className="sf-schedule__item" style={{ animationDelay: `${0.05 * i}s` }}>
                            <div className="sf-schedule__time-col">
                                <span className="sf-schedule__time">{item.time}</span>
                            </div>
                            <div className="sf-schedule__dot-col">
                                <div className="sf-schedule__dot" style={{ background: tagColors[item.tag] }} />
                                {i < schedule.length - 1 && <div className="sf-schedule__line" />}
                            </div>
                            <div className="sf-schedule__content-col">
                                <div className="sf-schedule__card">
                                    <div className="sf-schedule__card-header">
                                        <h3 className="sf-schedule__card-title">{item.title}</h3>
                                        <span className="sf-schedule__tag" style={{ background: `${tagColors[item.tag]}18`, color: tagColors[item.tag], borderColor: `${tagColors[item.tag]}40` }}>
                                            {item.tag}
                                        </span>
                                    </div>
                                    {item.desc && <p className="sf-schedule__card-desc">{item.desc}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ───────────────── Speakers Section ───────────────── */
function SpeakersSection() {
    const revealRef = useReveal();
    const speakers = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        name: "To be announced",
        role: i % 2 === 0 ? "Industry Expert" : "Academic Expert",
    }));

    return (
        <section id="sf-speakers" className="sf-speakers" ref={revealRef}>
            <div className="sf-container">
                <div className="sf-reveal-item">
                    <span className="sf-section-tag sf-section-tag--center">Our Voices</span>
                    <h2 className="sf-section-title sf-section-title--center">
                        Speakers &amp; Panelists
                    </h2>
                </div>
                <div className="sf-speakers__grid sf-reveal-item" style={{ animationDelay: "0.2s" }}>
                    {speakers.map((speaker) => (
                        <div key={speaker.id} className="sf-speakers__card">
                            <div className="sf-speakers__avatar">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <h3 className="sf-speakers__name">{speaker.name}</h3>
                            <p className="sf-speakers__role">{speaker.role}</p>
                        </div>
                    ))}
                </div>
                <p className="sf-speakers__note sf-reveal-item" style={{ animationDelay: "0.4s" }}>
                    🎤 Speaker details will be announced soon. Stay tuned!
                </p>
            </div>
        </section>
    );
}

/* ───────────────── Registration Section ───────────────── */
function RegistrationSection() {
    const revealRef = useReveal();
    return (
        <section id="sf-register" className="sf-register" ref={revealRef}>
            <div className="sf-container">
                <div className="sf-register__wrapper sf-reveal-item">
                    <div className="sf-register__info">
                        <span className="sf-section-tag">Get Your Spot</span>
                        <h2 className="sf-section-title">
                            Register for Student Fest 2026
                        </h2>
                        <p className="sf-register__desc">
                            Registration is currently closed. Stay tuned — it will reopen soon! Open to all university students. Limited seats available.
                        </p>
                        <ul className="sf-register__features">
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06d6a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                Technical sessions by industry experts
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06d6a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                Panel discussion &amp; live Q&amp;A
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06d6a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                Networking with peers &amp; mentors
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06d6a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                Prize distribution &amp; recognition
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06d6a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                Tea, coffee &amp; refreshment included
                            </li>
                        </ul>
                    </div>
                    <div className="sf-register__card-wrapper">
                        <div className="sf-register__card">
                            <div className="sf-register__card-badge">FREE EVENT</div>
                            <h3 className="sf-register__card-title">Student Pass</h3>
                            <div className="sf-register__card-price">
                                <span className="sf-register__card-currency">₹</span>
                                <span className="sf-register__card-amount">0</span>
                            </div>
                            <p className="sf-register__card-subtitle">No cost. Just bring your curiosity.</p>
                            <button className="sf-btn sf-btn--primary sf-btn--lg sf-btn--full" disabled style={{ cursor: "not-allowed", opacity: 0.7 }}>
                                Coming Soon
                            </button>
                            <p className="sf-register__card-org">
                                Organized by <strong>Code Wizards Coding Club</strong>
                            </p>
                            <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Contact</p>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
                                    <span>📞 Omkar (Lead) – <a href="tel:8767404875" style={{ color: "rgba(255,255,255,0.8)" }}>8767404875</a></span>
                                    <span>📞 Shivam (Algozenith Lead) – <a href="tel:9334733191" style={{ color: "rgba(255,255,255,0.8)" }}>9334733191</a></span>
                                    <span>📞 Anish (GSA) – <a href="tel:7397867560" style={{ color: "rgba(255,255,255,0.8)" }}>7397867560</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ───────────────── About CW Section (with CW Logo) ───────────────── */
function AboutCWSection() {
    const revealRef = useReveal();
    return (
        <section className="sf-cw" ref={revealRef}>
            <div className="sf-container">
                <div className="sf-cw__inner sf-reveal-item">
                    <div className="sf-cw__icon">
                        <img src="/favicon_2.png" alt="Code Wizards Logo" className="sf-cw__logo-img" />
                    </div>
                    <div className="sf-cw__content">
                        <span className="sf-section-tag">The Organizers</span>
                        <h2 className="sf-cw__title">About Code Wizards</h2>
                        <p className="sf-cw__desc">
                            Code Wizards is a student-driven coding club focused on technical excellence, innovation, and collaborative learning. We nurture talent, build communities, and empower students to create impactful solutions.
                        </p>
                        <a
                            href="https://codewizardsnew.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sf-btn sf-btn--outline sf-btn--md"
                        >
                            Visit Code Wizards Website
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER — Dark mode matching main website
   ═══════════════════════════════════════════════════════════ */
function SFFooter() {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="sf-footer">
            <div className="sf-footer__main">
                <div className="sf-container">
                    <div className="sf-footer__grid">

                        {/* Logo + Info Column */}
                        <div className="sf-footer__col sf-footer__col--brand">
                            <div className="sf-footer__brand">
                                <img src="/favicon_2.png" alt="" className="sf-footer__brand-logo" />
                                <span className="sf-footer__brand-name">Student Fest 2026</span>
                            </div>
                            <p className="sf-footer__copyright">
                                © Copyright Code Wizards {new Date().getFullYear()}. All rights reserved.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="sf-footer__col">
                            <h4 className="sf-footer__col-title">QUICK LINKS</h4>
                            <nav className="sf-footer__nav">
                                <button onClick={() => scrollTo("sf-about")} className="sf-footer__nav-link">About</button>
                                <button onClick={() => scrollTo("sf-schedule")} className="sf-footer__nav-link">Schedule</button>
                                <button onClick={() => scrollTo("sf-speakers")} className="sf-footer__nav-link">Speakers</button>
                                <button onClick={() => scrollTo("sf-register")} className="sf-footer__nav-link">Register</button>
                            </nav>
                        </div>

                        {/* Event Details */}
                        <div className="sf-footer__col">
                            <h4 className="sf-footer__col-title">EVENT DETAILS</h4>
                            <nav className="sf-footer__nav">
                                <span className="sf-footer__info-item">📅 7th March 2026</span>
                                <span className="sf-footer__info-item">🕘 9:00 AM – 3:45 PM</span>
                                <span className="sf-footer__info-item">📍 DYP-ATU, Talsande</span>
                                <span className="sf-footer__info-item">🎓 120+ Students</span>
                            </nav>
                        </div>

                        {/* Social Links */}
                        <div className="sf-footer__col">
                            <h4 className="sf-footer__col-title">CODE WIZARDS</h4>
                            <nav className="sf-footer__nav">
                                <a href="https://www.instagram.com/codewizards.atu/" target="_blank" rel="noopener noreferrer" className="sf-footer__social-link">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                                    Instagram
                                </a>
                                <a href="https://www.linkedin.com/in/code-wizards-596a59397/" target="_blank" rel="noopener noreferrer" className="sf-footer__social-link">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                                    LinkedIn
                                </a>
                                <a href="mailto:codewizards.atu@gmail.com" className="sf-footer__social-link">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--sf-accent-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                    Email
                                </a>
                            </nav>
                        </div>

                    </div>
                </div>
            </div>

            {/* Giant background text — like main website's "Code Wizards" */}
            <div className="sf-footer__giant">
                <div className="sf-footer__giant-text sf-footer__giant-text--oneline" aria-hidden="true">
                    <span>STUDENT FEST 2026</span>
                </div>
            </div>
        </footer>
    );
}


/* ───────────────── Main Page Component ───────────────── */
export default function StudentFest() {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.style.scrollBehavior = "smooth";
        return () => {
            document.documentElement.style.scrollBehavior = "";
        };
    }, []);

    return (
        <div className="sf-page">
            <SFNavbar />
            <HeroSection />
            <StatsSection />
            <AboutSection />
            <WhyAttendSection />
            <ScheduleSection />
            <SpeakersSection />
            <RegistrationSection />
            <AboutCWSection />
            <SFFooter />
        </div>
    );
}
