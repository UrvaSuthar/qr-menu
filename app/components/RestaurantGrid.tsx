'use client';

import { Restaurant } from '@/types';

interface RestaurantGridProps {
    restaurants: Restaurant[];
}

export function RestaurantGrid({ restaurants }: RestaurantGridProps) {
    if (restaurants.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="text-8xl mb-6">🍽️</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    No Restaurants Yet
                </h3>
                <p className="text-gray-600 text-lg">
                    Check back soon!
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {restaurants.map((restaurant) => (
                <a
                    key={restaurant.id}
                    href={`/menu/r/${restaurant.id}`}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 active:translate-y-0"
                >
                    {/* Logo Section - Larger on mobile for better visibility */}
                    <div className="aspect-square bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6 sm:p-8 flex items-center justify-center relative">
                        {restaurant.logo_url ? (
                            <img
                                src={restaurant.logo_url}
                                alt={restaurant.name}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="text-7xl sm:text-8xl">🍽️</div>
                        )}

                        {/* Menu Available Indicator */}
                        {restaurant.menu_pdf_url && (
                            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                📄 Menu
                            </div>
                        )}
                    </div>

                    {/* Name Section - Larger for readability */}
                    <div className="p-4 sm:p-5 bg-white">
                        <h3 className="text-xl sm:text-lg font-bold text-gray-900 text-center group-hover:text-green-600 transition-colors line-clamp-2">
                            {restaurant.name}
                        </h3>
                    </div>

                    {/* CTA - Always visible on mobile, hover on desktop */}
                    <div className="px-4 pb-4 sm:pb-5">
                        <div className="text-center text-sm sm:text-base text-green-600 font-semibold py-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            View Menu →
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
