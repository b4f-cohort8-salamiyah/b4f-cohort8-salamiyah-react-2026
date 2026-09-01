interface TitleProps {
  title: string;
  subtitle: string;
}
export default function SectionTitle(props: TitleProps) {
  return (
    <section className="section-title">
      <h2 className="title">{props.title}</h2>
      <p className="subtitle">{props.subtitle}</p>
    </section>
  );
}
