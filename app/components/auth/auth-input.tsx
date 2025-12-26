'use client';

import { forwardRef, useState, InputHTMLAttributes, ReactNode } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
    label: string;
    icon?: ReactNode;
    error?: string;
    success?: string;
    showPasswordToggle?: boolean;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, icon, error, success, showPasswordToggle, type = 'text', ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const [isFocused, setIsFocused] = useState(false);

        const inputType = showPasswordToggle
            ? (showPassword ? 'text' : 'password')
            : type;

        const inputClassName = [
            'auth-input',
            showPasswordToggle && 'auth-input--with-action',
            error && 'auth-input--error',
            success && 'auth-input--success',
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <div className="auth-input-group">
                <label className="auth-label" htmlFor={props.id}>
                    {label}
                </label>
                <div className="auth-input-wrapper">
                    {icon && (
                        <span className="auth-input-icon" aria-hidden="true">
                            {icon}
                        </span>
                    )}
                    <input
                        ref={ref}
                        type={inputType}
                        className={inputClassName}
                        onFocus={(e) => {
                            setIsFocused(true);
                            props.onFocus?.(e);
                        }}
                        onBlur={(e) => {
                            setIsFocused(false);
                            props.onBlur?.(e);
                        }}
                        aria-invalid={!!error}
                        aria-describedby={
                            error ? `${props.id}-error` : success ? `${props.id}-success` : undefined
                        }
                        {...props}
                    />
                    {showPasswordToggle && (
                        <button
                            type="button"
                            className="auth-input-action"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div>
                {error && (
                    <div
                        className="auth-input-message auth-input-message--error"
                        id={`${props.id}-error`}
                        role="alert"
                    >
                        <AlertCircle size={14} />
                        {error}
                    </div>
                )}
                {success && !error && (
                    <div
                        className="auth-input-message auth-input-message--success"
                        id={`${props.id}-success`}
                    >
                        <CheckCircle2 size={14} />
                        {success}
                    </div>
                )}
            </div>
        );
    }
);

AuthInput.displayName = 'AuthInput';
