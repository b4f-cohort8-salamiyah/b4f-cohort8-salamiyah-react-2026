interface PersonSummaryProps {
    name: string;
    taskCount: number;
}
function PersonSummary(props: PersonSummaryProps) {
return (
  <div className="persons">
    <p className="person-name">{props.name}</p>
    <p className="task-count">{props.taskCount}</p>
  </div>
);
}
export default PersonSummary;