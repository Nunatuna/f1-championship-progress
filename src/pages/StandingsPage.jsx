import TopThreeCard from "../components/TopThreeCard.jsx";
import DriverRow from "../components/DriverRow.jsx";

export default function StandingsPage({
  status,
  error,
  season,
  round,
  totalRounds,
  isStale,
  cachedAt,
  drivers,
}) {
  const topThree = drivers.slice(0, 3);
  const rest = drivers.slice(3);

  return (
    <>
      {status === "loading" && <p className="page__status">Loading standings…</p>}

      {status === "error" && (
        <p className="page__status page__status--error">
          Couldn't load standings: {error}
        </p>
      )}

      {status === "ready" && (
        <>
          {isStale && (
            <p className="page__status page__status--stale">
              Live standings are unavailable right now — showing the last
              data received{cachedAt ? ` (${new Date(cachedAt).toLocaleString()})` : ""}.
            </p>
          )}

          <section className="top-three">
            {topThree.map((driver) => (
              <TopThreeCard key={driver.driverId} driver={driver} />
            ))}
          </section>

          <section className="standings-list">
            <div className="driver-row driver-row--header">
              <span>Pos</span>
              <span>Code</span>
              <span>Driver</span>
              <span>Team</span>
              <span>Wins</span>
              <span>Points</span>
              <span>Progress</span>
            </div>
            {rest.map((driver) => (
              <DriverRow key={driver.driverId} driver={driver} />
            ))}
          </section>
        </>
      )}
    </>
  );
}
