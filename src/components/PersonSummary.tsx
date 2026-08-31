
interface PersonSummaryProps {
  name: string;
  taskCount: number;
}
function PersonSummary(props: PersonSummaryProps) {
  return (
    <p className="person-summary">
      {props.name} has {props.taskCount} task{props.taskCount !== 1 ? 's' : ''}
    </p>
  );
}

export default PersonSummary;