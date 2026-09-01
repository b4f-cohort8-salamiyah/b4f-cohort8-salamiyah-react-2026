interface SectionTitleProps {
    title: string;
    subTitle: string;
}

function SectionTitle(props: SectionTitleProps){
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.subTitle}</p>
        </div>
    );
}


export default SectionTitle;