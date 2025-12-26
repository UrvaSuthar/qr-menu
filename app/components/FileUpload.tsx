'use client';

import { useState, useRef } from 'react';
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
        } catch (err: any) {
            setError(err.message || 'Failed to delete file');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Label */}
            <label className="app-label">
                {label}
                {description && (
                    <span style={{ display: 'block', fontWeight: 'normal', color: 'var(--app-text-muted)', marginTop: '4px', fontSize: 'var(--text-xs)' }}>
                        {description}
                    </span>
                )}
            </label>

            {/* Current File Preview */}
            {currentUrl && (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    {accept.includes('image') ? (
                        <img
                            src={currentUrl}
                            alt="Current file"
                            style={{
                                width: '128px',
                                height: '128px',
                                objectFit: 'cover',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--app-border)'
                            }}
                        />
                    ) : (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-3)',
                            padding: 'var(--space-4)',
                            background: 'var(--app-bg-secondary)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--app-border)'
                        }}>
                            <FileText size={32} color="var(--app-text-disabled)" />
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Uploaded</p>
                                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--app-text-muted)' }}>Click to replace</p>
                            </div>
                        </div>
                    )}

                    {onDelete && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={uploading}
                            style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                width: '28px',
                                height: '28px',
                                background: 'var(--app-error)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius-full)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                opacity: uploading ? 0.5 : 1
                            }}
                        >
                            <X size={16} />
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
                className={`app-upload-zone ${dragActive ? 'app-upload-zone--active' : ''} ${uploading ? 'app-upload-zone--disabled' : ''}`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleChange}
                    disabled={uploading}
                    style={{ display: 'none' }}
                />

                <div>
                    {accept.includes('image') ? (
                        <ImageIcon size={40} className="app-upload-zone__icon" />
                    ) : (
                        <FileText size={40} className="app-upload-zone__icon" />
                    )}
                    <div>
                        {uploading ? (
                            <p className="app-upload-zone__text">Uploading...</p>
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
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="app-alert app-alert--error">
                    {error}
                </div>
            )}
        </div>
    );
}
