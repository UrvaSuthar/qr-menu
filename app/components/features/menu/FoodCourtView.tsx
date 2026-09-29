import { MapPin, Phone, QrCode } from 'lucide-react';
import { FoodCourtWithSubs } from '@/types';
import { RestaurantGrid } from '@/components/features/restaurant';

/** Public food court page: name, contact, and the grid of stalls diners pick from. */
export function FoodCourtView({ foodCourt }: { foodCourt: FoodCourtWithSubs }) {
    return (
        <div className="food-page">
            <header className="food-hero">
                <p className="app-eyebrow">Food court</p>
                <h1 className="food-hero__title">{foodCourt.name}</h1>
                {foodCourt.description && <p className="food-hero__description">{foodCourt.description}</p>}
                {(foodCourt.address || foodCourt.phone) && (
                    <div className="food-hero__meta">
                        {foodCourt.address && (
                            <span className="food-hero__meta-item">
                                <MapPin size={14} aria-hidden="true" />
                                {foodCourt.address}
                            </span>
                        )}
                        {foodCourt.phone && (
                            <a href={`tel:${foodCourt.phone}`} className="food-hero__meta-item food-header__meta-link">
                                <Phone size={14} aria-hidden="true" />
                                {foodCourt.phone}
                            </a>
                        )}
                    </div>
                )}
            </header>

            <main className="food-main">
                <h2 className="food-main__title">Choose a restaurant</h2>
                <RestaurantGrid restaurants={foodCourt.sub_restaurants} />
            </main>

            <footer className="food-footer">
                <QrCode size={14} aria-hidden="true" /> Powered by QR Menu
            </footer>
        </div>
    );
}
