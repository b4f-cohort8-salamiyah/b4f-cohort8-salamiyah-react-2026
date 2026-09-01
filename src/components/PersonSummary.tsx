interface PersonProps {
taskCount: number;
name: string;
}

function PersonSummary(props: PersonProps) {
    return (
        <p>{props.name} has {props.taskCount} tasks.</p>
    );

}

export default PersonSummary;