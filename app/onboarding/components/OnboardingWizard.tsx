'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types';
import {
    RestaurantDetailsStep,
    MenuUploadStep,
    FoodCourtDetailsStep,
    FirstRestaurantStep,
    CompletionStep
} from './steps';
import { Steps } from '@/components/ui';

interface OnboardingWizardProps {
    role: UserRole;
}

export function OnboardingWizard({ role }: OnboardingWizardProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [restaurantId, setRestaurantId] = useState<string | null>(null);
    const [foodCourtId, setFoodCourtId] = useState<string | null>(null);
    const router = useRouter();

    const handleNext = () => {
        setCurrentStep(prev => prev + 1);
    };

    const handleComplete = () => {
        if (role === 'restaurant') {
            router.push('/restaurant');
        } else {
            router.push('/food-court');
        }
    };

    // Restaurant Onboarding Flow
    if (role === 'restaurant') {
        const steps = ['Restaurant Details', 'Menu Upload', 'Ready!'];

        return (
            <div className="space-y-8">
                <Steps items={steps} currentStep={currentStep} />

                <div className="mt-8">
                    {currentStep === 1 && (
                        <RestaurantDetailsStep
                            onComplete={(id: string) => {
                                setRestaurantId(id);
                                handleNext();
                            }}
                        />
                    )}

                    {currentStep === 2 && restaurantId && (
                        <MenuUploadStep
                            restaurantId={restaurantId}
                            onComplete={handleNext}
                            onSkip={handleNext}
                        />
                    )}

                    {currentStep === 3 && restaurantId && (
                        <CompletionStep
                            role="restaurant"
                            entityId={restaurantId}
                            onDashboard={handleComplete}
                        />
                    )}
                </div>
            </div>
        );
    }

    // Food Court Onboarding Flow
    if (role === 'food_court') {
        const steps = ['Food Court Details', 'First Restaurant', 'Ready!'];

        return (
            <div className="space-y-8">
                <Steps items={steps} currentStep={currentStep} />

                <div className="mt-8">
                    {currentStep === 1 && (
                        <FoodCourtDetailsStep
                            onComplete={(id: string) => {
                                setFoodCourtId(id);
                                handleNext();
                            }}
                        />
                    )}

                    {currentStep === 2 && foodCourtId && (
                        <FirstRestaurantStep
                            foodCourtId={foodCourtId}
                            onComplete={handleNext}
                        />
                    )}

                    {currentStep === 3 && foodCourtId && (
                        <CompletionStep
                            role="food_court"
                            entityId={foodCourtId}
                            onDashboard={handleComplete}
                        />
                    )}
                </div>
            </div>
        );
    }

    return null;
}
