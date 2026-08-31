interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary(props: PersonSummaryProps) {
  const taskWord = props.taskCount === 1 ? "task" : "tasks";

  return (
    <div className="person-summary">
      <span className="person-summary-label">Person Summary</span>
      <p>
        <strong>{props.name}</strong> has {props.taskCount} {taskWord}
      </p>
    </div>
  );
}

export default PersonSummary;
