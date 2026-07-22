import { useEffect, useState } from "react";
import { fetchDriverStandings, fetchRaceSchedule } from "./api/f1Api.js";
import { calculateChampionshipData, getMaxRemainingPoints } from "./utils/championship.js";
import TopThreeCard from "./components/TopThreeCard.jsx";
import DriverRow from "./components/DriverRow.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [status, setStatus] = useState("loading"); // "loading" | "error" | "ready"
  const [error, setError] = useState(null);
  const [season, setSeason] = useState(null);
  const [round, setRound] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [maxRemainingPoints, setMaxRemainingPoints] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const [standings, schedule] = await Promise.all([
          fetchDriverStandings(),
          fetchRaceSchedule(),
        ]);
        if (cancelled) return;

        const remaining = getMaxRemainingPoints(schedule, standings.round);

        setSeason(standings.season);
        setRound(standings.round);
        setMaxRemainingPoints(remaining);
        setDrivers(calculateChampionshipData(standings.drivers, remaining));
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setError(err.message ?? "Something went wrong");
        setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const topThree = drivers.slice(0, 3);
  const rest = drivers.slice(3);

  return (
    <div className="page">
      <header className="page__header">
        <h1>F1 Championship Progress - {season ? `${season} season` : "Current season"}</h1>
        <p className="page__subtitle">
          {round ? `Progress after round ${round}` : ""}
        </p>
      </header>

      {status === "loading" && <p className="page__status">Loading standings…</p>}

      {status === "error" && (
        <p className="page__status page__status--error">
          Couldn't load standings: {error}
        </p>
      )}

      {status === "ready" && (
        <>
          <section className="top-three">
            {topThree.map((driver) => (
              <TopThreeCard key={driver.driverId} driver={driver} />
            ))}
          </section>

          <section className="standings-list">
            <div className="driver-row driver-row--header">
              <span>Pos</span>
              <span>Driver</span>
              <span>Name</span>
              <span>Team</span>
              <span>Wins</span>
              <span>Points</span>
            </div>
            {rest.map((driver) => (
              <DriverRow key={driver.driverId} driver={driver} />
            ))}
          </section>
        </>
      )}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
