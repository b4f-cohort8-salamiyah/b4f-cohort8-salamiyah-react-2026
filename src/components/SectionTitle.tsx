interface SectionTitleProps {
  title: string;
  subtitle: string;
}

//create function to return section title
function SectionTitle(props: SectionTitleProps) {
  return <div className="section-title-subtitle">
    <p className="section-title">{props.title}</p>
    <p className="section-subtitle">{props.subtitle}</p>
  </div>
  ;
}

export default SectionTitle;
