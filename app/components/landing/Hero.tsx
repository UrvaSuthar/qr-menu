import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

const SITE_URL = 'https://qr-menu-sigma.vercel.app';

/** The subject itself: a stained paper menu getting its QR sticker. */
function PaperMenu() {
    return (
        <div className="land-menu" aria-hidden="true">
            <p className="land-menu__name">The Corner Kitchen</p>
            <p className="land-menu__est">Est. 2009</p>
            <p className="land-menu__section">Starters</p>
            <p className="land-menu__row"><span>Tomato soup</span><i /><span>6.50</span></p>
            <p className="land-menu__row"><span>Garlic bread</span><i /><span>4.00</span></p>
            <p className="land-menu__row"><span>Bruschetta</span><i /><span>7.00</span></p>
            <p className="land-menu__section">Mains</p>
            <p className="land-menu__row"><span>Mushroom risotto</span><i /><span>14.00</span></p>
            <p className="land-menu__row"><span>Grilled chicken</span><i /><span>16.50</span></p>
            <p className="land-menu__row"><span>Fish &amp; chips</span><i /><span>15.00</span></p>
            <p className="land-menu__section">Desserts</p>
            <p className="land-menu__row"><span>Apple crumble</span><i /><span>6.00</span></p>
            <span className="land-menu__stain" />
            <div className="land-sticker">
                <QRCodeSVG value={SITE_URL} size={112} level="M" fgColor="#0B0B0C" bgColor="#FFFFFF" />
                <span className="land-sticker__caption">Scan for the menu</span>
            </div>
        </div>
    );
}

export function Hero() {
    return (
        <section className="land-hero">
            <div className="land-wrap grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                    <h1 className="land-display">
                        Your menu is stuck in the past.
                        <span className="block">Let&apos;s fix that.</span>
                    </h1>
                    <p className="land-lede">
                        Upload your PDF (yes, even the one with the coffee stain). We&apos;ll turn it into a QR code
                        that your customers actually enjoy scanning.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link href="/signup" className="app-button app-button--primary land-cta">Create your QR menu</Link>
                        <Link href="/login" className="app-button app-button--secondary land-cta">Log in</Link>
                    </div>
                    <p className="mt-5 text-sm text-muted">Free forever. No credit card. About five minutes to set up.</p>
                </div>
                <PaperMenu />
            </div>
        </section>
    );
}
