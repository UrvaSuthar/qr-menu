'use client';

import { ReactNode } from 'react';
import '@/styles/app.css';

interface BannerProps {
    title: string;
    children: ReactNode;
}

export function Banner({ title, children }: BannerProps) {
    return (
        <div className="app-banner">
            <h2 className="app-banner__title">{title}</h2>
            {children}
        </div>
    );
}
