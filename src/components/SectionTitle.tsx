
interface SectionTitleProps{
    title: string;
}

function SectionTitle(props: SectionTitleProps) {
    return (
      <h2 className="task-title" style={{ margin: "20px" }}>
        {props.title}
      </h2>
    );
}
export default SectionTitle