interface SectionTitleProps {
  title: string;
}

function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
  );
}
export default SectionTitle;