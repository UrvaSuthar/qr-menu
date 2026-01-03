'use client';

import '@/styles/app.css';
import React, { forwardRef } from 'react';
import { Label } from './Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, hint, error, id, required, className = '', ...props }, ref) => {
        const inputId = id || props.name;
        const inputClass = `app-input ${error ? 'app-input--error' : ''} ${className}`.trim();

        return (
            <div className="app-field">
                {label && (
                    <Label htmlFor={inputId} required={required}>
                        {label}
                    </Label>
                )}
                <input ref={ref} id={inputId} className={inputClass} {...props} />
                {hint && !error && <p className="app-hint">{hint}</p>}
                {error && <p className="app-hint" style={{ color: 'var(--app-error)' }}>{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

