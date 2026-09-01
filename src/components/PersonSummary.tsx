interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary(props: PersonSummaryProps) {
  return (
    <button className="filter-button">{props.name} - {props.taskCount}</button>
    // <p>
    //   {props.name} - {props.taskCount} tasks
    // </p>
  );
}

export default PersonSummary;
