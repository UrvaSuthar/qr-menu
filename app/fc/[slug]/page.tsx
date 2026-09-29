import { getFoodCourtBySlug } from '@/lib/foodCourts';
import { FoodCourtView } from '@/components/features/menu/FoodCourtView';
import { notFound } from 'next/navigation';

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

    return <FoodCourtView foodCourt={foodCourt} />;
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
