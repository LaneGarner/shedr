import "firebaseui/dist/firebaseui.css"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

import './Login.scss'

export const Login = ({ uiConfig, firebaseAuth }) => {

    return (
        <div className="Login-container">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth}/>
        </div>
    )
}
