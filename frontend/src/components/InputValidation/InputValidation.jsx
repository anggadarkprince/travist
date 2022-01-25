import * as React from "react";
import "./InputValidation.css";

export function InputValidation({inputName, errorMessages}) {
    if (errorMessages && errorMessages.length) {
        if (errorMessages.length > 1) {
            return (
                <ul className="input-validation">
                    {errorMessages.map((error, index) => <li key={`error-${inputName}-${index}`}>{error}</li>)}
                </ul>
            )
        }

        return <p className="input-validation">{errorMessages[0]}</p>
    }
    return null
}