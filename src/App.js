import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import {Header} from './components/Header'
import {Footer} from './components/Footer'
import { StoreContext } from './Store'

const App = () => {
  const { setUser, auth } = useContext(StoreContext)
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } 
      });
    },[])
    
  return (
    // <FirebaseDatabaseProvider>
      <BrowserRouter>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    //  </FirebaseDatabaseProvider>
  );
}

export default App