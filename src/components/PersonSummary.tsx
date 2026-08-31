interface PersonSummaryProps {
  name: string;
  taskCount: number;
}
function PersonSummary(props: PersonSummaryProps) {
  return (
    <div className="person-summary">
      <p className="person-name">{props.name}</p>
      <p className="task-count">Tasks: {props.taskCount}</p>
    </div>
  );
}
export default PersonSummary;
