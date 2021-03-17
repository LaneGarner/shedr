import React, { useState, useEffect, useContext } from 'react'
import { StoreContext } from '../Store'

import { NewSessionForm } from "./NewSessionForm"
import { PracticeLog } from "./PracticeLog"

import "./Log.scss"

export const Log = () => {
    const [ newLogOpen, setNewLogOpen ] = useState(false)
    const { setActivePage, activePage } = useContext(StoreContext)
    
    useEffect(() => {
        window.scrollTo(0, 0);
        setActivePage("log")
    }, [])

    useEffect(()=> {
        console.log(activePage)
    })

    return (
        <div className="log-container">
            <h1>New Practice Session</h1>
            {newLogOpen ? (
                <NewSessionForm />
            ) :
            <div className="startBtn timerBtn" onClick={()=>setNewLogOpen(true)}>Start New Session</div>
            }
            <hr />
            <PracticeLog />
        </div>
    )
}
