interface PersonSummaryProps {
  id: number;
  name: string;
  taskCount: number;
  selectedUserId: number;
  onUserChange: (id: number) => void;
}

<<<<<<< HEAD
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
=======
function PersonSummary({ name, taskCount }: PersonSummaryProps) {
  return (
    <p className="person-summary">
      {name} - {taskCount} tasks
    </p>
>>>>>>> 13b877388793c8e3f2f41f2acd69b3a8b48f33bd
  );
}

export default PersonSummary;
