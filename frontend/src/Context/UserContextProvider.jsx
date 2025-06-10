import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(() => sessionStorage.getItem("userEmail") || "");
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn") === "true");
    const [wishList, setWishList] = useState([]);
    const [booking, setBooking] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [alertBox, setAlertBox] = useState({
        isOpen: false,
        message: "", 
        isError: false
    });

    useEffect(() => {
        sessionStorage.setItem("userEmail", userEmail);
        sessionStorage.setItem("loggedIn", loggedIn);
    }, [userEmail, loggedIn]);

    return (
        <UserContext.Provider value={{
            userEmail, setUserEmail,
            loggedIn, setLoggedIn,
            wishList, setWishList,
            booking, setBooking,
            selectedBooking, setSelectedBooking,
            formOpen, setFormOpen,
            alertBox, setAlertBox
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;