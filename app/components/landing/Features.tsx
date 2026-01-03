'use client';

import { motion } from 'framer-motion';
import { Smartphone, Zap, QrCode } from 'lucide-react';

export function Features() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 }
    };

    const features = [
        {
            title: "Works on Potato Phones",
            desc: "No app download required. If it has a camera, it works.",
            icon: Smartphone,
            large: true
        },
        {
            title: "Update in Seconds",
            desc: "Change the menu without re-printing QR codes.",
            icon: Zap,
            large: false
        },
        {
            title: "Food Court Ready",
            desc: "One QR, multiple restaurants. Perfect for chaos management.",
            icon: QrCode,
            large: false
        }
    ];

    return (
        <section style={{ padding: '8rem 1.5rem' }}>
            <div style={{ maxWidth: '70rem', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
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
                        Why ditch the paper?
                    </motion.h2>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}
                >
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            style={{
                                gridColumn: feature.large ? 'span 2' : 'span 1',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                borderRadius: '24px',
                                padding: '2.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                            // Reset grid column on mobile
                            className="md:col-span-1 lg:col-span-auto feature-card"
                        >
                            <feature.icon
                                size={40}
                                color="#FAFAFA"
                                strokeWidth={1.5}
                                style={{ marginBottom: '1.5rem' }}
                            />
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#FAFAFA', marginBottom: '0.75rem' }}>
                                {feature.title}
                            </h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '1.125rem', lineHeight: 1.6 }}>
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
