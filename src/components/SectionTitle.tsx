interface sectionTitleProps {
  title: string;
}
function sectionTitle(props:sectionTitleProps){
    return(
        <h1 className="sectionTitle">{props.title}</h1>
    );
}
export default sectionTitle;