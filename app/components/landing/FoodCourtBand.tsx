const STALLS = ['CK', 'NB', 'TS', 'DH', 'GB', 'PO'];

export function FoodCourtBand() {
    return (
        <section className="land-band" aria-labelledby="fc-title">
            <div className="land-wrap grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <h2 id="fc-title" className="land-h2">One QR. Every stall.</h2>
                    <p className="land-lede land-lede--inverse">
                        Food court ready: one QR, multiple restaurants. Perfect for chaos management.
                        Diners scan once, pick a stall, and read its own menu.
                    </p>
                </div>
                <div className="land-stalls" aria-hidden="true">
                    {STALLS.map((s) => (
                        <div key={s} className="land-stall">
                            <span className="land-stall__tile">{s}</span>
                            <span className="land-stall__line" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
