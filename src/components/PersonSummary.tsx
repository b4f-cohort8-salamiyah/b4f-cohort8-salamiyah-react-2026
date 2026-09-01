/** @format */

interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary(props: PersonSummaryProps) {
  return (
    <div className="hw-person-line">
      <span >{props.name}</span>
      <span className="task-status" >
        {props.taskCount} Tasks
      </span>
    </div>
  );
}

export default PersonSummary;
