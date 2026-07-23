export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-section">
        <h2>What this site is (and isn't)</h2>
        <p>
          This is a leaderboard, not a prediction. It shows the current
          driver standings and works out, purely from arithmetic, how far
          each driver still is from being mathematically guaranteed the
          championship. It doesn't forecast who will actually win, run any
          simulation, or weigh things like current form, reliability, or
          team orders. It only answers one narrow question: "based on
          points already scored and races left on the calendar, what's
          still possible?"
        </p>
      </section>

      <section className="about-section">
        <h2>The core idea: "still possible" vs "likely"</h2>
        <p>
          A driver mathematically clinches the title once no rival could
          catch them even in the most extreme case — that rival winning
          every single remaining race and sprint outright. That's a
          deliberately unrealistic scenario (nobody wins everything left on
          a calendar), but it's exactly what makes the clinch calculation
          meaningful: once even that best-case scenario isn't enough for a
          rival, the title is decided, full stop.
        </p>
        <p>
          Everywhere else, before that point, the progress percentage is
          just a way of visualizing distance to that guarantee — not a
          probability, not an estimate of who's "likely" to win.
        </p>
      </section>

      <section className="about-section">
        <h2>The calculation, step by step</h2>
        <ol className="about-steps">
          <li>
            <strong>Max remaining points</strong> — how many points are
            still up for grabs, for a single driver, across the races and
            sprints left on the calendar. This comes from the actual
            remaining schedule (races × 25, sprints × 8), not a fixed
            season-wide total, so it adjusts automatically if races are
            added, dropped, or rescheduled.
          </li>
          <li>
            <strong>Max possible points</strong> — a driver's current
            points, plus every one of those remaining points, as if they
            won everything left.
          </li>
          <li>
            <strong>Best rival case</strong> — the highest "max possible
            points" among every other driver in the field.
          </li>
          <li>
            <strong>Points needed to lock the title</strong> — one more
            point than that best rival case. Score this many and no one
            can catch you, even in their best-case scenario.
          </li>
          <li>
            <strong>Progress</strong> — current points shown as a
            percentage of that target, capped at 100%.
          </li>
          <li>
            <strong>Clinched</strong> — true the moment a driver's current
            points exceed every other driver's max possible points.
          </li>
        </ol>
      </section>

      <section className="about-section">
        <h2>Where the numbers come from</h2>
        <p>
          Standings and the race calendar are pulled live from the
          Jolpica F1 API (an Ergast-compatible, community-run source). The
          scoring assumptions match current F1 rules: 25 points for a race
          win and 8 for a sprint win, with no fastest-lap bonus point
          (that was removed from the regulations starting in 2025).
        </p>
      </section>
    </div>
  );
}
