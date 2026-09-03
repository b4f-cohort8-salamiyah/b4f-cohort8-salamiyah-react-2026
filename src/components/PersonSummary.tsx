interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary({ name, taskCount }: PersonSummaryProps) {
  return (
    <div className="person-summary-card">
      {name} - {taskCount} tasks
    </div>
  );
}

export default PersonSummary;
