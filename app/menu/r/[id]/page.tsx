import { getRestaurantById } from '@/lib/restaurants';
import { notFound } from 'next/navigation';
import { MenuViewer } from '@/components/features/menu/MenuViewer';

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

    return <MenuViewer restaurant={restaurant} backHref={restaurant.parent_food_court_id ? `/menu/fc/${restaurant.parent_food_court_id}` : undefined} />;
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
