'use client';

import '@/styles/app.css';

interface StepsProps {
    items: string[];
    currentStep?: number;
}

export function Steps({ items, currentStep = 1 }: StepsProps) {
    return (
        <ol className="app-steps">
            {items.map((item, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === currentStep;
                const isCompleted = stepNum < currentStep;

                let className = 'app-step';
                if (isActive) className += ' app-step--active';
                if (isCompleted) className += ' app-step--completed';

                return (
                    <li key={index} className={className}>
                        <span className="app-step__number">{stepNum}</span>
                        <span>{item}</span>
                    </li>
                );
            })}
        </ol>
    );
}
