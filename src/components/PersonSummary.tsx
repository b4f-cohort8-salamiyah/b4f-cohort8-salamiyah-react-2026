interface PersonSummaryProps {
  name: string;
  taskcount: number;
}
function PersonSummary(props: PersonSummaryProps) {
  return (
    <li className="personlist-summary">
      <span className="person-name">{props.name}</span>
      <span className="person-taskcount">{props.taskcount} tasks</span>
    </li>
  );
};
export default PersonSummary;