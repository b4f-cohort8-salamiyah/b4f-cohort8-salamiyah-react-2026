interface SectionTitleProps {
  title: string;
  subtitle: string;
}

function SectionTitle(props: SectionTitleProps) {
  return (
<<<<<<< HEAD
    <div>
      <h2 className="section-title">{props.title}</h2>
      <p style={{ color: "gray", display: "flex", justifyContent: "center" }}>
        {props.subtitle}
      </p>
=======
    <div className="section-title">
      <h2>{props.title}</h2>
      <p>{props.subtitle}</p>
>>>>>>> group-2
    </div>
  );
}

export default SectionTitle;
