interface SectionTitleProps {
    title: string;
    subtitle: string;
}
function SectionTitle(props: SectionTitleProps) {
    return (
        <div>
        <h2>{props.title}</h2>
        <p>{props.subtitle}</p>  
        </div>

    );
    
}
export default SectionTitle;
