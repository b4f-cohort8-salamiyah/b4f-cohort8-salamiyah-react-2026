interface SectionTitleProps {
  title: string;
  subtitle: string;
}

function SectionTitle(props: SectionTitleProps) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
    </div>
  );
}

export default SectionTitle;
