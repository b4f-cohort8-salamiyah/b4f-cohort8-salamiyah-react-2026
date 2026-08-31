interface SectionTitleProps {
  title: string;
  subTitle: string;
}


function SectionTitle(props: SectionTitleProps) {

   
  return (
    <div className="section-title-card">
      <p className="section-tittle-title">{props.title}</p>
      <p className="section-subtitle-title">{props.subTitle}</p>
    </div>
  );
}

export default SectionTitle;

