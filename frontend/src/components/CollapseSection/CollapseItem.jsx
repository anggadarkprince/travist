import React from "react";

export default function CollapseItem(props) {
    return (
        <>
            <h4 className="aboutSectionCardTitle" onClick={props.onTitleClicked}>{props.title}</h4>
            <div className="aboutSectionCardDescription">{props.children}</div>
        </>
    )
}