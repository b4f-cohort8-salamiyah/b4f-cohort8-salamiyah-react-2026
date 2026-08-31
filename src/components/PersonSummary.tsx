interface PeopleProps {
    name: string;
    taskCount: number
}

function PrePeopleTask(props: PeopleProps) {
    return (
        <p className="people-summary">{props.name} - {props.taskCount}</p>
    )
}

export default PrePeopleTask;