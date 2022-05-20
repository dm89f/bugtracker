import React, { createContext } from "react";

const TicketContext = createContext();

function TicketCtxProvider( {childrens} ){

  return(
    <TicketContext.Provider>
      {
        childrens
      }
    </TicketContext.Provider>
  )


}