import { getRestaurantById } from '@/lib/restaurants';
import { notFound } from 'next/navigation';

export default async function RestaurantMenuByIdPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Await params (Next.js 16 requirement)
    const { id } = await params;

    const restaurant = await getRestaurantById(id);

    if (!restaurant) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sticky Header - Always Visible */}
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* Logo + Name */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            {restaurant.logo_url && (
                                <img
                                    src={restaurant.logo_url}
                                    alt={restaurant.name}
                                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                                />
                            )}
                            <div className="min-w-0">
                                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                                    {restaurant.name}
                                </h1>
                                {restaurant.address && (
                                    <p className="text-xs text-gray-500 truncate hidden sm:block">
                                        📍 {restaurant.address}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Call CTA - Prominent */}
                        {restaurant.phone && (
                            <a
                                href={`tel:${restaurant.phone}`}
                                className="flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-sm sm:text-base"
                            >
                                <span className="hidden sm:inline">📞 Call</span>
                                <span className="sm:hidden">📞</span>
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {/* Menu Display - Full Focus */}
            <main className="max-w-4xl mx-auto px-0 sm:px-4 pb-6 sm:pb-8">
                {restaurant.menu_pdf_url ? (
                    <div className="bg-white sm:rounded-xl sm:shadow-xl overflow-hidden sm:mt-4">
                        <div className="w-full" style={{ height: 'calc(100vh - 100px)', minHeight: '500px' }}>
                            <iframe
                                src={restaurant.menu_pdf_url}
                                className="w-full h-full border-0"
                                title="Restaurant Menu"
                            />
                        </div>
                    </div>
                ) : (
                    /* Empty State - Clear CTA */
                    <div className="bg-white sm:rounded-xl sm:shadow-xl p-8 sm:p-16 text-center sm:mt-4 mx-4 sm:mx-0">
                        <div className="text-7xl sm:text-8xl mb-6">📋</div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                            Menu Coming Soon
                        </h2>
                        {restaurant.phone ? (
                            <a
                                href={`tel:${restaurant.phone}`}
                                className="inline-block px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
                            >
                                📞 Call to Order Now
                            </a>
                        ) : (
                            <p className="text-gray-600 text-lg">
                                Please check back later
                            </p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Await params (Next.js 16 requirement)
    const { id } = await params;

    const restaurant = await getRestaurantById(id);

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
