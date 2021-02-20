import React, { useEffect, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import {Header} from './components/Header'
import {Footer} from './components/Footer'
import { StoreContext } from './Store'
import { auth } from './firebase.js';


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