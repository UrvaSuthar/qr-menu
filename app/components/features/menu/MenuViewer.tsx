import Link from 'next/link';
import { ArrowLeft, ClipboardList, Phone } from 'lucide-react';
import { Restaurant } from '@/types';
import { initials } from '@/lib/initials';

interface MenuViewerProps {
    restaurant: Restaurant;
    /** Where the back arrow goes (a stall opened from its food court grid). */
    backHref?: string;
}

/** What a diner sees after scanning: the menu PDF full-screen under a small name pill. */
export function MenuViewer({ restaurant, backHref }: MenuViewerProps) {
    const pill = (
        <div className="menu-pill">
            {backHref && (
                <Link href={backHref} className="menu-pill__back" aria-label="Back to all restaurants">
                    <ArrowLeft size={18} />
                </Link>
            )}
            {restaurant.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={restaurant.logo_url} alt="" className="menu-pill__logo" />
            ) : (
                <span className="menu-pill__logo menu-pill__logo--initials" aria-hidden="true">{initials(restaurant.name)}</span>
            )}
            <h1 className="menu-pill__name">{restaurant.name}</h1>
            {restaurant.phone && (
                <a href={`tel:${restaurant.phone}`} className="menu-pill__call" aria-label={`Call ${restaurant.name}`}>
                    <Phone size={16} />
                </a>
            )}
        </div>
    );

    if (!restaurant.menu_pdf_url) {
        return (
            <div className="menu-view menu-view--empty">
                {pill}
                <div className="menu-empty">
                    <ClipboardList size={56} strokeWidth={1} className="menu-empty__icon" aria-hidden="true" />
                    <h2 className="menu-empty__title">Menu coming soon</h2>
                    <p className="menu-empty__text">{restaurant.name} hasn&apos;t put its menu online yet. Please ask the staff.</p>
                    {restaurant.phone && (
                        <a href={`tel:${restaurant.phone}`} className="app-button app-button--primary">
                            <Phone size={18} /> Call {restaurant.phone}
                        </a>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="menu-view">
            {pill}
            <iframe
                src={`${restaurant.menu_pdf_url}#view=FitH&pagemode=none&toolbar=0&navpanes=0`}
                className="menu-view__pdf"
                title={`${restaurant.name} menu`}
            />
        </div>
    );
}
