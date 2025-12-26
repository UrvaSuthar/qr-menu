'use client';

import { Restaurant } from '@/types';
import { UtensilsCrossed, FileText } from 'lucide-react';
import '@/styles/app.css';

interface RestaurantGridProps {
    restaurants: Restaurant[];
}

export function RestaurantGrid({ restaurants }: RestaurantGridProps) {
    if (restaurants.length === 0) {
        return (
            <div className="food-empty">
                <UtensilsCrossed size={64} className="food-empty__icon" strokeWidth={1} />
                <h3 className="food-empty__title">
                    No Restaurants Yet
                </h3>
                <p className="food-empty__description">
                    Check back soon!
                </p>
            </div>
        );
    }

    return (
        <div className="food-grid">
            {restaurants.map((restaurant) => (
                <a
                    key={restaurant.id}
                    href={`/menu/r/${restaurant.id}`}
                    className="food-card"
                >
                    {/* Logo Section */}
                    <div className="food-card__image">
                        {restaurant.logo_url ? (
                            <img
                                src={restaurant.logo_url}
                                alt={restaurant.name}
                            />
                        ) : (
                            <UtensilsCrossed size={64} style={{ color: 'var(--app-text-disabled)' }} strokeWidth={1} />
                        )}

                        {/* Menu Available Indicator */}
                        {restaurant.menu_pdf_url && (
                            <div className="food-card__badge">
                                <FileText size={12} />
                                <span>Menu</span>
                            </div>
                        )}
                    </div>

                    {/* Name Section */}
                    <div className="food-card__content">
                        <h3 className="food-card__title">
                            {restaurant.name}
                        </h3>
                    </div>

                    {/* CTA */}
                    <div className="food-card__cta">
                        View Menu →
                    </div>
                </a>
            ))}
        </div>
    );
}
