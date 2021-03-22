import { useEffect, useContext } from "react"
import { BrowserRouter } from "react-router-dom"

import { auth } from "./firebase.js"
import FirebaseAuthContext from "./firebaseAuthContext"

import { Router } from "./Router"
import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"
import { StoreContext } from "./Store"


export const App = () => {
  const { setUser } = useContext(StoreContext)
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } 
      })
    },[])

    console.clear()
    
  return (
    <FirebaseAuthContext>
      <BrowserRouter>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    </FirebaseAuthContext>
  )
}
