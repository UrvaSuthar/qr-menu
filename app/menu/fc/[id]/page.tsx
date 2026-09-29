import { getFoodCourtById } from '@/lib/foodCourts';
import { FoodCourtView } from '@/components/features/menu/FoodCourtView';
import { notFound } from 'next/navigation';

export default async function FoodCourtGridByIdPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const foodCourt = await getFoodCourtById(id);

    if (!foodCourt) {
        notFound();
    }

    return <FoodCourtView foodCourt={foodCourt} />;
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
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
