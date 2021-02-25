import React, {createContext,useState, useEffect} from 'react';
import {auth} from './firebase';
export const AuthContext= createContext({userPresent:false,User:null})
export default function FirebaseAuthContext(props){
    

    let [state,changeState] = useState({
        userDataPresent:false,
        
        User:null,
        listener:null
    })

    useEffect(()=>{
        
        if(state.listener==null){
        
    
        changeState({...state,listener:auth.onAuthStateChanged((User)=>{
            
        if(User)
            changeState(oldState=>({...oldState,userDataPresent:true,User:User}));
            else
            changeState(oldState=>({...oldState,userDataPresent:true,User:null}));
        })});
        
    }
    return ()=>{
    if(state.listener)
        state.listener()
    }
    
    },[])



    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}