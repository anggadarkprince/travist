import React from "react";

export const authDefaultValue = {
    accessToken: null,
    refreshToken: null,
    user: null,
};

const authMethodData = {
    ...authDefaultValue,
    setShowRegister: () => {},
    setShowLogin: () => {},
    handleLogout: () => {},
}

export default React.createContext(authMethodData);