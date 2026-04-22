export interface ITopNavigationItem {
  name: string;
  onClick: () => void;
}

export function TopNavigation({ items, user }: { items: ITopNavigationItem[]; user?: string }) {
  return (
    <nav className="flex items-center justify-between px-5" style={{ height: "52px" }}>
      <span
        className="select-none cursor-default"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "1.125rem", letterSpacing: "-0.03em", color: "var(--text)" }}
      >
        sgreg
        <span style={{
          background: "linear-gradient(135deg, #f472b6 0%, #a78bfa 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>0r</span>
      </span>
      <div className="flex items-center gap-3">
        {user && (
          <span style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
            fontSize: "0.6875rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-3)",
          }}>
            {user}
          </span>
        )}
        {items.map((item, i) => (
          <button
            key={item.name + i}
            onClick={item.onClick}
            className="nav-btn"
          >
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
