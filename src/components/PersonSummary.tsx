interface PersonSummary {
  name: string;
  taskCount: number;
}

export default function PersonSummary(props: PersonSummary) {
  return (
    <div className="summary-countiner">
      <p className="person-summary">
        {props.name} : {props.taskCount}
      </p>
    </div>
  );
}
