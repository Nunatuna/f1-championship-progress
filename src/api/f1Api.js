const STANDINGS_URL = "https://api.jolpi.ca/ergast/f1/current/driverstandings.json";
const SCHEDULE_URL = "https://api.jolpi.ca/ergast/f1/current.json";

/**
 * Fetches the current season's driver standings and normalizes the
 * Ergast-shaped response into a flat array that's easy to render.
 *
 * Returns:
 * [
 *   {
 *     driverId, position, points, wins,
 *     code, permanentNumber, givenName, familyName, nationality,
 *     constructorName, constructorId
 *   },
 *   ...
 * ]
 */
export async function fetchDriverStandings() {
  const res = await fetch(STANDINGS_URL);

  if (!res.ok) {
    throw new Error(`Standings request failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  const standingsList = data?.MRData?.StandingsTable?.StandingsLists?.[0];

  if (!standingsList) {
    // No standings list yet usually means the season hasn't started /
    // no races have been completed. Treat as an empty (not broken) result.
    return { season: data?.MRData?.StandingsTable?.season ?? null, round: null, drivers: [] };
  }

  const drivers = (standingsList.DriverStandings ?? []).map((entry) => {
    const driver = entry.Driver ?? {};
    const constructor = entry.Constructors?.[0] ?? {};

    return {
      driverId: driver.driverId,
      position: Number(entry.position),
      points: Number(entry.points),
      wins: Number(entry.wins),
      code: driver.code ?? driver.familyName?.slice(0, 3).toUpperCase(),
      permanentNumber: driver.permanentNumber ?? null,
      givenName: driver.givenName ?? "",
      familyName: driver.familyName ?? "",
      nationality: driver.nationality ?? "",
      constructorId: constructor.constructorId ?? null,
      constructorName: constructor.name ?? "",
    };
  });

  return {
    season: standingsList.season,
    round: standingsList.round,
    drivers,
  };
}

/**
 * Fetches the current season's full race schedule and flags which rounds
 * are sprint weekends. Used to work out how many points a single driver
 * can still realistically score (races remaining, not the whole field's pool).
 *
 * Returns: [{ round, raceName, date, hasSprint }, ...]
 */
export async function fetchRaceSchedule() {
  const res = await fetch(SCHEDULE_URL);

  if (!res.ok) {
    throw new Error(`Schedule request failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const races = data?.MRData?.RaceTable?.Races ?? [];

  return races.map((race) => ({
    round: Number(race.round),
    raceName: race.raceName,
    date: race.date,
    hasSprint: Boolean(race.Sprint),
  }));
}
