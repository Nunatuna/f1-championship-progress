export default function NavBar({ page, onNavigate }) {
  return (
    <nav className="nav-bar">
      <button
        type="button"
        className={`nav-bar__link ${page === "standings" ? "nav-bar__link--active" : ""}`}
        onClick={() => onNavigate("standings")}
      >
        Standings
      </button>
      <button
        type="button"
        className={`nav-bar__link ${page === "about" ? "nav-bar__link--active" : ""}`}
        onClick={() => onNavigate("about")}
      >
        About the Math
      </button>
    </nav>
  );
}
