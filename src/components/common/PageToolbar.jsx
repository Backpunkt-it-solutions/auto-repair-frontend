export default function PageToolbar({
  search,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions = [],
  rightAction,
}) {
  return (
    <div className="card" style={{ marginBottom: 18, padding: 14 }}>
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          style={{ flex: 1, minWidth: 260 }}
        />

        {filterOptions.length ? (
          <select
            value={filterValue}
            onChange={(e) => onFilterChange?.(e.target.value)}
            style={{ minWidth: 180 }}
          >
            {filterOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                style={{ color: "black" }}
              >
                {option.label}
              </option>
            ))}
          </select>
        ) : null}

        {rightAction}
      </div>
    </div>
  );
}
