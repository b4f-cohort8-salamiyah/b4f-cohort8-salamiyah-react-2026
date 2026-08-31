interface SectionTitleProps {
  title: string;
  subtitle: string;
}

function SectionTitle(props: SectionTitleProps) {
  return (
    <div>
      <h2 className="section-title">{props.title}</h2>
      <p style={{ color: "gray", display: "flex", justifyContent: "center" }}>
        {props.subtitle}
      </p>
    </div>
  );
}

export default SectionTitle;
