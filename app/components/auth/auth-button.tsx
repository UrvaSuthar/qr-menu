'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    loading?: boolean;
    success?: boolean;
    children: ReactNode;
}

export function AuthButton({
    variant = 'primary',
    loading = false,
    success = false,
    children,
    disabled,
    className,
    ...props
}: AuthButtonProps) {
    const buttonClassName = [
        'auth-button',
        `auth-button--${variant}`,
        success && 'auth-button--success',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            className={buttonClassName}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <span className="auth-button-spinner" aria-hidden="true" />
                    <span>Please wait...</span>
                </>
            ) : success ? (
                <>
                    <CheckCircle2 size={18} />
                    <span>Success!</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}
