
interface SectionTitleProps{
  title: string;
  subtitle: string;
}

function SectionTitle(props: SectionTitleProps) {
  return (
    <div>
      <h2 className="task-title" style={{ marginTop: "10px" }}>
        {props.title}
      </h2>
      <p className="task-title" style={{ marginTop: "10px", fontSize:"20px" }} >
        {props.subtitle}
      </p>
    </div>
  );
}
export default SectionTitle;