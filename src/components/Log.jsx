import { useState, useEffect, useContext } from "react"
import { StoreContext } from "../Store"

import { NewSessionForm } from "./NewSessionForm.jsx"
import { PracticeLog } from "./PracticeLog.jsx"

import "./Log.scss"

export const Log = () => {
    const [ newLogOpen, setNewLogOpen ] = useState(false)
    const { setActivePage } = useContext(StoreContext)
    
    useEffect(() => {
        window.scrollTo(0, 0);
        setActivePage("log")
    }, [])

    return (
        <div className="log-container">
            <h1>New Practice Session</h1>
            {newLogOpen ? (
                <NewSessionForm />
            ) :
            <div className="logStart startBtn timerBtn" onClick={()=>setNewLogOpen(true)}>New Session</div>
            }
            <hr className="hr"/>
            <PracticeLog />
        </div>
    )
}
