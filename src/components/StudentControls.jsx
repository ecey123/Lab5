export default function StudentControls({
  filter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  sortDir,
  onToggleSort,
}) {
  return (
    <div className="controls">
      <div className="filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          type="button"
          onClick={() => onFilterChange("all")}
        >
          all
        </button>

        <button
          className={`filter-btn ${filter === "pass" ? "active" : ""}`}
          type="button"
          onClick={() => onFilterChange("pass")}
        >
          pass
        </button>

        <button
          className={`filter-btn ${filter === "fail" ? "active" : ""}`}
          type="button"
          onClick={() => onFilterChange("fail")}
        >
          fail
        </button>
      </div>

      <input
        className="input search"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button className="btn sort-btn" type="button" onClick={onToggleSort}>
        {sortDir === "desc" ? "Sort: High → Low" : "Sort: Low → High"}
      </button>
    </div>
  );
}
