'use client';

import { UtensilsCrossed, Building2 } from 'lucide-react';
import { UserRole } from '@/types';

interface RoleSelectorProps {
    value: UserRole;
    onChange: (role: UserRole) => void;
}

const roles: {
    value: UserRole;
    label: string;
    description: string;
    icon: typeof UtensilsCrossed;
}[] = [
        {
            value: 'restaurant',
            label: 'Restaurant',
            description: 'Single venue',
            icon: UtensilsCrossed,
        },
        {
            value: 'food_court',
            label: 'Food Court',
            description: 'Multiple vendors',
            icon: Building2,
        },
    ];

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
    return (
        <div className="auth-input-group">
            <span className="auth-label">I am a...</span>
            <div className="auth-role-selector" role="radiogroup" aria-label="Select your role">
                {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = value === role.value;

                    return (
                        <button
                            key={role.value}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            className={`auth-role-option ${isSelected ? 'auth-role-option--selected' : ''}`}
                            onClick={() => onChange(role.value)}
                        >
                            <Icon className="auth-role-icon" strokeWidth={1.5} />
                            <span className="auth-role-label">{role.label}</span>
                            <span className="auth-role-description">{role.description}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
