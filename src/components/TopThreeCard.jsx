import ProgressBar from "./ProgressBar.jsx";

export default function TopThreeCard({ driver }) {
  const {
    position,
    givenName,
    familyName,
    code,
    constructorName,
    points,
    wins,
    progress,
    clinched,
    pointsStillNeeded,
  } = driver;

  return (
    <div className={`top-three-card top-three-card--p${position}`}>
      <div className="top-three-card__position">P{position}</div>

      <div className="top-three-card__driver">
        <span className="top-three-card__code">{code}</span>
        <span className="top-three-card__name">
          {givenName} {familyName}
        </span>
        <span className="top-three-card__team">{constructorName}</span>
      </div>

      <div className="top-three-card__stats">
        <div className="stat">
          <span className="stat__value">{points}</span>
          <span className="stat__label">points</span>
        </div>
        <div className="stat">
          <span className="stat__value">{wins}</span>
          <span className="stat__label">wins</span>
        </div>
      </div>

      <div className="top-three-card__progress">
        <ProgressBar progress={progress} clinched={clinched} />
        <span className="top-three-card__progress-caption">
          {clinched
            ? "Championship clinched"
            : `${pointsStillNeeded} pts to clinch mathematically`}
        </span>
      </div>
    </div>
  );
}
