interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

// function return the name and task count
// in the same line

function PersonSummary(props: PersonSummaryProps) {
  return (
    <div className="span-person-summary">
      <span>{props.name}</span>
      <span>{props.taskCount}</span>
    </div>
  );
}

export default PersonSummary;
