'use client';

import { Restaurant } from '@/types';

interface RestaurantGridProps {
    restaurants: Restaurant[];
}

export function RestaurantGrid({ restaurants }: RestaurantGridProps) {
    if (restaurants.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No Restaurants Yet
                </h3>
                <p className="text-gray-600">
                    Check back soon for our restaurant lineup!
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
                <a
                    key={restaurant.id}
                    href={`/menu/${restaurant.slug}`}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                    {/* Logo Section */}
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
                        {restaurant.logo_url ? (
                            <img
                                src={restaurant.logo_url}
                                alt={restaurant.name}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                        ) : (
                            <div className="text-6xl">🍽️</div>
                        )}
                    </div>

                    {/* Name Section */}
                    <div className="p-4 bg-white">
                        <h3 className="text-lg font-bold text-gray-900 text-center group-hover:text-indigo-600 transition-colors">
                            {restaurant.name}
                        </h3>
                        {restaurant.description && (
                            <p className="text-sm text-gray-600 text-center mt-1 line-clamp-2">
                                {restaurant.description}
                            </p>
                        )}
                    </div>

                    {/* Hover Indicator */}
                    <div className="px-4 pb-4">
                        <div className="text-center text-sm text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            View Menu →
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
