import * as React from "react";
import "./Dropdown.css";
import {useEffect, useRef, useState} from "react";

export function Dropdown(props) {
    const [show, setShow] = useState(props.initialShow)
    const ref = useRef(null);
    const dropdownMenuClasses = ['dropdownMenu']

    if (props.menuRight) {
        dropdownMenuClasses.push('dropdownMenuRight')
    }

    if (show) {
        dropdownMenuClasses.push('show')
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    });


    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShow(false);
        }

        if (event.target.classList.contains('dropdownItem')) {
            setShow(false);
        }
    };

    return (
        <div className="dropdown" ref={ref} tabIndex={0}>
            <button type="button" className="headerNavLink dropdownToggle" onClick={() => setShow(prevState => !prevState)}>
                {props.label} {props.icon}
            </button>
            <div className={dropdownMenuClasses.join(' ')}>
                {props.children}
            </div>
        </div>
    )
}