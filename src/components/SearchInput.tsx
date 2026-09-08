import type { ChangeEvent } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <section className="search">
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={value}
        onChange={handleSearchChange}
      />
    </section>
  );
}

export default SearchInput;
