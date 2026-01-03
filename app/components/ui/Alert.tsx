'use client';

import { ReactNode } from 'react';
import '@/styles/app.css';

interface AlertProps {
    type: 'error' | 'success' | 'info' | 'warning';
    children: ReactNode;
    icon?: ReactNode;
}

export function Alert({ type, children, icon }: AlertProps) {
    return (
        <div className={`app-alert app-alert--${type}`}>
            {icon && <span className="app-alert__icon">{icon}</span>}
            <span>{children}</span>
        </div>
    );
}
