import Link from 'next/link';
import { QrCode } from 'lucide-react';

export function Navbar() {
    return (
        <header className="land-nav">
            <div className="land-wrap flex h-16 items-center justify-between gap-4">
                <Link href="/" className="app-logo" aria-label="QR Menu home">
                    <span className="app-logo__mark"><QrCode size={18} strokeWidth={2} /></span>
                    <span className="app-logo__word">QR Menu</span>
                </Link>
                <nav className="flex items-center gap-2" aria-label="Account">
                    <Link href="/login" className="app-button app-button--ghost app-button--sm">Log in</Link>
                    <Link href="/signup" className="app-button app-button--primary app-button--sm">Get started</Link>
                </nav>
            </div>
        </header>
    );
}
