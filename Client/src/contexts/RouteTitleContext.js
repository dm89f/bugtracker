import { useState, createContext, useContext, } from "react"; 
const RouteTitleContext = createContext();



export function RouteTitleContextProvider ({children}){

  const [ tabTitle, setTabTitle ] = useState("TEST");



  return(
    <RouteTitleContext.Provider 
    value={{ tabTitle, setTabTitle }}>
      {children}
    </RouteTitleContext.Provider>
  )

}


export function useTabTitle(){

  const { tabTitle } = useContext(RouteTitleContext);
  return tabTitle;
}

export function useSetTabTitle(){
  const {setTabTitle} = useContext(RouteTitleContext);
  return setTabTitle;
}