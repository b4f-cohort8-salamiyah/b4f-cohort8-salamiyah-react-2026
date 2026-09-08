interface PersonSummaryProps {
  id: number;
  name: string;
  taskCount: number;
  selectedUserId: number;
  onUserChange: (id: number) => void;
}

function PersonSummary({
  id,
  name,
  taskCount,
  selectedUserId,
  onUserChange,
}: PersonSummaryProps) {
  return (
    <>
      <button
        className={`filter-button ${selectedUserId === id ? "active" : ""}`}
        onClick={() => onUserChange(id)}
      >
        {name} - ({taskCount})
      </button>
    </>
  );
}

export default PersonSummary;
