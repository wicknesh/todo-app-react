import { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if(user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        } else {
            sessionStorage.removeItem("user");
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser}}>
            { children }
        </UserContext.Provider>
    )
}