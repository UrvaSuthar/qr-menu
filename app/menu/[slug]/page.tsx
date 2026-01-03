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
        <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
            {/* Floating Logo */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 50, // Increased z-index
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                border: '2px solid rgba(255,255,255,0.8)',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {restaurant.logo_url ? (
                    <img
                        src={restaurant.logo_url}
                        alt={restaurant.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <UtensilsCrossed size={32} color="#ccc" />
                )}
            </div>

            {/* Content */}
            {restaurant.menu_pdf_url ? (
                <iframe
                    src={`${restaurant.menu_pdf_url}#view=FitH&pagemode=none&toolbar=0&navpanes=0`}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: '#fff' // Ensure white background for PDF placeholder
                    }}
                    title={`${restaurant.name} Menu`}
                />
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: '#fff',
                    gap: '1rem',
                    textAlign: 'center',
                    padding: '2rem'
                }}>
                    <ClipboardList size={64} style={{ opacity: 0.5 }} strokeWidth={1} />
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            Menu Coming Soon
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)' }}>
                            {restaurant.name} is uploading their menu.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
