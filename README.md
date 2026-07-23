## The math

The key thing to get right here: **a single driver can only score their own
share of the remaining races** — not the whole field's combined remaining
points pool. So instead of a fixed season-total constant, `getMaxRemainingPoints()`
in `src/utils/championship.js` pulls the actual remaining calendar from the
API (`fetchRaceSchedule()`) and calculates:

```
maxRemainingPoints = (remaining races × 25)   // race win, no fastest-lap bonus (removed 2025+)
                    + (remaining sprints × 8) // sprint win
```

"Remaining" is anything with a round number after the round the standings
response has already counted. This self-corrects if races get added, dropped,
or rescheduled mid-season — no constant to manually update.

Then for every driver:

1. **Max possible points** = `driver's current points + maxRemainingPoints`
2. **Rival's best case** = the highest "max possible points" among every
   *other* driver
3. **Points needed to lock the title** = `rival's best case + 1`
4. **Points still needed** = `points needed to lock - driver's current points`
5. **Progress %** = `current points / points needed to lock`, capped at 100%
6. **Clinched** = `true` once `current points > rival's best case`

This is computed for every driver (not just P1), so each of the top 3 cards
shows that driver's own progress toward locking the title against the best
case of everyone else in the field.

## Customizing

- All colors/spacing live as CSS variables at the top of `App.css` — that's
  the only styling in here, meant purely as a scaffold for you to restyle.
- `TopThreeCard.jsx` and `DriverRow.jsx` are intentionally plain markup so you
  can restructure freely without fighting existing styles.

## Notes on the API

- `https://api.jolpi.ca/ergast/f1/current/driverstandings.json` returns the
  *current* season's standings. Before the season starts or between data
  updates it may return an empty standings list — the app handles that
  case rather than crashing.
- No API key is required.
