'use client';

import { useMemo } from 'react';
import { Check, X } from 'lucide-react';

interface PasswordRulesProps {
    password: string;
    show: boolean;
}

interface Rule {
    label: string;
    test: (password: string) => boolean;
}

const rules: Rule[] = [
    { label: 'At least 6 characters', test: (p) => p.length >= 6 },
    { label: 'Contains a number', test: (p) => /\d/.test(p) },
    { label: 'Contains a letter', test: (p) => /[a-zA-Z]/.test(p) },
];

export function PasswordRules({ password, show }: PasswordRulesProps) {
    const ruleResults = useMemo(
        () => rules.map((rule) => ({ ...rule, met: rule.test(password) })),
        [password]
    );

    if (!show || password.length === 0) return null;

    return (
        <div className="auth-password-rules" role="list" aria-label="Password requirements">
            {ruleResults.map((rule, index) => (
                <div
                    key={index}
                    className={`auth-password-rule ${rule.met ? 'auth-password-rule--met' : ''}`}
                    role="listitem"
                >
                    {rule.met ? (
                        <Check className="auth-password-rule-icon" size={14} />
                    ) : (
                        <X className="auth-password-rule-icon" size={14} />
                    )}
                    <span>{rule.label}</span>
                </div>
            ))}
        </div>
    );
}
