import './Login.css'
import 'firebaseui/dist/firebaseui.css'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export const Login = ({ uiConfig, firebaseAuth }) => {

    return (
        <div className="Login-container">
            <h1>Login</h1>
            <p>Please login or create an account<br/> to save your practice sessions to our database</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth}/>
        </div>
    )
}