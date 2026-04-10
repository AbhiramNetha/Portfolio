import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        id: 1,
        role: "AI Developer Intern",
        company: "VISWAM AI",
        period: "Jul 2025 – Sep 2025",
        location: "Hyderabad, India · In-person",
        description:
            "Developed and optimized machine learning models using TensorFlow and PyTorch on real-world datasets. Improved model performance through hyperparameter tuning, feature engineering, and data preprocessing. Gained hands-on experience with neural networks, backpropagation, batch normalization, and learning rate scheduling. Collaborated with cross-functional teams to enhance model training efficiency and deployment readiness.",
        tech: ["Python", "TensorFlow", "PyTorch", "NumPy", "Pandas"],
    },
];

export default function Experiences() {
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".exp-header",
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            if (listRef.current) {
                const items = listRef.current.children;
                gsap.fromTo(items,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: listRef.current,
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
            style={{
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                borderTop: '1px solid var(--border-color)',
            }}
        >
            <div className="flex flex-col lg:flex-row gap-16 md:gap-24">

                <div className="w-full lg:w-1/3 exp-header">
                    <p className="uppercase tracking-widest text-sm mb-4 font-semibold" style={{ color: 'var(--text-muted)' }}>
                        Career
                    </p>
                    <h2 className="text-5xl md:text-7xl font-bold font-serif italic mb-8">
                        Work<br />Experience
                    </h2>
                    <p className="leading-relaxed text-lg max-w-sm" style={{ color: 'var(--text-muted)' }}>
                        Hands-on experience building production ML models and working in cross-functional teams. Open to Software Development opportunities.
                    </p>
                </div>

                <div ref={listRef} className="w-full lg:w-2/3 flex flex-col pt-8">
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className="flex flex-col md:flex-row gap-4 md:gap-12 py-10 interactable group cursor-pointer"
                            style={{
                                borderBottom: index !== experiences.length - 1
                                    ? '1px solid var(--border-color)'
                                    : 'none'
                            }}
                        >
                            <div className="md:w-1/4 pt-1">
                                <span className="font-serif italic text-lg block mb-1" style={{ color: 'var(--text-faint)' }}>
                                    {exp.period}
                                </span>
                                <span className="text-xs" style={{ color: 'var(--text-faint)' }}>
                                    {exp.location}
                                </span>
                            </div>
                            <div className="md:w-3/4">
                                <h3 className="text-3xl font-bold mb-2 transition-colors group-hover:opacity-70">{exp.role}</h3>
                                <h4
                                    className="text-xl mb-6 transition-colors"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    {exp.company}
                                </h4>
                                <p className="leading-relaxed max-w-2xl mb-6 transition-colors" style={{ color: 'var(--text-faint)' }}>
                                    {exp.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.tech.map(t => (
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
                            </div>
                        </div>
                    ))}

                    {/* Achievements block */}
                    <div className="py-10">
                        <h4 className="text-xl font-bold mb-6" style={{ color: 'var(--text-muted)' }}>Highlights</h4>
                        <ul className="space-y-3">
                            {[
                                "CGPA 8.44 / 10 — top academic tier",
                                "2 live production projects deployed (FitFuel AI, Way2Fresher)",
                                "Active GitHub portfolio with 4 full-stack projects",
                                "Strong foundation in DSA, OOP, DBMS, OS, Computer Networks",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-faint)' }}>
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--text-faint)' }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
}
