interface PersonSummaryProps{
    name : string;
    taskCount : number;
}

function PersonSummary (props : PersonSummaryProps){
    return (
        <p className="person-summary">{props.name} has {props.taskCount} tasks</p>
    );
}

export default PersonSummary;