interface SectionTitleProps{
    title : string
}
function SectionTitle(props : SectionTitleProps){
    return (
        <h1>{props.title}</h1>
    );

}
export default  SectionTitle
;