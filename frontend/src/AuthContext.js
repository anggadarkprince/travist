import React from "react";

export const authDefaultValue = {
    accessToken: null,
    refreshToken: null,
    user: null,
};

export default React.createContext(authDefaultValue);