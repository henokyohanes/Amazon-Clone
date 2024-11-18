import React, { useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'

// Define the ProtectedRoute component
export default function ProtectedRoute({children, msg, redirect}) {
  const navigate = useNavigate();

  // Access the 'user' object from the global state using DataContext
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    // Redirect to the "/auth" page if the user is not authenticated
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user]);
  
  // If the user is authenticated, render the child components
  return children;
};

