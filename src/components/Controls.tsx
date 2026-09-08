import type { FilterStatus } from "../types";
import FilterButtons from "./FilterButtons";
import SearchInput from "./SearchInput";

interface ControlsProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  searchText: string;
  onSearchChange: (value: string) => void;
  visibleCount: number;
  totalCount: number;
<<<<<<< HEAD
=======
  onReset: () => void;
>>>>>>> origin/group-1
}

function Controls({
  currentFilter,
  onFilterChange,
  searchText,
  onSearchChange,
  visibleCount,
  totalCount,
<<<<<<< HEAD
=======
  onReset,
>>>>>>> origin/group-1
}: ControlsProps) {
  return (
    <>
      <FilterButtons currentFilter={currentFilter} onChange={onFilterChange} />
      <SearchInput value={searchText} onChange={onSearchChange} />
      <p className="visible-count">
        {visibleCount} of {totalCount} tasks shown
      </p>
<<<<<<< HEAD
=======
      <button className="reset-button" onClick={onReset}>
        Reset
      </button>
>>>>>>> origin/group-1
    </>
  );
}

export default Controls;
