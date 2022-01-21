import React, {useEffect} from "react";
import PageLayout from "../../layouts/PageLayout";

export default function Nearby(props) {

    useEffect(() => {
        document.title = "Nearby location and pins - Travist"
    }, [])

    return (
        <PageLayout>
            <p>Nearby page</p>
        </PageLayout>
    )
}