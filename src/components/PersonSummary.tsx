interface PersonSummaryProps{
    name: string,
    taskCount: number,

}
function PersonSummary(props: PersonSummaryProps) {
    return (

      <div className="stat-card">
        <p className="task-title">{props.name}</p>
        <p className="stat-value">{props.taskCount}</p>
      </div>
    );
}
export default PersonSummary