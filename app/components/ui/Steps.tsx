'use client';

import '@/styles/app.css';

interface StepsProps {
    items: string[];
    currentStep?: number;
    /** 'progress' renders a horizontal stepper for multi-step flows. */
    variant?: 'list' | 'progress';
}

export function Steps({ items, currentStep = 1, variant = 'list' }: StepsProps) {
    return (
        <ol className={`app-steps${variant === 'progress' ? ' app-steps--progress' : ''}`} aria-label={variant === 'progress' ? `Step ${currentStep} of ${items.length}` : undefined}>
            {items.map((item, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === currentStep;
                const isCompleted = stepNum < currentStep;

                let className = 'app-step';
                if (isActive) className += ' app-step--active';
                if (isCompleted) className += ' app-step--completed';

                return (
                    <li key={index} className={className} aria-current={isActive ? 'step' : undefined}>
                        <span className="app-step__number">{stepNum}</span>
                        <span>{item}</span>
                    </li>
                );
            })}
        </ol>
    );
}
