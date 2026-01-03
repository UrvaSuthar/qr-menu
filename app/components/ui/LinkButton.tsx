'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import '@/styles/app.css';

interface LinkButtonProps {
    href: string;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md';
    className?: string;
    children: ReactNode;
}

export function LinkButton({ href, variant = 'primary', size = 'md', className = '', children }: LinkButtonProps) {
    const classes = [
        'app-button',
        `app-button--${variant}`,
        size === 'sm' && 'app-button--sm',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
}
