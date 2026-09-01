interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

export function PersonSummary(props: PersonSummaryProps) {
  return (
    <div>
      <strong>{props.name}</strong> has {props.taskCount} tasks.
    </div>
  );
}
