import React, {useEffect} from "react";

export default function Nearby(props) {

    useEffect(() => {
        props.setHeaderFade(false)
    }, [])

    return (
        <div className="pageContainer">
            <p>Nearby page</p>
        </div>
    )
}