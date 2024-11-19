'use client';
import React, { createContext, useState, Dispatch, SetStateAction, useEffect } from "react";

interface AppContextType{
    isLoggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
    ukey:string|null;
    SetUkey:Dispatch<SetStateAction<string | null>>;
    Tab:string|null;
    SetTab:Dispatch<SetStateAction<string|null>>;

    //current user selected
    clientKey:string|null,
    SetClientKey:Dispatch<SetStateAction<string | null>>;

    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType>({
    isLoggedIn: false,
    setLoggedIn: (): boolean => false,
    ukey:null,
    SetUkey: (): null => null,
    clientKey:null,
    Tab:null,
    SetTab:():string|null => null,

    SetClientKey: (): null => null,
    isAuthenticated:false, 
    setIsAuthenticated:(): boolean => false
});

const AppProvider = ({ children }: { children: any }) => {
    const [ukey,SetUkey]=useState<string | null>(null);
    const [clientKey,SetClientKey]=useState<string | null>(null);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const[Tab,SetTab]=useState<string|null>("first");
    useEffect(()=>{
        SetUkey(window?.sessionStorage?.getItem("ukey")!==undefined && window?.sessionStorage?.getItem("ukey")!==null && window?.sessionStorage?.getItem("ukey")!=="" ? window?.sessionStorage?.getItem("ukey") :null);
        setLoggedIn(ukey && ukey!==null && ukey.length>10? true:false);
    },[ukey,isLoggedIn]);
    return (
        <AppContext.Provider value={{
            ukey,SetUkey,
            Tab,SetTab,
            clientKey,SetClientKey,
            isLoggedIn, setLoggedIn,
            isAuthenticated, setIsAuthenticated
        }}>
        {children}
        </AppContext.Provider>
    )
}
export { AppContext, AppProvider };
