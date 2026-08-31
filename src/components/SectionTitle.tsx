interface SectionTitleProps { 
    title: string;
}

function SectionTitle(props: SectionTitleProps) {
    return (
        <h2 className="section-title">{props.title}</h2>
    )
}
 
export default SectionTitle;