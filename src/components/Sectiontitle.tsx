interface SectionTitleProps{
title:string;
subTitle:string;
}

function sectiontitle(props:SectionTitleProps){
return(
<div>
    <h2 className="h22 ">{props.title}</h2>
    <p className="pp">{props.subTitle}</p>
</div>

);
}
export default sectiontitle;