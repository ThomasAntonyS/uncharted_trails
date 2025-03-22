import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [userName,setUserName] = useState(sessionStorage.getItem("userName") || "")
    const [userEmail, setUserEmail] = useState(sessionStorage.getItem("userEmail") || "");
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn") === "true");
    const [wishList, setWishList] = useState([])

    useEffect(() => {
        sessionStorage.setItem("userEmail", userEmail);
    }, [userEmail]);

    useEffect(() => {
        sessionStorage.setItem("loggedIn", loggedIn);
    }, [loggedIn]);

    useEffect(()=>{
        sessionStorage.setItem("userName",userName);
    },[userName])

    return (
        <UserContext.Provider value={{ userName, setUserName, userEmail, setUserEmail, loggedIn, setLoggedIn, wishList, setWishList }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
