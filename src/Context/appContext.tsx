'use client';
import React, { createContext, useState, Dispatch, SetStateAction, useEffect } from "react";

interface AppContextType{
    isLoggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
    ukey:string|null,
    SetUkey:Dispatch<SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextType>({
    isLoggedIn: false,
    setLoggedIn: (): boolean => false,
    ukey:null,
    SetUkey: (): null => null,
});

const AppProvider = ({ children }: { children: any }) => {
    const [ukey,SetUkey]=useState<string | null>(null);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    useEffect(()=>{
        SetUkey(window?.sessionStorage?.getItem("ukey")!==undefined && window?.sessionStorage?.getItem("ukey")!==null && window?.sessionStorage?.getItem("ukey")!=="" ? window?.sessionStorage?.getItem("ukey") :null);
        setLoggedIn(ukey && ukey!==null && ukey.length>10? true:false);
    },[ukey,isLoggedIn]);
    return (
        <AppContext.Provider value={{
            ukey,SetUkey,
            isLoggedIn, setLoggedIn
        }}>
        {children}
        </AppContext.Provider>
    )
}
export { AppContext, AppProvider };
