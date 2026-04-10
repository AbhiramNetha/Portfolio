import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BookOpen, Code2, Database, Wrench, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
    {
        id: 1,
        title: "B.Tech — Computer Science & Engineering",
        institution: "ACE Engineering College, Hyderabad",
        year: "2022 – 2026",
        description: "Final year student. CGPA: 8.44 / 10 — consistently above the 8.3 academic tier. Specializing in full-stack development, DSA, and system design.",
        icon: <BookOpen className="w-6 h-6" />,
    },
];

const skillGroups = [
    {
        id: 2,
        title: "Languages",
        institution: "Core Programming",
        year: "Advanced",
        description: "Java · JavaScript · TypeScript · Python · C++ · C · SQL",
        icon: <Code2 className="w-6 h-6" />,
    },
    {
        id: 3,
        title: "Frontend",
        institution: "UI Development",
        year: "Advanced",
        description: "React.js · Next.js 14 · Tailwind CSS · HTML5/CSS3 · Framer Motion · Recharts",
        icon: <Layers className="w-6 h-6" />,
    },
    {
        id: 4,
        title: "Backend & APIs",
        institution: "Server-side",
        year: "Advanced",
        description: "Node.js · Express.js · Spring Boot · REST APIs · JWT Auth · Microservices",
        icon: <Code2 className="w-6 h-6" />,
    },
    {
        id: 5,
        title: "Databases",
        institution: "Data Management",
        year: "Intermediate",
        description: "PostgreSQL · MySQL · MongoDB · Firebase",
        icon: <Database className="w-6 h-6" />,
    },
    {
        id: 6,
        title: "Tools & DevOps",
        institution: "Infrastructure",
        year: "Intermediate",
        description: "Git · GitHub · Docker · Linux · Vercel · VS Code",
        icon: <Wrench className="w-6 h-6" />,
    },
];

const allCards = [...education, ...skillGroups];

export default function Qualifications() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".qual-header",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            if (cardsRef.current) {
                gsap.fromTo(
                    cardsRef.current.children,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 75%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 px-6 md:px-12 lg:px-24 w-full relative z-30"
            style={{ backgroundColor: 'transparent', color: 'var(--text-primary)' }}
        >
            <div className="text-center mb-16 md:mb-24 qual-header">
                <p className="uppercase tracking-widest text-sm mb-4 font-semibold" style={{ color: 'var(--text-muted)' }}>
                    Education &amp; Skills
                </p>
                <h2 className="text-5xl md:text-6xl font-bold font-serif italic">Qualifications</h2>
                <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'var(--text-faint)' }}>
                    Currently learning: Spring Boot Microservices · System Design · DSA on LeetCode · AWS basics
                </p>
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allCards.map((item) => (
                    <div
                        key={item.id}
                        className="interactable p-8 rounded-2xl transition-colors duration-500 group relative overflow-hidden"
                        style={{
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--text-faint)')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div
                            className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors duration-300"
                            style={{ backgroundColor: 'var(--border-faint)', color: 'var(--text-muted)' }}
                        >
                            {item.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <div className="flex justify-between items-center mb-4 text-sm font-serif italic">
                            <span style={{ color: 'var(--text-muted)' }}>{item.institution}</span>
                            <span style={{ color: 'var(--text-faint)' }}>{item.year}</span>
                        </div>
                        <p className="leading-relaxed text-sm" style={{ color: 'var(--text-muted)' }}>
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Core CS Concepts */}
            <div className="mt-16 p-8 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <p className="uppercase tracking-widest text-xs font-semibold mb-4" style={{ color: 'var(--text-muted)' }}>
                    Core CS Concepts
                </p>
                <div className="flex flex-wrap gap-3">
                    {[
                        "Data Structures & Algorithms",
                        "Object-Oriented Programming",
                        "Database Management Systems",
                        "Operating Systems",
                        "Computer Networks",
                        "System Design",
                        "Microservices Architecture",
                    ].map(concept => (
                        <span
                            key={concept}
                            className="text-sm font-medium px-4 py-2 rounded-full"
                            style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                        >
                            {concept}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
