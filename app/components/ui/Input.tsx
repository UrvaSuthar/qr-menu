'use client';

import '@/styles/app.css';

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
