interface TitleProps{
    title : string;
    subtitle :string
}

function SectionTitle(props: TitleProps)
{
    
    return (
        <div className="section-title">
            <h2>{props.title}</h2>
            <p>{props.subtitle}</p>
        </div>
    );
}

export default SectionTitle;