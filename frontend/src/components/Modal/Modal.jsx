import * as React from "react";
import "./Modal.css";
import CloseIcon from "@mui/icons-material/Close";
import {useEffect, useState} from "react";

export function Modal(props) {
    const [show, setShow] = useState(props.show)

    useEffect(() => {
        if (props.show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.removeAttribute('style');
        }
        setShow(props.show);
    }, [props.show])

    return (
        <div className={`modal${show ? ' show' : ''}`}>
            <div className="modalContent" style={{...props.modalStyle}}>
                {props.children}

                <CloseIcon
                    className="modalClose"
                    onClick={() => {
                        if (props.onCloseCallback) {
                            props.onCloseCallback()
                        } else {
                            setShow(false)
                            document.body.removeAttribute('style')
                        }
                    }}
                />
            </div>
        </div>
    )
}