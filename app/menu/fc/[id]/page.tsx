import { getFoodCourtById } from '@/lib/foodCourts';
import { RestaurantGrid } from '@/components/RestaurantGrid';
import { notFound } from 'next/navigation';
import { MapPin, Phone, ChevronDown } from 'lucide-react';
import '@/styles/app.css';

export default async function FoodCourtGridByIdPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const foodCourt = await getFoodCourtById(id);

    if (!foodCourt) {
        notFound();
    }

    return (
        <div className="food-page--alt">
            {/* Hero Section */}
            <header className="food-hero">
                <h1 className="food-hero__title">
                    {foodCourt.name}
                </h1>
                {foodCourt.description && (
                    <p className="food-hero__description">
                        {foodCourt.description}
                    </p>
                )}

                {/* Contact Info */}
                {(foodCourt.address || foodCourt.phone) && (
                    <div style={{
                        marginTop: 'var(--space-4)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 'var(--space-4)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--app-text-muted)'
                    }}>
                        {foodCourt.address && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                <MapPin size={14} style={{ color: 'var(--app-text-disabled)' }} />
                                <span>{foodCourt.address}</span>
                            </div>
                        )}
                        {foodCourt.phone && (
                            <a
                                href={`tel:${foodCourt.phone}`}
                                className="food-header__meta-link"
                                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 500 }}
                            >
                                <Phone size={14} style={{ color: 'var(--app-text-disabled)' }} />
                                <span>{foodCourt.phone}</span>
                            </a>
                        )}
                    </div>
                )}
            </header>

            {/* Restaurant Grid */}
            <main style={{ maxWidth: '80rem', margin: '0 auto', padding: 'var(--space-8) var(--space-4) var(--space-12)' }}>
                {/* Instruction */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
                    <p className="food-hero__instruction">
                        <ChevronDown size={24} style={{ color: 'var(--app-food-accent)' }} />
                        Tap any restaurant to see their menu
                    </p>
                </div>

                <RestaurantGrid restaurants={foodCourt.sub_restaurants} />
            </main>

            {/* Footer */}
            <footer className="food-footer">
                Powered by QR Menu
            </footer>
        </div>
    );
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const foodCourt = await getFoodCourtById(id);

    if (!foodCourt) {
        return {
            title: 'Food Court Not Found',
        };
    }

    return {
        title: `${foodCourt.name} - Restaurants`,
        description: foodCourt.description || `Browse restaurants at ${foodCourt.name}`,
    };
}
