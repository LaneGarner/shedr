import { useContext } from "react"
import { Route,Redirect } from "react-router-dom"

import { AuthContext } from "./firebaseAuthContext"

export const ProtectedRoute = (props) => {

    const authValue = useContext(AuthContext)
    if (authValue.userDataPresent){
        if(authValue.User == null){
            return <Redirect to={props.redirectTo}></Redirect>
        }
        else{
            return (
            <Route exact path={props.path}>
                {props.children}
            </Route> 
            )
        }
    }
    else {
        return null
    }
}
