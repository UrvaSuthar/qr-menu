'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Zap, CreditCard, Smartphone } from 'lucide-react';

export function Trust() {
    const stats = [
        { label: "Free Plan", sub: "Forever", icon: CheckCircle },
        { label: "5 Min", sub: "Setup Time", icon: Zap },
        { label: "No CC", sub: "Required", icon: CreditCard },
        { label: "100%", sub: "Uptime", icon: Smartphone },
    ];

    return (
        <section style={{ padding: '6rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ maxWidth: '70rem', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '2rem'
                }} className="trust-grid">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{
                                margin: '0 auto 1rem',
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FAFAFA'
                            }}>
                                <stat.icon size={24} />
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FAFAFA' }}>{stat.label}</div>
                            <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>{stat.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
