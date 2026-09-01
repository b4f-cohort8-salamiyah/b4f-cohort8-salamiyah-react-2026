interface PersonSummaryProps {
    name: string;
    taskCount: number;
}
function PersonSummary(props: PersonSummaryProps) {
return (
  <div className="persons">
    <p className="person-name">{props.name} - {props.taskCount} tasks</p>
  </div>
);
}
export default PersonSummary;