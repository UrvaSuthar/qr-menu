'use client';

import '@/styles/app.css';
import { useId } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    hint?: string;
    error?: string;
}

export function Textarea({ label, hint, error, id, className = '', ...props }: TextareaProps) {
    const autoId = useId();
    const inputId = id || props.name || autoId;
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
            {error && <p className="app-hint app-hint--error" role="alert">{error}</p>}
        </div>
    );
}
