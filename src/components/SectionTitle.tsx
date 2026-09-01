interface SectionTitleProps {
  title: string;
  subtitle: string;
}
function SectionTitle(props : SectionTitleProps) {
  return (
    <div>
    <p className="section-title">{props.title}</p>
    <p className="section-sub-title">{props.subtitle}</p>
    </div>
  );
}
export default SectionTitle;