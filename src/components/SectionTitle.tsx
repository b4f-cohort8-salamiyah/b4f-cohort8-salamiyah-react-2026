interface TitleProps {
  title: string;
  subtitle: string;
}

function SectionTitle(props: TitleProps) {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{props.title}</h1>
      <p style={{ textAlign: "center" }}>{props.subtitle}</p>
    </div>
  );
}

export default SectionTitle;
