import React, { createContext, useReducer } from "react";

export const DataContext = createContext();

export const DataProvider = ({ reducer, initialState, children }) => {

  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};