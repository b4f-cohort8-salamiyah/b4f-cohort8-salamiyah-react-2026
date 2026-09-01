interface SectionTitleProps {
  title: string;
  subtitle: string;
}


function SectionTitle(props: SectionTitleProps) {
    return (
      <div
        style={{ color: "#3b6ef5", textAlign: "center", paddingTop: "20px" }}>
        <h2>{props.title}</h2>
        <p>{props.subtitle}</p>
      </div>
    );
}

export default SectionTitle;