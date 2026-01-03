'use client';

import '@/styles/app.css';

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
