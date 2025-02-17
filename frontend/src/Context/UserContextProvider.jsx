import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");

    useEffect(() => {
        localStorage.setItem("userEmail", userEmail);
    }, [userEmail]);

    useEffect(() => {
        localStorage.setItem("loggedIn", loggedIn);
    }, [loggedIn]);

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail, loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
