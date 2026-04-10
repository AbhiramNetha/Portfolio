import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "FitFuel AI",
        tagline: "Smart Nutrition & Fitness Tracker",
        category: "Full-Stack Web App · Next.js · TypeScript",
        year: "2025",
        status: "live",
        description:
            "Full-stack fitness & nutrition platform with goal-based calorie calculation (Bulk / Cut / Maintain), BMR & TDEE algorithms, 40+ food database, 90-day analytics, and interactive data visualizations.",
        tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Recharts", "Framer Motion", "Docker", "Vercel"],
        liveUrl: "https://abhiramnethafitfuelai.vercel.app/",
        githubUrl: "https://github.com/AbhiramNetha",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2653&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Way2Fresher",
        tagline: "Learn. Prepare. Succeed.",
        category: "Full-Stack Web App · React · Node.js · PostgreSQL",
        year: "2025",
        status: "live",
        description:
            "All-in-one placement prep platform featuring curated DSA sheets, 4-month aptitude roadmap, core subject resources (OS, CN, DBMS, CA), progress tracking, and role-based access control.",
        tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS", "Vercel"],
        liveUrl: "https://careermap-xptu.vercel.app/",
        githubUrl: "https://github.com/AbhiramNetha",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2673&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Skillence – JobQuest",
        tagline: "Diagnostic-Based Interview Preparation",
        category: "Full-Stack Web App · Spring Boot · Java · React",
        year: "2025",
        status: "dev",
        description:
            "Diagnostic interview prep system with aptitude, reasoning, verbal, and coding assessments. Features personalized weakness analysis, adaptive recommendations, JWT auth, and role-based dashboards.",
        tech: ["React.js", "Spring Boot", "Java", "Node.js", "PostgreSQL", "JWT", "REST APIs"],
        liveUrl: "",
        githubUrl: "https://github.com/AbhiramNetha",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Techi-E-Repair",
        tagline: "Appliance Service & Repair Platform",
        category: "Full-Stack Web App · React · Node.js · MongoDB",
        year: "2024",
        status: "done",
        description:
            "Service marketplace connecting customers, technicians, and sellers for appliance repair. Features real-time service request handling, role-based dashboards, and streamlined communication workflows.",
        tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
        liveUrl: "",
        githubUrl: "https://github.com/AbhiramNetha",
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2670&auto=format&fit=crop",
    },
];

const statusLabel: Record<string, string> = {
    live: "🟢 Live",
    dev: "🔧 In Development",
    done: "✅ Completed",
};

export default function FeaturedProjects() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 50 },
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

            if (projectsRef.current) {
                const cards = projectsRef.current.children;
                gsap.fromTo(cards,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: projectsRef.current,
                            start: "top 85%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="featured-projects"
            ref={sectionRef}
            className="py-24 px-6 md:px-12 lg:px-24 bg-transparent w-full relative z-30"
            style={{ color: 'var(--text-primary)' }}
        >
            <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
                <div>
                    <p className="uppercase tracking-widest text-sm mb-4 font-semibold" style={{ color: 'var(--text-muted)' }}>
                        Selected Work
                    </p>
                    <h2 className="text-5xl md:text-7xl font-bold italic font-serif tracking-tight">
                        Featured<br />Projects
                    </h2>
                </div>
                <a
                    href="https://github.com/AbhiramNetha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactable mt-8 md:mt-0 group flex items-center gap-3 text-lg pb-1 hover:opacity-70 transition-opacity"
                    style={{ borderBottom: '1px solid var(--text-primary)' }}
                >
                    View All on GitHub
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
            </div>

            <div ref={projectsRef} className="flex flex-col gap-16 md:gap-32">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-col-reverse lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center group interactable cursor-pointer`}
                    >
                        <div className="w-full lg:w-3/5 overflow-hidden rounded-xl relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                            />
                            {/* Status badge */}
                            <span
                                className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                                style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                            >
                                {statusLabel[project.status]}
                            </span>
                        </div>
                        <div className="w-full lg:w-2/5 flex flex-col justify-center">
                            <div className="flex justify-between items-center mb-3">
                                <span style={{ color: 'var(--text-muted)' }} className="tracking-wider text-xs uppercase font-semibold">
                                    {project.category}
                                </span>
                                <span style={{ color: 'var(--text-faint)' }} className="font-serif italic text-sm">
                                    {project.year}
                                </span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold mb-2 transition-colors group-hover:opacity-70">
                                {project.title}
                            </h3>
                            <p className="text-base mb-4 font-serif italic" style={{ color: 'var(--text-muted)' }}>
                                {project.tagline}
                            </p>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-faint)' }}>
                                {project.description}
                            </p>
                            {/* Tech tags */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map(t => (
                                    <span
                                        key={t}
                                        className="text-xs font-semibold px-3 py-1 rounded-full"
                                        style={{
                                            backgroundColor: 'var(--bg-card)',
                                            border: '1px solid var(--border-color)',
                                            color: 'var(--text-muted)'
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                            {/* Action buttons */}
                            <div className="flex items-center gap-4">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full transition-all hover:opacity-80"
                                        style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                                    >
                                        <ExternalLink className="w-4 h-4" /> Live Demo
                                    </a>
                                )}
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full transition-all hover:opacity-80"
                                    style={{ border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
                                >
                                    <Github className="w-4 h-4" /> GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
