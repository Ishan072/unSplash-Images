import { createContext , useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
    const storedDarkMode = localStorage.getItem('darkTheme');
    if(storedDarkMode === null)
        return prefersDarkMode;

    return storedDarkMode === 'true';
}

export const AppProvider = ({children}) => {
    const [isDarkTheme,setDarkTheme] = useState(getInitialDarkMode());
    const [searchTerm, setSearchTerm] = useState('cat');

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setDarkTheme(newDarkTheme);
        localStorage.setItem('dark-theme', newDarkTheme);
    };

    useEffect(()=>{
        document.body.classList.toggle('dark-theme', isDarkTheme);
    },[isDarkTheme]);

    return (
        <AppContext.Provider value={{isDarkTheme,
            toggleDarkTheme,
            setSearchTerm,
            searchTerm
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => useContext(AppContext);
