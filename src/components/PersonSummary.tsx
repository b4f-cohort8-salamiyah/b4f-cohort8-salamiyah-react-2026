interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary(props: PersonSummaryProps) {
  return (
    <p className="person-summary">
      {props.name}: {props.taskCount} tasks
    </p>
  );
}

export default PersonSummary;
