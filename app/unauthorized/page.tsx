import Link from 'next/link';
import { ShieldX } from 'lucide-react';

export default function UnauthorizedPage() {
    return (
        <main className="msg-page">
            <div className="msg-card">
                <ShieldX size={48} strokeWidth={1.5} className="msg-card__icon" aria-hidden="true" />
                <h1 className="msg-card__title">This page is for a different account type</h1>
                <p className="msg-card__text">
                    Restaurant and food court dashboards are separate. Log in with the account that owns this page.
                </p>
                <div className="msg-card__actions">
                    <Link href="/login" className="app-button app-button--primary">Log in</Link>
                    <Link href="/" className="app-button app-button--secondary">Go to home</Link>
                </div>
            </div>
        </main>
    );
}
