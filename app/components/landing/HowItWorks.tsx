'use client';

import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { UploadCloud, ArrowRight, Smartphone } from 'lucide-react';

export function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const steps = [
        {
            id: 1,
            title: "Upload that PDF",
            desc: "Drag and drop your menu. We verify it (so it doesn't look like specific garbage).",
            icon: UploadCloud
        },
        {
            id: 2,
            title: "Get your QR Code",
            desc: "We generate a unique code. Print it on tables, walls, or your forehead.",
            icon: ArrowRight
        },
        {
            id: 3,
            title: "Diners Scan & Eat",
            desc: "They scan. The menu loads instantly. They order. You profit. Simple.",
            icon: Smartphone
        }
    ];

    return (
        <section ref={containerRef} style={{ padding: '8rem 1.5rem', background: 'rgba(255, 255, 255, 0.02)' }}>
            <div style={{ maxWidth: '70rem', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 700,
                            color: '#FAFAFA',
                            marginBottom: '1rem',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Three steps. Zero headaches.
                    </motion.h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem',
                    position: 'relative'
                }}>
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                style={{
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '24px',
                                    padding: '3rem 2rem',
                                    textAlign: 'center',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 2rem',
                                    fontSize: '2rem',
                                    color: '#FAFAFA'
                                }}>
                                    <Icon size={32} strokeWidth={1.5} />
                                </div>

                                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FAFAFA', marginBottom: '1rem' }}>
                                    {step.title}
                                </h3>
                                <p style={{ color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.6, fontSize: '1.125rem' }}>
                                    {step.desc}
                                </p>

                                {/* Step Number Background */}
                                <span style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '2rem',
                                    fontSize: '8rem',
                                    fontWeight: 800,
                                    color: 'rgba(255, 255, 255, 0.02)',
                                    lineHeight: 1,
                                    fontFamily: 'var(--font-display)',
                                    pointerEvents: 'none'
                                }}>
                                    {step.id}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
