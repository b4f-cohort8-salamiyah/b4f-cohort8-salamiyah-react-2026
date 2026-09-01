interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

export function PersonSummary(props: PersonSummaryProps) {
  return (
    <p className="par" >{props.name}: {props.taskCount} tasks</p>
  );
}