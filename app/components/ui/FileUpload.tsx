'use client';

import { useState, useRef, useId } from 'react';
import { uploadFile, deleteFile } from '@/lib/restaurants';
import { FileText, ImageIcon, X } from 'lucide-react';
import '@/styles/app.css';
import { useToast } from '@/contexts/ToastContext';

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
    const inputId = useId();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { showConfirm } = useToast();

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
            const timestamp = Date.now();
            const fileExt = file.name.split('.').pop();
            const storagePath = `${timestamp}.${fileExt}`;

            const publicUrl = await uploadFile(bucket, storagePath, file);
            onUploadComplete(publicUrl, storagePath);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to upload file');
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

        const confirmed = await showConfirm({
            title: 'Delete file?',
            description: 'Are you sure you want to delete this file?',
            confirmLabel: 'Delete',
            destructive: true,
        });

        if (!confirmed) return;

        setUploading(true);
        try {
            const urlParts = currentUrl.split('/');
            const path = urlParts[urlParts.length - 1];

            await deleteFile(bucket, path);
            onDelete();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to delete file');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <label className="app-label" htmlFor={inputId}>
                {label}
                {description && <span className="app-upload__description">{description}</span>}
            </label>

            {currentUrl && (
                <div className="app-upload__current">
                    {accept.includes('image') ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={currentUrl} alt="Current file" className="app-upload__image" />
                    ) : (
                        <div className="app-upload__file">
                            <FileText size={28} aria-hidden="true" />
                            <div>
                                <p className="text-sm font-semibold">Uploaded</p>
                                <p className="text-xs text-muted">Upload again to replace</p>
                            </div>
                        </div>
                    )}

                    {onDelete && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={uploading}
                            className="app-upload__remove"
                            aria-label="Remove file"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}

            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`app-upload-zone ${dragActive ? 'app-upload-zone--active' : ''} ${uploading ? 'app-upload-zone--disabled' : ''}`}
            >
                <input
                    ref={fileInputRef}
                    id={inputId}
                    type="file"
                    accept={accept}
                    onChange={handleChange}
                    disabled={uploading}
                    className="sr-only"
                />

                {accept.includes('image') ? (
                    <ImageIcon size={36} className="app-upload-zone__icon" aria-hidden="true" />
                ) : (
                    <FileText size={36} className="app-upload-zone__icon" aria-hidden="true" />
                )}
                {uploading ? (
                    <p className="app-upload-zone__text">Uploading…</p>
                ) : (
                    <>
                        <p className="app-upload-zone__text">
                            {currentUrl ? 'Click to replace' : 'Click to upload'} or drag and drop
                        </p>
                        <p className="app-upload-zone__hint">
                            Max {(maxSize / 1024 / 1024).toFixed(0)}MB • {accept}
                        </p>
                    </>
                )}
            </div>

            {error && (
                <div className="app-alert app-alert--error" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
}
