'use client';

import { Restaurant } from '@/types';
import { UtensilsCrossed, FileText } from 'lucide-react';

interface RestaurantGridProps {
    restaurants: Restaurant[];
}

export function RestaurantGrid({ restaurants }: RestaurantGridProps) {
    if (restaurants.length === 0) {
        return (
            <div className="text-center py-20">
                <UtensilsCrossed size={64} className="mx-auto mb-6 text-gray-400" strokeWidth={1} />
                <h3 className="text-3xl font-semibold text-black mb-3">
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
                    className="group bg-white border border-gray-200 rounded-lg hover:border-black transition-all duration-200 overflow-hidden"
                >
                    {/* Logo Section */}
                    <div className="aspect-square bg-gray-50 p-6 sm:p-8 flex items-center justify-center relative">
                        {restaurant.logo_url ? (
                            <img
                                src={restaurant.logo_url}
                                alt={restaurant.name}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                            />
                        ) : (
                            <UtensilsCrossed size={64} className="text-gray-300" strokeWidth={1} />
                        )}

                        {/* Menu Available Indicator */}
                        {restaurant.menu_pdf_url && (
                            <div className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                <FileText size={12} />
                                <span>Menu</span>
                            </div>
                        )}
                    </div>

                    {/* Name Section */}
                    <div className="p-4 sm:p-5 bg-white border-t border-gray-100">
                        <h3 className="text-lg font-semibold text-black text-center group-hover:text-red-600 transition-colors line-clamp-2">
                            {restaurant.name}
                        </h3>
                    </div>

                    {/* CTA */}
                    <div className="px-4 pb-4 sm:pb-5">
                        <div className="text-center text-sm text-red-600 font-semibold py-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            View Menu →
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
