interface SectionTitleProps {
  title: string;
  subtitle:string;
}
export function SectionTitle(props: SectionTitleProps) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.subtitle}</p>
    </div>
  );
}