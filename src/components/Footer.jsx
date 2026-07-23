export default function Footer() {
    return (
        <div className="page__footer">
            <p>
                Coded by Aiden · <a href="https://github.com/Nunatuna/f1-championship-progress" target="_blank" className="--color-accent">GitHub</a>
            </p>
            <p>
                F1 Progress is an independent fan-made project and is not
                affiliated with Formula 1, FIA, or any Formula 1 team.
            </p>
            <p>
                Championship data provided by <a href="https://github.com/jolpica/jolpica-f1" target="_blank" className="--color-accent">Jolpica F1 API</a>.
                Licensed under Apache License 2.0.
            </p>
        </div>
    );
}