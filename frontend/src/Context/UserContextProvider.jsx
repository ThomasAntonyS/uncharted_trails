import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [userEmail, setUserEmail] = useState("")  
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn") === "true");
    const [wishList, setWishList] = useState([])
    const [booking, setBooking] = useState([])
    const [formOpen, setFormOpen] = useState(false)

    useEffect(() => {
        sessionStorage.setItem("userEmail", userEmail);
    }, [userEmail]);

    useEffect(() => {
        sessionStorage.setItem("loggedIn", loggedIn);
    }, [loggedIn]);

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail, loggedIn, setLoggedIn, wishList, setWishList,
            booking, setBooking, formOpen, setFormOpen
         }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
