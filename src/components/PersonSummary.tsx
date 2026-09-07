interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary({ name, taskCount }: PersonSummaryProps) {
  return (
    <p className="person-summary">
      {name} - {taskCount} tasks
    </p>
  );
}

export default PersonSummary;
