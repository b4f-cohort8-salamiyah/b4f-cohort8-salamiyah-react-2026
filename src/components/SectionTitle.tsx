interface SectionTitleProps {
  title: string;
  subtitle: string;
}

function SectionTitle(props: SectionTitleProps) {
  return (
    <div className="section-title">
      <h4 className="section-title">{props.title}</h4>
      <p className="section-title">{props.subtitle}</p>
    </div>
  );
}

export default SectionTitle;
