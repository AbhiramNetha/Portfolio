import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
    {
        id: 1,
        stat: "8.44",
        unit: "/ 10 CGPA",
        label: "Academic Excellence",
        detail: "Consistently top-tier academic performance at ACE Engineering College, Hyderabad — final year B.Tech CSE.",
    },
    {
        id: 2,
        stat: "4",
        unit: "Projects",
        label: "Full-Stack Applications",
        detail: "Built and shipped 4 real-world full-stack projects across React, Next.js, Spring Boot, Node.js, and PostgreSQL.",
    },
    {
        id: 3,
        stat: "2",
        unit: "Live",
        label: "Production Deployments",
        detail: "FitFuel AI and Way2Fresher are live in production on Vercel with real users. Docker-containerized and CI/CD ready.",
    },
    {
        id: 4,
        stat: "1",
        unit: "Internship",
        label: "AI Developer @ VISWAM AI",
        detail: "Worked on real-world ML models with TensorFlow & PyTorch. Hands-on with backpropagation, batch norm, and hyperparameter tuning.",
    },
    {
        id: 5,
        stat: "10+",
        unit: "Technologies",
        label: "Tech Stack Breadth",
        detail: "Java, Spring Boot, React, Next.js, Node.js, PostgreSQL, MongoDB, Docker, TypeScript, Tailwind CSS.",
    },
    {
        id: 6,
        stat: "Open",
        unit: "to Hire",
        label: "Software Development Roles",
        detail: "Actively seeking Software Development opportunities. Strong in Spring Boot, REST APIs, OOP, and DSA.",
    },
];

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".test-header",
                { opacity: 0, y: 30 },
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

            if (containerRef.current) {
                gsap.fromTo(
                    containerRef.current.children,
                    { opacity: 0, scale: 0.9 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
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
            <div className="flex flex-col items-center text-center mb-16 md:mb-24 test-header">
                <p className="uppercase tracking-widest text-sm mb-4 font-semibold" style={{ color: 'var(--text-muted)' }}>
                    By The Numbers
                </p>
                <h2 className="text-5xl md:text-7xl font-bold font-serif italic max-w-3xl">At a Glance</h2>
            </div>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {highlights.map((h) => (
                    <div
                        key={h.id}
                        className="interactable p-10 rounded-[2rem] transition-colors duration-500"
                        style={{
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--bg-card)')}
                    >
                        <div className="mb-4">
                            <span className="text-5xl font-bold font-serif">{h.stat}</span>
                            <span className="text-lg ml-2 font-serif italic" style={{ color: 'var(--text-muted)' }}>{h.unit}</span>
                        </div>
                        <h4 className="text-lg font-bold mb-3" style={{ color: 'var(--text-secondary)' }}>{h.label}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-faint)' }}>{h.detail}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
