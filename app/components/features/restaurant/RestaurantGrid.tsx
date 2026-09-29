import { UtensilsCrossed, FileText } from 'lucide-react';
import { Restaurant } from '@/types';
import { initials } from '@/lib/initials';

interface RestaurantGridProps {
    restaurants: Restaurant[];
}

/** Stall cards on a food court page; each opens that stall's menu. */
export function RestaurantGrid({ restaurants }: RestaurantGridProps) {
    if (restaurants.length === 0) {
        return (
            <div className="food-empty">
                <UtensilsCrossed size={56} className="food-empty__icon" strokeWidth={1} aria-hidden="true" />
                <h3 className="food-empty__title">No restaurants yet</h3>
                <p className="food-empty__description">Check back soon!</p>
            </div>
        );
    }

    return (
        <ul className="food-grid">
            {restaurants.map((restaurant) => (
                <li key={restaurant.id}>
                    <a href={`/menu/r/${restaurant.id}`} className="food-card">
                        <div className="food-card__image">
                            {restaurant.logo_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={restaurant.logo_url} alt="" />
                            ) : (
                                <span className="food-card__initials" aria-hidden="true">{initials(restaurant.name)}</span>
                            )}
                            {restaurant.menu_pdf_url && (
                                <span className="food-card__badge">
                                    <FileText size={12} aria-hidden="true" />
                                    Menu
                                </span>
                            )}
                        </div>
                        <div className="food-card__content">
                            <h3 className="food-card__title">{restaurant.name}</h3>
                            <span className="food-card__cta">View menu →</span>
                        </div>
                    </a>
                </li>
            ))}
        </ul>
    );
}
