export function Film() {
    return (
        <section className="land-section" aria-labelledby="film-title">
            <div className="land-wrap">
                <h2 id="film-title" className="land-h2">See it in 30 seconds.</h2>
                <div className="land-film">
                    <video
                        controls
                        preload="none"
                        playsInline
                        poster="/launch-film-poster.jpg"
                        className="block h-auto w-full"
                        aria-label="QR Menu in 30 seconds: upload a PDF, get a QR code, diners scan it"
                    >
                        <source src="/launch-film.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        </section>
    );
}
