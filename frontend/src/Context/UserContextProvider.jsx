import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [wishList, setWishList] = useState([]);
    const [booking, setBooking] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [alertBox, setAlertBox] = useState({
        isOpen: false,
        message: "", 
        isError: false
    });

    return (
        <UserContext.Provider value={{
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