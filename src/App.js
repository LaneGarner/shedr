import React, { useEffect, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import {Header} from './components/Header'
import {Footer} from './components/Footer'
import { StoreContext } from './Store'
import { auth } from './firebase.js';
import FirebaseAuthContext from "./firebaseAuthContext";


const App = () => {
  const { setUser } = useContext(StoreContext)
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } 
      });
    },[])
    
  return (
    <FirebaseAuthContext>
      <BrowserRouter>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    </FirebaseAuthContext>
  );
}

export default App