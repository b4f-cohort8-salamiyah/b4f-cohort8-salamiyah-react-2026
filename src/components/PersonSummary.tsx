interface person {
  name: string;
  taskCount: number;
}

function PersonSummary(props: person) {
  return (
    <div className="person-data">
      <span >{props.name}</span>
      <span >{props.taskCount}</span>
    </div>
  );
}

export default PersonSummary;
