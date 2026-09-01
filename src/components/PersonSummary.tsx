interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary(props: PersonSummaryProps) {
  return (
    <div className="person-summary">
      <p>{props.name} has {props.taskCount} tasks.</p>
    </div>
  );
}

export default PersonSummary;
