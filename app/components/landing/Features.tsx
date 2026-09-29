const FEATURES = [
    { title: 'Works on potato phones', desc: 'No app download required. If it has a camera, it works.' },
    { title: 'Update in seconds', desc: 'Change the menu without re-printing QR codes. Upload a new PDF and the same code shows it.' },
    { title: 'Free, for real', desc: 'The free plan is forever and needs no credit card.' },
    { title: 'Your logo on it', desc: 'Diners see your name and logo on top of the menu, not ours.' },
];

export function Features() {
    return (
        <section className="land-section land-section--tint" aria-labelledby="features-title">
            <div className="land-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <h2 id="features-title" className="land-h2">Built for the counter, not the boardroom.</h2>
                <dl className="land-features">
                    {FEATURES.map((f) => (
                        <div key={f.title} className="land-feature">
                            <dt className="land-feature__title">{f.title}</dt>
                            <dd className="land-feature__desc">{f.desc}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
