interface personSummrayProps {
  taskCount: number;
  name: string;
}
function personSummray(props: personSummrayProps) {
  return (
    <div style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}>
      <strong>{props.name}</strong> has {props.taskCount} tasks.
    </div>
  );
}
export default personSummray;

interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary(props: PersonSummaryProps) {
  return (
    <p className="person-summary">
      {props.name} - {props.taskCount} tasks
    </p>
  );
}

export default PersonSummary;
