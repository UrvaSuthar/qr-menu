'use client';

import { ReactNode } from 'react';
import '@/styles/app.css';

interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="app-empty">
            <div className="app-empty__icon">{icon}</div>
            <h2 className="app-empty__title">{title}</h2>
            {description && <p className="app-empty__description">{description}</p>}
            {action}
        </div>
    );
}
