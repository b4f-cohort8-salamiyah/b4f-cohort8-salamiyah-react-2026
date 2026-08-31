interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary(props: PersonSummaryProps) {
  return (
    <p className="person-summary">
      {props.name} - {props.taskCount}
    </p>
  );
}

export default PersonSummary;
