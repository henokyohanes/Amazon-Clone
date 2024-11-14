import React, { useContext, useEffect } from 'react'
import Routing from './Routes';
import { DataContext } from "./Components/DataProvider/DataProvider";
import { ActionTypes } from "./utils/actionType";
import { auth } from "./utils/firebase";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fontsource/montserrat";
import './App.css'

const App = () => {

  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: ActionTypes.SET_USER, user });
      } else {
        dispatch({ type: ActionTypes.SET_USER, user: null });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  )
}

export default App
