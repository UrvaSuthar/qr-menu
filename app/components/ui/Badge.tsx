'use client';

import { ReactNode } from 'react';
import '@/styles/app.css';

interface BadgeProps {
    variant?: 'success' | 'error' | 'muted';
    children: ReactNode;
    icon?: ReactNode;
}

export function Badge({ variant = 'muted', children, icon }: BadgeProps) {
    return (
        <span className={`app-badge app-badge--${variant}`}>
            {icon}
            {children}
        </span>
    );
}
