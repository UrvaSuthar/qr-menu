'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import '@/styles/app.css';

interface PageHeaderProps {
    title: string;
    backHref?: string;
    backLabel?: string;
    onBack?: () => void;
}

export function PageHeader({ title, backHref, backLabel = 'Back', onBack }: PageHeaderProps) {
    const backButton = backHref ? (
        <Link href={backHref} className="app-back-button">
            <ArrowLeft size={20} />
            {backLabel}
        </Link>
    ) : onBack ? (
        <button onClick={onBack} className="app-back-button">
            <ArrowLeft size={20} />
            {backLabel}
        </button>
    ) : null;

    return (
        <div className="app-page-header">
            {backButton}
            <h1 className="app-page-title">{title}</h1>
        </div>
    );
}
