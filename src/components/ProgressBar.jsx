export default function ProgressBar({ progress = 0, clinched = false }) {
  const clamped = Math.max(0, Math.min(progress, 100));

  return (
    <div className={`progress-bar ${clinched ? "progress-bar--clinched" : ""}`}>
      <div
        className="progress-bar__fill"
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      <span className="progress-bar__label">{clamped.toFixed(1)}%</span>
    </div>
  );
}
