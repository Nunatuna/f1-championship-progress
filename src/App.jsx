import { useEffect, useState } from "react";
import { fetchDriverStandings, fetchRaceSchedule } from "./api/f1Api.js";
import { calculateChampionshipData, getMaxRemainingPoints } from "./utils/championship.js";
import { loadCachedStandings, saveCachedStandings } from "./utils/cache.js";
import NavBar from "./components/NavBar.jsx";
import StandingsPage from "./pages/StandingsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Footer from "./components/Footer.jsx";

function getPageFromHash() {
  return window.location.hash === "#about" ? "about" : "standings";
}

export default function App() {
  const [page, setPage] = useState(getPageFromHash());

  const [status, setStatus] = useState("loading"); // "loading" | "error" | "ready"
  const [error, setError] = useState(null);
  const [season, setSeason] = useState(null);
  const [round, setRound] = useState(null);
  const [totalRounds, setTotalRounds] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [maxRemainingPoints, setMaxRemainingPoints] = useState(0);
  const [isStale, setIsStale] = useState(false);
  const [cachedAt, setCachedAt] = useState(null);

  useEffect(() => {
    function onHashChange() {
      setPage(getPageFromHash());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function navigate(nextPage) {
    window.location.hash = nextPage === "about" ? "#about" : "";
    setPage(nextPage);
  }

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
        const computedDrivers = calculateChampionshipData(standings.drivers, remaining);

        setSeason(standings.season);
        setRound(standings.round);
        setTotalRounds(schedule.length);
        setMaxRemainingPoints(remaining);
        setDrivers(computedDrivers);
        setIsStale(false);
        setCachedAt(null);
        setStatus("ready");

        saveCachedStandings({
          season: standings.season,
          round: standings.round,
          totalRounds: schedule.length,
          maxRemainingPoints: remaining,
          drivers: computedDrivers,
        });
      } catch (err) {
        if (cancelled) return;

        // Live fetch failed — fall back to the last successful response,
        // if we have one, instead of showing an empty/broken page.
        const cached = loadCachedStandings();

        if (cached) {
          setSeason(cached.season);
          setRound(cached.round);
          setTotalRounds(cached.totalRounds ?? null);
          setMaxRemainingPoints(cached.maxRemainingPoints);
          setDrivers(cached.drivers);
          setIsStale(true);
          setCachedAt(cached.fetchedAt);
          setStatus("ready");
        } else {
          setError(err.message ?? "Something went wrong");
          setStatus("error");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page">
      <header className="page__header">
        <h1>F1 Driver Championship</h1>
        <p className="page__subtitle">
          {season ? `${season} season` : "Current season"}
          {round ? ` · through round ${round}` : ""}
          {" / "}
          {totalRounds ?? "—"}
        </p>
        <NavBar page={page} onNavigate={navigate} />
      </header>

      {page === "standings" ? (
        <StandingsPage
          status={status}
          error={error}
          season={season}
          round={round}
          totalRounds={totalRounds}
          isStale={isStale}
          cachedAt={cachedAt}
          drivers={drivers}
        />
      ) : (
        <AboutPage />
      )}
      <Footer />
    </div>
  );
}
