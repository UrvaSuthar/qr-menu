import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-line">
            <div className="land-wrap flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} QR Menu. Digital menus made simple.</p>
                <nav className="flex gap-5" aria-label="Footer">
                    <Link href="/login" className="hover:text-ink">Log in</Link>
                    <Link href="/signup" className="hover:text-ink">Sign up</Link>
                </nav>
            </div>
        </footer>
    );
}
