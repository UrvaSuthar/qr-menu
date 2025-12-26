'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import '@/styles/app.css';

// ============================================
// TYPES
// ============================================

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ConfirmOptions {
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
}

interface ToastContextValue {
    showToast: (message: string, type?: ToastType) => void;
    showConfirm: (options: ConfirmOptions) => Promise<boolean>;
}

// ============================================
// CONTEXT
// ============================================

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}

// ============================================
// PROVIDER
// ============================================

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [confirmState, setConfirmState] = useState<{
        options: ConfirmOptions;
        resolve: (value: boolean) => void;
    } | null>(null);

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = Math.random().toString(36).substring(7);
        const toast: Toast = { id, message, type };

        setToasts((prev) => [...prev, toast]);

        // Auto dismiss
        const duration = type === 'error' ? 6000 : 4000;
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const dismissToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showConfirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            setConfirmState({ options, resolve });
        });
    }, []);

    const handleConfirm = (confirmed: boolean) => {
        if (confirmState) {
            confirmState.resolve(confirmed);
            setConfirmState(null);
        }
    };

    return (
        <ToastContext.Provider value={{ showToast, showConfirm }}>
            {children}

            {/* Toast Container */}
            <div className="toast-container">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`toast toast--${toast.type}`}>
                        <span className="toast__icon">
                            {toast.type === 'success' && <CheckCircle size={20} />}
                            {toast.type === 'error' && <AlertCircle size={20} />}
                            {toast.type === 'info' && <Info size={20} />}
                        </span>
                        <span className="toast__message">{toast.message}</span>
                        <button
                            className="toast__close"
                            onClick={() => dismissToast(toast.id)}
                            aria-label="Close"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Confirm Modal */}
            {confirmState && (
                <div className="confirm-overlay" onClick={() => handleConfirm(false)}>
                    <div
                        className="confirm-modal"
                        onClick={(e) => e.stopPropagation()}
                        role="alertdialog"
                        aria-labelledby="confirm-title"
                        aria-describedby="confirm-description"
                    >
                        <h2 id="confirm-title" className="confirm-modal__title">
                            {confirmState.options.title}
                        </h2>
                        {confirmState.options.description && (
                            <p id="confirm-description" className="confirm-modal__description">
                                {confirmState.options.description}
                            </p>
                        )}
                        <div className="confirm-modal__actions">
                            <button
                                className="app-button app-button--secondary"
                                onClick={() => handleConfirm(false)}
                            >
                                {confirmState.options.cancelLabel || 'Cancel'}
                            </button>
                            <button
                                className={`app-button ${confirmState.options.destructive ? 'app-button--danger' : 'app-button--primary'}`}
                                onClick={() => handleConfirm(true)}
                                autoFocus
                            >
                                {confirmState.options.confirmLabel || 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}
