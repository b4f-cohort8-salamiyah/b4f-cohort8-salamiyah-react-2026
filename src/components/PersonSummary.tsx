
interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary(prop: PersonSummaryProps) {
  return (
    <div className="task-item">
      {prop.name} has {prop.taskCount} tasks
    </div>
  );
}

export default PersonSummary;
