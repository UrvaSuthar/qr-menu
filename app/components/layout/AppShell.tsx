'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, QrCode } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type OwnerRole = 'restaurant' | 'food_court';

const NAV: Record<OwnerRole, { href: string; label: string }[]> = {
    restaurant: [
        { href: '/restaurant', label: 'Dashboard' },
        { href: '/restaurant/qr-code', label: 'QR code' },
        { href: '/restaurant/settings', label: 'Settings' },
    ],
    food_court: [
        { href: '/food-court', label: 'Dashboard' },
        { href: '/food-court/restaurants', label: 'Restaurants' },
        { href: '/food-court/qr-code', label: 'QR code' },
        { href: '/food-court/settings', label: 'Settings' },
    ],
};

interface AppShellProps {
    role: OwnerRole;
    title: string;
    subtitle?: string;
    actions?: ReactNode;
    narrow?: boolean;
    children: ReactNode;
}

/** Owner-area layout: top bar with logo, section nav and sign out, then the page title and content. */
export function AppShell({ role, title, subtitle, actions, narrow = false, children }: AppShellProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { signOut } = useAuth();
    const nav = NAV[role];
    const container = `app-container${narrow ? ' app-container--narrow' : ''}`;

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <div className="app-page">
            <header className="app-topbar">
                <div className={`${container} app-topbar__inner`}>
                    <Link href={nav[0].href} className="app-logo" aria-label="QR Menu dashboard">
                        <span className="app-logo__mark"><QrCode size={18} strokeWidth={2} /></span>
                        <span className="app-logo__word">QR Menu</span>
                    </Link>
                    <nav className="app-nav" aria-label="Dashboard sections">
                        {nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`app-nav__link${pathname === item.href ? ' app-nav__link--active' : ''}`}
                                aria-current={pathname === item.href ? 'page' : undefined}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <button onClick={handleSignOut} className="app-button app-button--ghost app-button--sm" aria-label="Sign out">
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Sign out</span>
                    </button>
                </div>
            </header>

            <div className={container}>
                <div className="app-titlebar">
                    <div className="min-w-0">
                        <h1 className="app-page-title">{title}</h1>
                        {subtitle && <p className="app-titlebar__subtitle">{subtitle}</p>}
                    </div>
                    {actions}
                </div>
            </div>

            <main className={`${container} app-main`}>{children}</main>
        </div>
    );
}
