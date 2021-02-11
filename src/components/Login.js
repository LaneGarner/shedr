import React, { useEffect } from 'react'
import './Login.css'
import firebase from '../firebase';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { startFirebaseUI } from '../firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


// const ui = new auth.AuthUI(firebase.auth());
export const Login = ({ setActivePage, uiConfig, firebaseAuth }) => {
    setActivePage()

    useEffect(() => {
        // startFirebaseUI ('#firebaseui')
    },[])

    return (
        <div className="Login-container">
            <h1>Login</h1>
            <p>Login or create an account<br/> to save your practice sessions to our database</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth}/>
        </div>
    )
}

