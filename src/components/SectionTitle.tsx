interface sectionTitleString {
  title: string;
  subtitle: string;
}

function SectionTitle(prop: sectionTitleString) {
  return (
    <h1 className="section-title">
      {prop.title}
      <h6 className="section-subtitle">{prop.subtitle}</h6>
    </h1>
  );
}

export default SectionTitle;
