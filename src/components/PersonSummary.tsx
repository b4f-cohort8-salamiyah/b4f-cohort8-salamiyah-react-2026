
interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary(props: PersonSummaryProps) {
  return (
    <div>
      {props.name} has {props.taskCount} tasks
    </div>
  );
}

export default PersonSummary;
