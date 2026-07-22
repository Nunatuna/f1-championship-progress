export default function DriverRow({ driver }) {
  const { position, givenName, familyName, code, constructorName, points, wins } = driver;

  return (
    <div className="driver-row">
      <span className="driver-row__position">{position}</span>
      <span className="driver-row__code">{code}</span>
      <span className="driver-row__name">
        {givenName} {familyName}
      </span>
      <span className="driver-row__team">{constructorName}</span>
      <span className="driver-row__wins">{wins}</span>
      <span className="driver-row__points">{points}</span>
    </div>
  );
}
