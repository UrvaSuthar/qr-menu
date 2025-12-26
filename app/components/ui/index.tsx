'use client';

import { ReactNode } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import '@/styles/app.css';

// ============================================
// LOADING SPINNER
// ============================================

interface LoadingSpinnerProps {
    size?: 'sm' | 'lg';
    text?: string;
    fullPage?: boolean;
}

export function LoadingSpinner({ size = 'lg', text = 'Loading...', fullPage = true }: LoadingSpinnerProps) {
    const content = (
        <>
            <div className={`app-spinner ${size === 'lg' ? 'app-spinner--lg' : ''}`} />
            {text && <p className="app-loading__text">{text}</p>}
        </>
    );

    if (fullPage) {
        return <div className="app-loading">{content}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
            {content}
        </div>
    );
}

// ============================================
// PAGE HEADER
// ============================================

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

// ============================================
// CARD
// ============================================

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

// ============================================
// BUTTON
// ============================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md';
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

// ============================================
// LINK BUTTON
// ============================================

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

// ============================================
// INPUT
// ============================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    error?: string;
}

export function Input({ label, hint, error, id, required, className = '', ...props }: InputProps) {
    const inputId = id || props.name;
    const inputClass = `app-input ${error ? 'app-input--error' : ''} ${className}`.trim();

    return (
        <div className="app-field">
            {label && (
                <label htmlFor={inputId} className={`app-label ${required ? 'app-label--required' : ''}`}>
                    {label}
                </label>
            )}
            <input id={inputId} className={inputClass} {...props} />
            {hint && !error && <p className="app-hint">{hint}</p>}
            {error && <p className="app-hint" style={{ color: 'var(--app-error)' }}>{error}</p>}
        </div>
    );
}

// ============================================
// TEXTAREA
// ============================================

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    hint?: string;
    error?: string;
}

export function Textarea({ label, hint, error, id, className = '', ...props }: TextareaProps) {
    const inputId = id || props.name;
    const inputClass = `app-input app-textarea ${error ? 'app-input--error' : ''} ${className}`.trim();

    return (
        <div className="app-field">
            {label && (
                <label htmlFor={inputId} className="app-label">
                    {label}
                </label>
            )}
            <textarea id={inputId} className={inputClass} {...props} />
            {hint && !error && <p className="app-hint">{hint}</p>}
            {error && <p className="app-hint" style={{ color: 'var(--app-error)' }}>{error}</p>}
        </div>
    );
}

// ============================================
// ALERT
// ============================================

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

// ============================================
// EMPTY STATE
// ============================================

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

// ============================================
// BADGE
// ============================================

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

// ============================================
// BANNER
// ============================================

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

// ============================================
// STEPS
// ============================================

interface StepsProps {
    items: string[];
}

export function Steps({ items }: StepsProps) {
    return (
        <ol className="app-steps">
            {items.map((item, index) => (
                <li key={index} className="app-step">
                    <span className="app-step__number">{index + 1}</span>
                    <span>{item}</span>
                </li>
            ))}
        </ol>
    );
}
