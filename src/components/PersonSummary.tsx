interface PersonSummaryProps {
    name: string;
    taskCount: number;
}

function PersonSummary(props: PersonSummaryProps) { 
    return (
        <section className="person-summary">
            <h3>{props.name}</h3>
            <p>Tasks: {props.taskCount}</p>
        </section>
    );
}

export default PersonSummary;