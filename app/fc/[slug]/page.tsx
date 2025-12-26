import { getFoodCourtBySlug } from '@/lib/foodCourts';
import { RestaurantGrid } from '@/components/RestaurantGrid';
import { notFound } from 'next/navigation';
import { MapPin, Phone } from 'lucide-react';

export default async function FoodCourtPublicPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const foodCourt = await getFoodCourtBySlug(slug);

    if (!foodCourt) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-semibold text-black mb-2">
                            {foodCourt.name}
                        </h1>
                        {foodCourt.description && (
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {foodCourt.description}
                            </p>
                        )}

                        {/* Contact Info */}
                        {(foodCourt.address || foodCourt.phone) && (
                            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                                {foodCourt.address && (
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-gray-400" />
                                        <span>{foodCourt.address}</span>
                                    </div>
                                )}
                                {foodCourt.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} className="text-gray-400" />
                                        <a
                                            href={`tel:${foodCourt.phone}`}
                                            className="hover:text-red-600"
                                        >
                                            {foodCourt.phone}
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Restaurant Grid */}
            <main className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-semibold text-black mb-8 text-center">
                    Choose a Restaurant
                </h2>
                <RestaurantGrid restaurants={foodCourt.sub_restaurants} />
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
                Powered by QR Menu
            </footer>
        </div>
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const foodCourt = await getFoodCourtBySlug(slug);

    if (!foodCourt) {
        return { title: 'Food Court Not Found' };
    }

    return {
        title: `${foodCourt.name} - Restaurants`,
        description: foodCourt.description || `Browse restaurants at ${foodCourt.name}`,
    };
}
