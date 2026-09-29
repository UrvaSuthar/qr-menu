import { QrCode } from 'lucide-react';

interface BrandPanelProps {
    title: string;
    line: string;
}

/** Ink side panel for auth pages: logo, one line of copy, and a small paper-menu illustration. Hidden on mobile. */
export function BrandPanel({ title, line }: BrandPanelProps) {
    return (
        <aside className="auth-brand" aria-hidden="true">
            <div className="auth-brand-logo">
                <span className="auth-brand-mark"><QrCode size={18} /></span>
                QR Menu
            </div>

            <div className="auth-brand-copy">
                <p className="auth-brand-title">{title}</p>
                <p className="auth-brand-tagline">{line}</p>
            </div>

            <div className="auth-menu-mock">
                <p className="auth-menu-mock-name">The Corner Kitchen</p>
                <p className="auth-menu-mock-section">Starters</p>
                <p className="auth-menu-mock-row"><span>Tomato soup</span><i /><span>6.50</span></p>
                <p className="auth-menu-mock-row"><span>Garlic bread</span><i /><span>4.00</span></p>
                <p className="auth-menu-mock-section">Mains</p>
                <p className="auth-menu-mock-row"><span>Mushroom risotto</span><i /><span>14.00</span></p>
                <p className="auth-menu-mock-row"><span>Fish &amp; chips</span><i /><span>15.00</span></p>
                <span className="auth-menu-mock-qr"><QrCode size={40} strokeWidth={1.5} /></span>
            </div>
        </aside>
    );
}
