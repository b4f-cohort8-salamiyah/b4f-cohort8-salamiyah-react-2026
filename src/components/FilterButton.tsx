interface FilterButtonProp {
  label: string;
  status: string;
}

export default function FilterButton(prop: FilterButtonProp) {
  return (
    <button className={`filter-button ${prop.status}`}>{prop.label}</button>
  );
}
