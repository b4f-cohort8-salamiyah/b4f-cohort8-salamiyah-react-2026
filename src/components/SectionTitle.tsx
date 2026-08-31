interface SectionTitleProps {
  title: string;
  subtitle: string;
}
function SectionTitle(props: SectionTitleProps) {
  return (
    <div>
      <h1 className="section-title">{props.title}</h1>
      <p className="section-subtitle">{props.subtitle}</p>
    </div>
  );
}
export default SectionTitle;
