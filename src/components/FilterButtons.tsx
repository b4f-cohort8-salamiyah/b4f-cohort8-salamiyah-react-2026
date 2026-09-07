import { FilterStatus } from "../types";

interface FilterButtonsProps {
  currentFilter: FilterStatus;
  onChange: (filter: FilterStatus) => void;
}

function FilterButtons({ currentFilter, onChange }: FilterButtonsProps) {
  return (
    <section className="filters">
      <button
        className={"filter-button" + (currentFilter === "all" ? " active" : "")}
        onClick={() => onChange("all")}
      >
        All
      </button>
      <button
        className={
          "filter-button" + (currentFilter === "completed" ? " active" : "")
        }
        onClick={() => onChange("completed")}
      >
        Completed
      </button>
      <button
        className={
          "filter-button" + (currentFilter === "pending" ? " active" : "")
        }
        onClick={() => onChange("pending")}
      >
        Pending
      </button>
    </section>
  );
}

export default FilterButtons;
