import Link from 'next/link';

export function CTASection() {
    return (
        <section className="land-section" aria-labelledby="cta-title">
            <div className="land-wrap">
                <div className="land-final">
                    <h2 id="cta-title" className="land-h2">Ready to level up?</h2>
                    <p className="land-lede">Your first QR menu is about five minutes away.</p>
                    <Link href="/signup" className="app-button app-button--primary land-cta mt-8">Create your QR menu</Link>
                </div>
            </div>
        </section>
    );
}
