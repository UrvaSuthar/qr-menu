import { getRestaurantBySlug, logQRScan } from '@/lib/restaurants';
import { notFound } from 'next/navigation';
import { MapPin, Phone, FileText, ClipboardList } from 'lucide-react';

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

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        {restaurant.logo_url && (
                            <img
                                src={restaurant.logo_url}
                                alt={restaurant.name}
                                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                            />
                        )}
                        <div>
                            <h1 className="text-2xl font-semibold text-black">
                                {restaurant.name}
                            </h1>
                            {restaurant.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                    {restaurant.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Contact Info */}
                    {(restaurant.address || restaurant.phone) && (
                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                            {restaurant.address && (
                                <div className="flex items-start gap-2 text-sm text-gray-600">
                                    <MapPin size={16} className="mt-0.5 text-gray-400" />
                                    <span>{restaurant.address}</span>
                                </div>
                            )}
                            {restaurant.phone && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Phone size={16} className="text-gray-400" />
                                    <a href={`tel:${restaurant.phone}`} className="hover:text-red-600">
                                        {restaurant.phone}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* Menu Display */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                {restaurant.menu_pdf_url ? (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="p-4 bg-black text-white font-semibold flex items-center gap-2">
                            <FileText size={18} />
                            <span>Menu</span>
                        </div>
                        <div className="w-full" style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}>
                            <iframe
                                src={restaurant.menu_pdf_url}
                                className="w-full h-full border-0"
                                title="Restaurant Menu"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                        <ClipboardList size={64} className="mx-auto mb-4 text-gray-300" strokeWidth={1} />
                        <h2 className="text-2xl font-semibold text-black mb-2">
                            Menu Coming Soon
                        </h2>
                        <p className="text-gray-600">
                            The restaurant is working on uploading their menu.
                        </p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
                Powered by QR Menu
            </footer>
        </div>
    );
}
