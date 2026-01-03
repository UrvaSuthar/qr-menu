'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, QrCode } from 'lucide-react';

export function Hero() {
    return (
        <section style={{ padding: '8rem 1.5rem 8rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ maxWidth: '60rem', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>

                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '80px',
                        marginBottom: '2rem',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <QrCode size={40} color="#FAFAFA" strokeWidth={1.5} />
                </motion.div>

                {/* Staggered Text Reveal */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 4.5rem)',
                        fontWeight: 700,
                        color: '#FAFAFA',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1,
                        letterSpacing: '-0.03em'
                    }}
                >
                    Your menu is stuck in the past.
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block' }}>Let's fix that.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        fontSize: '1.25rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginBottom: '2.5rem',
                        maxWidth: '38rem',
                        margin: '0 auto 2.5rem',
                        lineHeight: 1.6
                    }}
                >
                    Upload your PDF (yes, even the one with the coffee stain).<br />
                    We'll turn it into a QR code that your customers actually enjoy scanning.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link
                        href="/signup"
                        className="group"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '1.125rem 2.5rem',
                            background: '#FAFAFA',
                            color: '#0A0A0A',
                            borderRadius: '100px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            fontSize: '1.125rem',
                            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Create Your QR Menu
                        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                        Free forever · No credit card · 5 min setup
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
