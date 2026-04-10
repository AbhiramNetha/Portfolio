import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SnowfallProps {
    startTrigger?: string;
}

export default function Snowfall({ startTrigger }: SnowfallProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number, y: number, r: number, d: number }[] = [];
        const maxParticles = 150;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        for (let i = 0; i < maxParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 3 + 1,
                d: Math.random() * maxParticles
            });
        }

        let angle = 0;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath();
            for (let i = 0; i < maxParticles; i++) {
                const p = particles[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            }
            ctx.fill();
            update();
        };

        const update = () => {
            angle += 0.01;
            for (let i = 0; i < maxParticles; i++) {
                const p = particles[i];
                p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
                p.x += Math.sin(angle) * 2;

                if (p.x > canvas.width + 5 || p.x < -5 || p.y > canvas.height) {
                    if (i % 3 > 0) {
                        particles[i] = { x: Math.random() * canvas.width, y: -10, r: p.r, d: p.d };
                    } else {
                        if (Math.sin(angle) > 0) {
                            particles[i] = { x: -5, y: Math.random() * canvas.height, r: p.r, d: p.d };
                        } else {
                            particles[i] = { x: canvas.width + 5, y: Math.random() * canvas.height, r: p.r, d: p.d };
                        }
                    }
                }
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        // Setup scroll trigger for opacity
        if (startTrigger) {
            gsap.to(canvas, {
                scrollTrigger: {
                    trigger: startTrigger,
                    start: "top 60%", // When the top of the trigger hits 60% of the viewport
                    end: "top 40%", 
                    scrub: true,
                },
                opacity: 1,
                ease: "none",
            });
        } else {
            canvas.style.opacity = "1";
        }

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
            ScrollTrigger.getAll().forEach(t => {
                if (t.vars.trigger === startTrigger) {
                    t.kill();
                }
            });
        };
    }, [startTrigger]);

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed inset-0 pointer-events-none z-0" 
            style={{ opacity: startTrigger ? 0 : 1 }}
        />
    );
}
