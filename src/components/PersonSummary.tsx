interface PersonSummaryProps {
  id: number;
  name: string;
  taskCount: number;
  selectedUserId: number;
  onChangePerson: (id: number) => void;
}

function PersonSummary({
  id,
  name,
  taskCount,
  selectedUserId,
  onChangePerson,
}: PersonSummaryProps) {
  return (
    <button
      key={id}
      className={`filter-button ${selectedUserId === id ? "active" : ""}`}
      onClick={() => onChangePerson(id)}
    >
      {name} - {taskCount}
    </button>
  );
}

export default PersonSummary;
