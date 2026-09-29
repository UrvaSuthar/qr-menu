import Link from 'next/link';
import { SearchX } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="msg-page">
            <div className="msg-card">
                <SearchX size={48} strokeWidth={1.5} className="msg-card__icon" aria-hidden="true" />
                <h1 className="msg-card__title">Page not found</h1>
                <p className="msg-card__text">
                    If you scanned a QR code, the menu may have moved. Ask the staff for the current one.
                </p>
                <div className="msg-card__actions">
                    <Link href="/" className="app-button app-button--primary">Go to home</Link>
                </div>
            </div>
        </main>
    );
}
