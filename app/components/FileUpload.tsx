'use client';

import { useState, useRef } from 'react';
import { uploadFile, deleteFile } from '@/lib/restaurants';
import { FileText, ImageIcon } from 'lucide-react';

interface FileUploadProps {
    accept: string;
    maxSize: number;
    bucket: string;
    currentUrl?: string;
    onUploadComplete: (url: string, storagePath: string) => void;
    onDelete?: () => void;
    label: string;
    description?: string;
}

export function FileUpload({
    accept,
    maxSize,
    bucket,
    currentUrl,
    onUploadComplete,
    onDelete,
    label,
    description,
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
        if (file.size > maxSize) {
            return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(0)}MB`;
        }
        return null;
    };

    const handleFile = async (file: File) => {
        setError('');

        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setUploading(true);
        try {
            // Generate unique file path
            const timestamp = Date.now();
            const fileExt = file.name.split('.').pop();
            const storagePath = `${timestamp}.${fileExt}`;

            // Upload file
            const publicUrl = await uploadFile(bucket, storagePath, file);

            onUploadComplete(publicUrl, storagePath);
        } catch (err: any) {
            setError(err.message || 'Failed to upload file');
        } finally {
            setUploading(false);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleDelete = async () => {
        if (!currentUrl || !onDelete) return;

        if (!confirm('Are you sure you want to delete this file?')) return;

        setUploading(true);
        try {
            // Extract path from URL
            const urlParts = currentUrl.split('/');
            const path = urlParts[urlParts.length - 1];

            await deleteFile(bucket, path);
            onDelete();
        } catch (err: any) {
            setError(err.message || 'Failed to delete file');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* Label */}
            <label className="block text-sm font-medium text-gray-900">
                {label}
                {description && (
                    <span className="block text-xs font-normal text-gray-500 mt-1">
                        {description}
                    </span>
                )}
            </label>

            {/* Current File Preview */}
            {currentUrl && (
                <div className="relative">
                    {accept.includes('image') ? (
                        <img
                            src={currentUrl}
                            alt="Current file"
                            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                    ) : (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <FileText size={32} className="text-gray-400" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">Uploaded</p>
                                <p className="text-xs text-gray-500">Click to replace</p>
                            </div>
                        </div>
                    )}

                    {onDelete && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={uploading}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition disabled:opacity-50"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            )}

            {/* Upload Zone */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
          ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleChange}
                    disabled={uploading}
                    className="hidden"
                />

                <div className="space-y-2">
                    {accept.includes('image') ? <ImageIcon size={40} className="mx-auto text-gray-400" /> : <FileText size={40} className="mx-auto text-gray-400" />}
                    <div className="text-sm text-gray-600">
                        {uploading ? (
                            <p className="font-medium">Uploading...</p>
                        ) : (
                            <>
                                <p className="font-medium">
                                    {currentUrl ? 'Click to replace' : 'Click to upload'} or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                    Max {(maxSize / 1024 / 1024).toFixed(0)}MB • {accept}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">{error}</p>
                </div>
            )}
        </div>
    );
}
