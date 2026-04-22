export interface ITopNavigationItem {
  name: string;
  onClick: () => void;
}

function initials(name?: string) {
  if (!name) return "·";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] + parts[parts.length - 1][0]).slice(0, 2);
}

export function TopNavigation({
  items,
  user,
  onBrandClick,
}: {
  items: ITopNavigationItem[];
  user?: string;
  onBrandClick?: () => void;
}) {
  return (
    <header className="topbar">
      <div className="left">
        <button className="brand" onClick={onBrandClick} aria-label="sgreg0r">
          sgreg<span className="zero">0</span>r
        </button>
      </div>

      <div className="center-meta" />

      <div className="right">
        {user && (
          <span className="user-chip" title="Signed in">
            <span className="avatar">{initials(user)}</span>
            <span className="uname">{user.toLowerCase()}</span>
          </span>
        )}
        {items.map((item, i) => (
          <button
            key={item.name + i}
            onClick={item.onClick}
            className="ghost-btn"
          >
            {item.name}
          </button>
        ))}
      </div>
    </header>
  );
}
