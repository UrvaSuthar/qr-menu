import { getRestaurantBySlug, logQRScan } from '@/lib/restaurants';
import { notFound } from 'next/navigation';
import { MapPin, Phone, FileText, ClipboardList, UtensilsCrossed } from 'lucide-react';
import '@/styles/app.css';

export default async function PublicMenuPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const restaurant = await getRestaurantBySlug(slug);

    if (!restaurant) {
        notFound();
    }

    logQRScan(restaurant.id).catch(console.error);

    return (
        <div className="food-page">
            {/* Header */}
            <header className="food-header">
                <div className="food-header__inner">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        {/* Logo or placeholder */}
                        {restaurant.logo_url ? (
                            <img
                                src={restaurant.logo_url}
                                alt={restaurant.name}
                                className="food-header__logo"
                            />
                        ) : (
                            <div className="food-header__logo-placeholder">
                                <UtensilsCrossed size={28} strokeWidth={1.5} />
                            </div>
                        )}
                        <div>
                            <h1 className="food-header__title">
                                {restaurant.name}
                            </h1>
                            {restaurant.description && (
                                <p className="food-header__description">
                                    {restaurant.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Contact Info */}
                    {(restaurant.address || restaurant.phone) && (
                        <div className="food-header__meta">
                            {restaurant.address && (
                                <div className="food-header__meta-item">
                                    <MapPin size={16} style={{ color: 'var(--app-text-disabled)' }} />
                                    <span>{restaurant.address}</span>
                                </div>
                            )}
                            {restaurant.phone && (
                                <div className="food-header__meta-item">
                                    <Phone size={16} style={{ color: 'var(--app-text-disabled)' }} />
                                    <a href={`tel:${restaurant.phone}`} className="food-header__meta-link">
                                        {restaurant.phone}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* Menu Display */}
            <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
                {restaurant.menu_pdf_url ? (
                    <div className="food-menu-card">
                        <div className="food-menu-header">
                            <FileText size={18} />
                            <span>Menu</span>
                        </div>
                        <div style={{ width: '100%', height: 'calc(100vh - 300px)', minHeight: '600px' }}>
                            <iframe
                                src={`${restaurant.menu_pdf_url}#view=FitH&pagemode=none&toolbar=0&navpanes=0`}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                title="Restaurant Menu"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="food-menu-card food-empty">
                        <ClipboardList size={64} className="food-empty__icon" strokeWidth={1} />
                        <h2 className="food-empty__title">
                            Menu Coming Soon
                        </h2>
                        <p className="food-empty__description">
                            The restaurant is working on uploading their menu.
                        </p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="food-footer">
                Powered by QR Menu
            </footer>
        </div>
    );
}
