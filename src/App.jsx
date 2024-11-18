import React, { useContext, useEffect } from 'react'
import Routing from './Routes';
import { DataContext } from "./Components/DataProvider/DataProvider";
import { ActionTypes } from "./utils/actionType";
import { auth } from "./utils/firebase";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fontsource/montserrat";
import './App.css'

const App = () => {

  // Destructuring the user object from DataContext and dispatch function
  const [{ user }, dispatch] = useContext(DataContext);

  // useEffect hook to set up authentication state listener
  useEffect(() => {

    // Firebase authentication state change listener
    auth.onAuthStateChanged((user) => {
      if (user) {

        // If a user is logged in, dispatch the SET_USER action to update the user in global state
        dispatch({ type: ActionTypes.SET_USER, user });
      } else {
        
        // If no user is logged in, set the user to null in global state
        dispatch({ type: ActionTypes.SET_USER, user: null });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App
