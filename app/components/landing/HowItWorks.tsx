const STEPS = [
    { title: 'Upload that PDF', desc: 'Drag and drop your menu PDF, up to 5MB.' },
    { title: 'Get your QR code', desc: 'We generate a unique code. Print it on tables, walls, or your forehead.' },
    { title: 'Diners scan and eat', desc: 'They scan. The menu loads instantly. They order. You profit. Simple.' },
];

export function HowItWorks() {
    return (
        <section className="land-section" aria-labelledby="how-title">
            <div className="land-wrap">
                <h2 id="how-title" className="land-h2">Three steps, about five minutes.</h2>
                <ol className="land-steps">
                    {STEPS.map((step, i) => (
                        <li key={step.title} className="land-step">
                            <span className="land-step__num" aria-hidden="true">{i + 1}</span>
                            <h3 className="land-step__title">{step.title}</h3>
                            <p className="land-step__desc">{step.desc}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
