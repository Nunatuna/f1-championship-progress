# 🏁 F1 Progress

**F1 Progress** is an independent, fan-made Formula 1 championship tracker that visualizes how close each driver is to mathematically securing the World Drivers' Championship.

Instead of only displaying the current standings, F1 Progress answers the question:

> **"How far is each driver from becoming World Champion?"**

Each driver's progress is shown as a visual progress bar based on the maximum number of points their closest rival can still achieve.

> This is an unofficial fan project and is **not affiliated with Formula 1®, FIA, or any Formula 1 team**.

---

## Features

- Live Formula 1 Driver Championship standings
- Progress bars showing championship-clinching progress
- Automatic championship calculations based on the remaining race calendar
- No manual updates required as races are completed
- Responsive design
- Built with React + TypeScript + Vite

---

## Screenshots

*(Coming soon)*

---

# Championship Mathematics

The goal is **not** to predict who will become champion.

Instead, the app calculates **how close every driver is to mathematically securing the title.**

The important thing to understand is:

> **A single driver can only score the points available to one driver, not the combined remaining points available to the entire grid.**

Because of this, the app calculates the maximum number of points **one driver** can still score.

```text
Max Remaining Points =
(Remaining Grand Prix × 25)
+
(Remaining Sprint Races × 8)
```

(Fastest lap points are intentionally excluded, as they were removed from Formula 1 beginning with the 2025 season.)

The remaining calendar is fetched directly from the API, meaning the calculation automatically adapts if races or sprint weekends are added, removed, or rescheduled.

For every driver, the app performs the following calculations:

1. **Maximum possible points**

   ```text
   current points + maximum remaining points
   ```

2. **Rival's best possible finish**

   The highest maximum score among every other driver.

3. **Championship lock threshold**

   ```text
   rival max + 1
   ```

4. **Points still required**

   ```text
   championship lock threshold − current points
   ```

5. **Progress**

   ```text
   current points / championship lock threshold
   ```

   capped at **100%**.

6. **Clinched**

   Once:

   ```text
   current points > rival's best possible finish
   ```

This calculation is performed **for every driver**, allowing every driver card to display that driver's individual progress toward mathematically securing the championship.

---

# Data Source

The project uses the excellent **Jolpica F1 API**.

Current driver standings:

```
https://api.jolpi.ca/ergast/f1/current/driverstandings.json
```

Current race schedule:

```
https://api.jolpi.ca/ergast/f1/current/races.json
```

No API key is required.

---

# Tech Stack

- React
- TypeScript
- Vite
- CSS
- Jolpica F1 API

---

# Disclaimer

F1 Progress is an independent fan-made project.

It is **not affiliated with, endorsed by, or connected to Formula 1®, FIA, or any Formula 1 team.**

Championship data is provided by the **Jolpica F1 API**, which is licensed under the Apache License 2.0.

---

## License

This project is licensed under the MIT License.

API software is provided separately under the Apache License 2.0 by the Jolpica project.
