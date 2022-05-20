import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();
const ThemeToggleContext = createContext();


export function useTheme(){

  return useContext(ThemeContext);

}

export function useToggleTheme(){
  
  return useContext(ThemeToggleContext);
  
}


export function ThemeCtxProvider({children}){


  const [darkTheme, setDarkTheme] = useState(false);

  function toggleTheme(){

    setDarkTheme( (prev)=> ( !prev ) );

  }


  return(
    <ThemeContext.Provider value={darkTheme} >
      <ThemeToggleContext.Provider value={toggleTheme} >
        {
          children
        }
      </ThemeToggleContext.Provider>
    </ThemeContext.Provider>
  )

}