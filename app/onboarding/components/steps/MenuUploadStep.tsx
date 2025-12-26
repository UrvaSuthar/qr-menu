'use client';

import { useState } from 'react';
import { updateRestaurant, uploadFile } from '@/lib/restaurants';
import { Card, Button, LoadingSpinner } from '@/components/ui';
import { FileUpload } from '@/components/FileUpload';
import { useToast } from '@/contexts/ToastContext';
import { ArrowRight } from 'lucide-react';

interface MenuUploadStepProps {
    restaurantId: string;
    onComplete: () => void;
    onSkip: () => void;
}

export function MenuUploadStep({ restaurantId, onComplete, onSkip }: MenuUploadStepProps) {
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const handleUploadComplete = async (url: string, path: string) => {
        setLoading(true);
        try {
            await updateRestaurant(restaurantId, {
                menu_pdf_url: url,
                menu_pdf_storage_path: path,
            });
            showToast('Menu uploaded!', 'success');
            onComplete();
        } catch (error: any) {
            showToast(error.message, 'error');
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">Upload your menu</h2>
            <p className="text-[var(--app-text-muted)] mb-6">
                Upload your menu PDF so customers can view it when they scan your QR code.
            </p>

            <div className="space-y-6">
                <FileUpload
                    label="Menu PDF"
                    description="Upload your menu in PDF format (max 5MB)"
                    accept="application/pdf"
                    maxSize={5 * 1024 * 1024} // 5MB
                    bucket="menus"
                    onUploadComplete={handleUploadComplete}
                />

                <div className="pt-6 flex justify-between items-center border-t border-[var(--app-border)]">
                    <button
                        onClick={onSkip}
                        className="text-[var(--app-text-muted)] hover:text-[var(--app-text-primary)] transition-colors text-sm font-medium"
                    >
                        Skip for now
                    </button>

                    {/* Only show if loading (upload in progress handled by FileUpload, but DB update here) */}
                    {loading && (
                        <div className="flex items-center gap-2 text-[var(--app-primary)]">
                            <LoadingSpinner size="sm" />
                            <span className="text-sm">Saving...</span>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
