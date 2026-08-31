interface SectionTitle {
  title: string;
  subtitle: string;
}

function SectionTitle(props: SectionTitle) {
    return (
      <section className="section-title">
        <h3 className="sectionTitle">
          {props.title}
          <span>{props.subtitle}</span>
        </h3>
      </section>
    );
}

export default SectionTitle;
