import { getRestaurantBySlug, logQRScan } from '@/lib/restaurants';
import { notFound } from 'next/navigation';

export default async function PublicMenuPage({
    params,
}: {
    params: { slug: string };
}) {
    // Fetch restaurant data
    const restaurant = await getRestaurantBySlug(params.slug);

    if (!restaurant) {
        notFound();
    }

    // Log the QR scan asynchronously
    logQRScan(restaurant.id).catch(console.error);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        {restaurant.logo_url && (
                            <img
                                src={restaurant.logo_url}
                                alt={restaurant.name}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {restaurant.name}
                            </h1>
                            {restaurant.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                    {restaurant.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Contact Info */}
                    {(restaurant.address || restaurant.phone) && (
                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                            {restaurant.address && (
                                <div className="flex items-start gap-2 text-sm text-gray-600">
                                    <span>📍</span>
                                    <span>{restaurant.address}</span>
                                </div>
                            )}
                            {restaurant.phone && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span>📞</span>
                                    <a href={`tel:${restaurant.phone}`} className="hover:text-indigo-600">
                                        {restaurant.phone}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* Menu Display */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                {restaurant.menu_pdf_url ? (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-4 bg-indigo-600 text-white font-semibold">
                            📄 Menu
                        </div>
                        <div className="w-full" style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}>
                            <iframe
                                src={restaurant.menu_pdf_url}
                                className="w-full h-full border-0"
                                title="Restaurant Menu"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                        <div className="text-6xl mb-4">📋</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Menu Coming Soon
                        </h2>
                        <p className="text-gray-600">
                            The restaurant is still setting up their menu. Please check back later!
                        </p>
                        {restaurant.phone && (
                            <div className="mt-6">
                                <a
                                    href={`tel:${restaurant.phone}`}
                                    className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                                >
                                    📞 Call to Order
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
                <p>Powered by QR Menu Platform</p>
            </footer>
        </div>
    );
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}) {
    const restaurant = await getRestaurantBySlug(params.slug);

    if (!restaurant) {
        return {
            title: 'Restaurant Not Found',
        };
    }

    return {
        title: `${restaurant.name} - Menu`,
        description: restaurant.description || `View the menu for ${restaurant.name}`,
    };
}
