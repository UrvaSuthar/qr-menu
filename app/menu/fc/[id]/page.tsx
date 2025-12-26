import { getFoodCourtById } from '@/lib/foodCourts';
import { RestaurantGrid } from '@/components/RestaurantGrid';
import { notFound } from 'next/navigation';

export default async function FoodCourtGridByIdPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Await params (Next.js 16 requirement)
    const { id } = await params;

    const foodCourt = await getFoodCourtById(id);

    if (!foodCourt) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section - Simple & Clear */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-3">
                            {foodCourt.name}
                        </h1>
                        {foodCourt.description && (
                            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-4">
                                {foodCourt.description}
                            </p>
                        )}

                        {/* Contact Info - Compact */}
                        {(foodCourt.address || foodCourt.phone) && (
                            <div className="mt-4 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                                {foodCourt.address && (
                                    <div className="flex items-center gap-1.5">
                                        <span>📍</span>
                                        <span>{foodCourt.address}</span>
                                    </div>
                                )}
                                {foodCourt.phone && (
                                    <a
                                        href={`tel:${foodCourt.phone}`}
                                        className="flex items-center gap-1.5 hover:text-green-600 font-medium"
                                    >
                                        <span>📞</span>
                                        <span>{foodCourt.phone}</span>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Restaurant Grid - Hero */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 pb-12">
                {/* Simpler Instruction */}
                <div className="text-center mb-8">
                    <p className="text-lg sm:text-xl text-gray-700 font-medium">
                        👇 Tap any restaurant to see their menu
                    </p>
                </div>

                <RestaurantGrid restaurants={foodCourt.sub_restaurants} />
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

    const foodCourt = await getFoodCourtById(id);

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
