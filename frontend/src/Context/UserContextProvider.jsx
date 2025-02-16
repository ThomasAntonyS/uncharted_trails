import { useState, createContext } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail, loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
