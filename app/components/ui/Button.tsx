'use client';

import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import '@/styles/app.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    children: ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    children,
    disabled,
    className = '',
    ...props
}: ButtonProps) {
    const classes = [
        'app-button',
        `app-button--${variant}`,
        size === 'sm' && 'app-button--sm',
        size === 'lg' && 'app-button--lg',
        fullWidth && 'app-button--full',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={classes} disabled={disabled || loading} {...props}>
            {loading ? (
                <>
                    <Loader2 size={18} className="animate-spin" />
                    Please wait...
                </>
            ) : (
                children
            )}
        </button>
    );
}
