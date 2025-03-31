import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [userData, setUserData] = useState(() => {
        const storedUser = sessionStorage.getItem("userName");
        return storedUser ? JSON.parse(storedUser) : {
            username: "N/A",
            email_id: "N/A",
            phone_number: "N/A",
            home_airport: "N/A",
            street_address: "N/A",
            city: "N/A",
            postal_code: "N/A",
            region: "N/A",
            country: "N/A",
            joined_at: new Date().getFullYear() // Only store the year
        };
    });  
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn") === "true");
    const [wishList, setWishList] = useState([])
    const [booking, setBooking] = useState([])
    const [formOpen, setFormOpen] = useState(false)

    useEffect(() => {
        sessionStorage.setItem("userData", userData);
    }, [userData]);

    useEffect(() => {
        sessionStorage.setItem("loggedIn", loggedIn);
    }, [loggedIn]);

    return (
        <UserContext.Provider value={{ userData, setUserData, loggedIn, setLoggedIn, wishList, setWishList,
            booking, setBooking, formOpen, setFormOpen
         }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
