import { getFoodCourtBySlug } from '@/lib/foodCourts';
import { RestaurantGrid } from '@/components/RestaurantGrid';
import { notFound } from 'next/navigation';

export default async function FoodCourtPublicPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // Await params (Next.js 16 requirement)
    const { slug } = await params;

    const foodCourt = await getFoodCourtBySlug(slug);

    if (!foodCourt) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
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
                                        <span>📍</span>
                                        <span>{foodCourt.address}</span>
                                    </div>
                                )}
                                {foodCourt.phone && (
                                    <div className="flex items-center gap-2">
                                        <span>📞</span>
                                        <a
                                            href={`tel:${foodCourt.phone}`}
                                            className="hover:text-indigo-600"
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
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    Choose a Restaurant
                </h2>
                <RestaurantGrid restaurants={foodCourt.sub_restaurants} />
            </main>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
                <p>Powered by QR Menu Platform</p>
            </footer>
        </div>
    );
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // Await params (Next.js 16 requirement)
    const { slug } = await params;

    const foodCourt = await getFoodCourtBySlug(slug);

    if (!foodCourt) {
        return {
            title: 'Food Court Not Found',
        };
    }

    return {
        title: `${foodCourt.name} - Restaurants`,
        description: foodCourt.description || `Browse restaurants at ${foodCourt.name}`,
    };
}
