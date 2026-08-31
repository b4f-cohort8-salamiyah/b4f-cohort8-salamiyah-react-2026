interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary(props: PersonSummaryProps) {
  return (
    <p style={{marginTop:"10px",paddingLeft:"10px",
    backgroundColor:"white",borderRadius:"5px"}}>
      {props.name} has {props.taskCount} task</p>
  );
}


export default PersonSummary;