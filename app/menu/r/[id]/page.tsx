import { getRestaurantById } from '@/lib/restaurants';
import { notFound } from 'next/navigation';
import { MapPin, Phone, ClipboardList } from 'lucide-react';

export default async function RestaurantMenuByIdPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const restaurant = await getRestaurantById(id);

    if (!restaurant) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* Logo + Name */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            {restaurant.logo_url && (
                                <img
                                    src={restaurant.logo_url}
                                    alt={restaurant.name}
                                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                                />
                            )}
                            <div className="min-w-0">
                                <h1 className="text-lg sm:text-xl font-semibold text-black truncate">
                                    {restaurant.name}
                                </h1>
                                {restaurant.address && (
                                    <p className="text-xs text-gray-500 truncate hidden sm:flex items-center gap-1">
                                        <MapPin size={12} />
                                        {restaurant.address}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Call CTA */}
                        {restaurant.phone && (
                            <a
                                href={`tel:${restaurant.phone}`}
                                className="flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition text-sm sm:text-base flex items-center gap-2"
                            >
                                <Phone size={18} />
                                <span className="hidden sm:inline">Call</span>
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {/* Menu Display */}
            <main className="max-w-4xl mx-auto px-0 sm:px-4 pb-6 sm:pb-8">
                {restaurant.menu_pdf_url ? (
                    <div className="bg-white sm:border sm:border-gray-200 sm:rounded-lg overflow-hidden sm:mt-4">
                        <div className="w-full" style={{ height: 'calc(100vh - 100px)', minHeight: '500px' }}>
                            <iframe
                                src={restaurant.menu_pdf_url}
                                className="w-full h-full border-0"
                                title="Restaurant Menu"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="bg-white sm:border sm:border-gray-200 sm:rounded-lg p-8 sm:p-16 text-center sm:mt-4 mx-4 sm:mx-0">
                        <ClipboardList size={80} className="mx-auto mb-6 text-gray-300" strokeWidth={1} />
                        <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-4">
                            Menu Coming Soon
                        </h2>
                        {restaurant.phone ? (
                            <a
                                href={`tel:${restaurant.phone}`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg rounded-lg font-semibold transition"
                            >
                                <Phone size={20} /> Call to Order Now
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

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const restaurant = await getRestaurantById(id);

    if (!restaurant) {
        return { title: 'Restaurant Not Found' };
    }

    return {
        title: `${restaurant.name} - Menu`,
        description: restaurant.description || `View the menu for ${restaurant.name}`,
    };
}
