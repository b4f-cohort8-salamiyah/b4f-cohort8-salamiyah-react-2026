interface SectionTitleProps {
  title: string;
}

function SectionTitle(props: SectionTitleProps) {
  return (
    
        <h4 className="section-title">{props.title}</h4>
  );
}

export default SectionTitle;
