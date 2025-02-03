'use client'

import { useState, createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    let usuario = null;
    if(typeof window != "undefined" && localStorage.getItem('user')){
        usuario = JSON.parse(localStorage.getItem('user'));
    }

    const [user, setUser] = useState(usuario);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
};


export default UserContext