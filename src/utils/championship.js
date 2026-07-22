// Current (2025+) F1 scoring: no fastest-lap bonus point.
// Race: 25-18-15-12-10-8-6-4-2-1 (win = 25)
// Sprint: 8-7-6-5-4-3-2-1 (win = 8)
export const POINTS_PER_WIN = 25;
export const POINTS_PER_SPRINT_WIN = 8;

/**
 * The maximum points ONE driver can still score is bounded by how many
 * races (and sprints) are actually left on the calendar — not by dividing
 * up a season-wide points pool across the whole field.
 *
 * `schedule` is the full-season race list (from fetchRaceSchedule), each
 * with { round, hasSprint }. `completedThroughRound` is the last round the
 * standings response has already counted (StandingsList.round) — rounds
 * after that are still "remaining".
 */
export function getMaxRemainingPoints(schedule, completedThroughRound) {
  if (!schedule?.length) return 0;

  const completed = Number(completedThroughRound) || 0;
  const remainingRaces = schedule.filter((race) => race.round > completed);
  const remainingSprints = remainingRaces.filter((race) => race.hasSprint);

  return (
    remainingRaces.length * POINTS_PER_WIN +
    remainingSprints.length * POINTS_PER_SPRINT_WIN
  );
}

/**
 * For every driver, works out:
 *  - maxPossiblePoints: driver's current points + max points they could
 *    still score across the remaining races/sprints
 *  - rivalMaxPossible: the highest maxPossiblePoints among every OTHER driver
 *  - pointsToLock: rivalMaxPossible + 1 (points this driver needs to be
 *    mathematically uncatchable)
 *  - pointsStillNeeded: pointsToLock - current points (floored at 0)
 *  - progress: current points as a % of pointsToLock (0-100, capped)
 *  - clinched: true once points > every other driver's maxPossiblePoints
 *
 * Formula:
 *   Driver clinches when: driver's points > max possible points of every other driver
 *   Points needed to lock title = highest possible points of closest rival + 1
 *   Points still needed = points needed to lock title - driver's current points
 *
 * `maxRemainingPoints` is the same figure for every driver (it's a function
 * of the calendar, not of who's racing) — get it from getMaxRemainingPoints().
 */
export function calculateChampionshipData(drivers, maxRemainingPoints) {
  if (!drivers?.length) return [];

  const withMaxPossible = drivers.map((d) => ({
    ...d,
    maxRemainingPoints,
    maxPossiblePoints: d.points + maxRemainingPoints,
  }));

  return withMaxPossible.map((driver) => {
    const rivalMaxPossible = Math.max(
      0,
      ...withMaxPossible
        .filter((d) => d.driverId !== driver.driverId)
        .map((d) => d.maxPossiblePoints)
    );

    const pointsToLock = rivalMaxPossible + 1;
    const pointsStillNeeded = Math.max(pointsToLock - driver.points, 0);
    const progress = pointsToLock > 0
      ? Math.min((driver.points / pointsToLock) * 100, 100)
      : 100;
    const clinched = driver.points > rivalMaxPossible;

    return {
      ...driver,
      rivalMaxPossible,
      pointsToLock,
      pointsStillNeeded,
      progress,
      clinched,
    };
  });
}
