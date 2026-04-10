import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/AbhiramNetha' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/pamuabhiram' },
    { label: 'Gmail', href: 'mailto:abhiramnetha17@gmail.com' },
];

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 80%",
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            ref={footerRef}
            className="py-24 px-6 md:px-12 lg:px-24 w-full relative z-30 overflow-hidden rounded-t-[3rem]"
            style={{
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                borderTop: '1px solid var(--border-color)',
            }}
        >
            <div className="flex flex-col items-center justify-center text-center mb-20 md:mb-32">
                <p className="tracking-widest uppercase text-sm font-semibold mb-6" style={{ color: 'var(--text-muted)' }}>
                    Open to Software Development roles
                </p>
                <h2
                    ref={textRef}
                    className="text-6xl md:text-[10rem] font-bold tracking-tighter leading-none interactable transition-colors cursor-pointer hover:opacity-70"
                >
                    Let&apos;s Talk
                </h2>
                <a
                    href="mailto:abhiramnetha17@gmail.com"
                    className="mt-12 text-2xl md:text-4xl font-serif italic pb-2 transition-colors interactable"
                    style={{
                        borderBottom: '1px solid var(--text-faint)',
                        color: 'inherit'
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--text-primary)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--text-faint)')}
                >
                    abhiramnetha17@gmail.com
                </a>
                <p className="mt-4 text-sm" style={{ color: 'var(--text-faint)' }}>
                    📍 Hyderabad, India &nbsp;·&nbsp; +91 7207031293
                </p>
            </div>

            <div
                className="flex flex-col md:flex-row justify-between items-center pt-8"
                style={{ borderTop: '1px solid var(--border-faint)' }}
            >
                <div className="flex gap-8 mb-6 md:mb-0">
                    {socialLinks.map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith('mailto') ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            className="interactable text-sm font-semibold uppercase tracking-wider transition-colors"
                            style={{ color: 'var(--text-muted)' }}
                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-8">
                    <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
                        © {new Date().getFullYear()} Pamu Abhiram. All rights reserved.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="interactable text-sm font-semibold uppercase tracking-wider hidden md:block transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
                    >
                        Back to Top ↑
                    </button>
                </div>
            </div>
        </footer>
    );
}
