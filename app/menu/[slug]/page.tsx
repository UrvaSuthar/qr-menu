import { getRestaurantBySlug, logQRScan } from '@/lib/restaurants';
import { notFound } from 'next/navigation';
import { MenuViewer } from '@/components/features/menu/MenuViewer';

export default async function PublicMenuPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const restaurant = await getRestaurantBySlug(slug);

    if (!restaurant) {
        notFound();
    }

    logQRScan(restaurant.id).catch(console.error);

    return <MenuViewer restaurant={restaurant} />;
}
