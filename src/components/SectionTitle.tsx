interface SectionTitleProps {
  title: string;
  subtitle :string;
}

function SectionTitle(props: SectionTitleProps) {
    return (
      <section className="section-heading">
        <h2 className="section-title">{props.title}</h2>
        <p className="section-subtitle">{props.subtitle}</p>
      </section>
    );
}
 
export default SectionTitle;