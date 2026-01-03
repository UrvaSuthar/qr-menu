'use client';

import '@/styles/app.css';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}

export function Label({ children, className = '', required, ...props }: LabelProps) {
    return (
        <label
            className={`app-label ${required ? 'app-label--required' : ''} ${className}`.trim()}
            {...props}
        >
            {children}
        </label>
    );
}
