interface sectionTitleProps {
  title: string;
  subtitle: string;
}
function SectionTitle(props:sectionTitleProps){
    return(
        <div><h1 className="sectionTitle">{props.title}</h1>
        <p>{props.subtitle}</p></div>
        
    );
}
export default SectionTitle;