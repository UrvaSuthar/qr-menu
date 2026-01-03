'use client';

import '@/styles/app.css';

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
