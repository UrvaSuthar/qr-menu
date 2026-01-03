'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import '@/styles/app.css';

interface CardProps {
    children: ReactNode;
    className?: string;
    interactive?: boolean;
    as?: 'div' | 'a';
    href?: string;
}

export function Card({ children, className = '', interactive = false, as = 'div', href }: CardProps) {
    const cardClass = `app-card ${interactive ? 'app-card--interactive' : ''} ${className}`.trim();

    if (as === 'a' && href) {
        return (
            <Link href={href} className={cardClass}>
                {children}
            </Link>
        );
    }

    return <div className={cardClass}>{children}</div>;
}
