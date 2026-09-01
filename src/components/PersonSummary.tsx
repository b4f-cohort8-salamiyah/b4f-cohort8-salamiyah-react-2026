interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary(props: PersonSummaryProps) {
  return (
    <p>
      {props.name} - {props.taskCount} tasks
    </p>
  );
}

export default PersonSummary;
