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
  onReset: () => void;
}

function Controls({
  currentFilter,
  onFilterChange,
  searchText,
  onSearchChange,
  visibleCount,
  totalCount,
  onReset,
}: ControlsProps) {
  return (
    <>
      <FilterButtons currentFilter={currentFilter} onChange={onFilterChange} />
      <SearchInput value={searchText} onChange={onSearchChange} />
      <p className="visible-count">
        {visibleCount} of {totalCount} tasks shown
      </p>
      <button className="reset-button" onClick={onReset}>
        Reset
      </button>
    </>
  );
}

export default Controls;
