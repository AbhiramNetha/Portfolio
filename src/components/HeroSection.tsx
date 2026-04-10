import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./HeroSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 1. Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            syncTouch: true,
        });

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0, 0);

        // 2. Setup Canvas
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";
            context.resetTransform();
            context.scale(dpr, dpr);
            render();
        };

        function drawImageProp(ctx: CanvasRenderingContext2D, img: HTMLImageElement, offsetX = 0.5, offsetY = 0.5) {
            const w = window.innerWidth;
            const h = window.innerHeight;
            let iw = img.width,
                ih = img.height,
                r = Math.min(w / iw, h / ih),
                nw = iw * r,
                nh = ih * r,
                cx, cy, cw, ch, ar = 1;

            if (nw < w) ar = w / nw;
            if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
            nw *= ar;
            nh *= ar;

            cw = iw / (nw / w);
            ch = ih / (nh / h);
            cx = (iw - cw) * offsetX;
            cy = (ih - ch) * offsetY;

            if (cx < 0) cx = 0;
            if (cy < 0) cy = 0;
            if (cw > iw) cw = iw;
            if (ch > ih) ch = ih;

            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h);
        }

        // 3. Define Sequences
        const sequences = [
            { folder: "s1", frameCount: 240, sectionId: "#section-1" },
            { folder: "s2", frameCount: 240, sectionId: "#section-2" },
            { folder: "s3", frameCount: 240, sectionId: "#section-3" },
        ];

        const allImages: HTMLImageElement[][] = [];
        let currentSeqIndex = 0;
        let currentFrameIndex = 0;

        const pad = (number: number, length: number) => {
            let str = "" + number;
            while (str.length < length) str = "0" + str;
            return str;
        };

        sequences.forEach((seq) => {
            const images: HTMLImageElement[] = [];
            for (let i = 1; i <= seq.frameCount; i++) {
                const img = new Image();
                img.src = `/sequence/${seq.folder}/ezgif-frame-${pad(i, 3)}.jpg`;
                images.push(img);
            }
            allImages.push(images);
        });

        const render = () => {
            if (!allImages[currentSeqIndex]) return;
            const img = allImages[currentSeqIndex][currentFrameIndex];
            if (img && img.complete) {
                drawImageProp(context, img);
            } else if (img) {
                img.onload = render;
            }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        if (allImages[0][0].complete) {
            render();
        } else {
            allImages[0][0].onload = render;
        }

        // 4. GSAP Frame Triggers
        const triggers: ScrollTrigger[] = [];

        sequences.forEach((seq, index) => {
            const obj = { frame: 0 };
            const trigger = gsap.to(obj, {
                frame: seq.frameCount - 1,
                snap: "frame",
                ease: "none",
                scrollTrigger: {
                    trigger: seq.sectionId,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                    onUpdate: () => {
                        currentSeqIndex = index;
                        currentFrameIndex = Math.round(obj.frame);
                        render();
                    },
                },
            });
            if (trigger.scrollTrigger) triggers.push(trigger.scrollTrigger);
        });

        // 5. GSAP Text Fades
        gsap.set("#text-1", { opacity: 1 });

        sequences.forEach((seq, index) => {
            const trigger = ScrollTrigger.create({
                trigger: seq.sectionId,
                start: "top 60%",
                end: "bottom 60%",
                onEnter: () => gsap.to(`#text-${index + 1}`, { opacity: 1, duration: 1, ease: "power2.out" }),
                onLeave: () => gsap.to(`#text-${index + 1}`, { opacity: 0, duration: 1, ease: "power2.out" }),
                onEnterBack: () => gsap.to(`#text-${index + 1}`, { opacity: 1, duration: 1, ease: "power2.out" }),
                onLeaveBack: () => {
                    if (index !== 0) gsap.to(`#text-${index + 1}`, { opacity: 0, duration: 1, ease: "power2.out" });
                },
            });
            triggers.push(trigger);
        });

        // 6. Hide CTA buttons once hero animation ends, show again on scroll back
        const ctaEl = ctaRef.current;
        const ctaTrigger = ScrollTrigger.create({
            trigger: "#section-3",
            start: "bottom bottom",
            onEnter: () => {
                if (ctaEl) {
                    gsap.to(ctaEl, { opacity: 0, duration: 0.4, ease: "power2.in", onComplete: () => { ctaEl.style.pointerEvents = 'none'; } });
                }
            },
            onLeaveBack: () => {
                if (ctaEl) {
                    ctaEl.style.pointerEvents = 'auto';
                    gsap.to(ctaEl, { opacity: 1, duration: 0.4, ease: "power2.out" });
                }
            },
        });
        triggers.push(ctaTrigger);

        // Cleanup
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            lenis.destroy();
            triggers.forEach(t => t.kill());
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="hero-container">
            <div className="canvas-container relative h-[auto]">
                <canvas ref={canvasRef} id="hero-canvas"></canvas>
            </div>

            {/* Animated text slides */}
            <div className="fixed-text-container">
                {/* Slide 1 — Intro */}
                <div className="text-container fixed-text" id="text-1">
                    <h2>Hi, I'm Pamu Abhiram 👋</h2>
                    <p>Full-Stack Developer · Java · Spring Boot · React · Node.js</p>
                </div>

                {/* Slide 2 — Summary */}
                <div className="text-container fixed-text" id="text-2">
                    <h2>Building Scalable Systems</h2>
                    <p>
                        Final-year CSE undergrad at ACE Engineering College, Hyderabad.
                        Passionate about backend systems, microservices, and real-world full-stack apps.
                    </p>
                </div>

                {/* Slide 3 — Opportunities */}
                <div className="text-container fixed-text" id="text-3">
                    <h2>Open to Opportunities</h2>
                    <p>
                        Actively seeking Software Development roles. Let's build something impactful together.
                    </p>
                </div>
            </div>

            {/* ── CTA Buttons ── completely outside the animation system ── */}
            <div ref={ctaRef} className="hero-cta-fixed">
                <a
                    href="https://github.com/AbhiramNetha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-btn hero-btn-primary"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/pamu-abhiram-1108a0256"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-btn hero-btn-outline"
                >
                    LinkedIn
                </a>
                <a
                    href="mailto:abhiramnetha17@gmail.com"
                    className="hero-btn hero-btn-outline"
                >
                    Email
                </a>
            </div>

            <main className="scroll-content">
                <section className="sequence-section" id="section-1"></section>
                <section className="sequence-section" id="section-2"></section>
                <section className="sequence-section" id="section-3"></section>
            </main>
        </div>
    );
}
