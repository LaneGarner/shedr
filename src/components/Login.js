import React, { useEffect } from 'react'
import './Login.css'
import firebase from '../firebase';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { startFirebaseUI } from '../firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


// const ui = new auth.AuthUI(firebase.auth());
export const Login = ({ uiConfig, firebaseAuth }) => {

    useEffect(() => {
        // startFirebaseUI ('#firebaseui')
    },[])

    return (
        <div className="Login-container">
            <h1>Login</h1>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth}/>
        </div>
    )
}

