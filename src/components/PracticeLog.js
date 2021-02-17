import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import "./PracticeLog.css";
import { CloseIcon } from "../icons/CloseIcon"
import { EditIcon } from "../icons/EditIcon"
import { LogIcon } from "../icons/LogIcon"
import { Link } from 'react-router-dom'

export const PracticeLog = ({ user, removeLog, setLogs, logs}) => {
    const [hover, setHover] = useState()

    useEffect(() => {
        if(user) {        
        const logsRef = firebase.database().ref('logs/' + user.uid);
        logsRef.orderByChild("startDate").on('value', (snapshot) => {
            let logs = snapshot.val();
            console.log(logs)
            // const sortedActivities = logs.sort((a, b) => b.startDate - a.startDate)
            let newState = [];
            for (let log in logs) {
                let thisDate = new Date(logs[log].startDate).toLocaleDateString()
                thisDate = thisDate.replace(/"/g,"")
                let thisTime = new Date(logs[log].startDate).toLocaleTimeString()
                newState.push({
                    id: log,
                    startDate: JSON.stringify(thisDate),
                    startTime: JSON.stringify(thisTime),
                    practiceTime: logs[log].practiceTime,
                    practiceTopicNotes: logs[log].practiceTopicNotes,
                    userId: logs[log].userId,
                    });
                }
                setLogs(newState)
            });
        }
    }, [user, setLogs])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const showLogOptions = (e) => {
        setHover(e.target.id)
    }

    const hideLogOptions = (e) => {
        setHover(undefined)
    }

    const editLog = (params) => {
        alert('edit feature coming soon...')
    }
    
    console.log(typeof logs)
    return (
        <div className="logContainer">
            <LogIcon />
            <h1>Practice log</h1>
            {logs.length === 0 && <Link to="/">Click here to create your first log</Link>}
            <div className="log-grid">
                {logs.map((log, idx) => (
                    <div key={log.id} id={log.id} onMouseEnter={showLogOptions} onMouseLeave={hideLogOptions} className="log-card">
                        <div id={log.id} className="log-card-header">
                        {hover === log.id && typeof hover !== undefined ? (
                            <div>
                                <div className="edit-log-btn" onClick={() => editLog(log.id)}><EditIcon /></div>
                                <div className="remove-log-btn" onClick={() => removeLog(log.id)}><CloseIcon /></div>
                            </div>
                        ) : <></> }
                            <span className="cal-emoji">🗓</span>
                            <h2>{JSON.parse(log.startDate)}</h2>
                    </div>
                        <h2>{JSON.parse(log.startTime)}</h2>
                        <h3>Total practice time:</h3>
                        <span>
                            <span>{log.practiceTime[0]}:{log.practiceTime[1]}:{log.practiceTime[2]}</span>
                        </span><br />
                        <h3>Topic:</h3>
                        <span>{log.practiceTopicNotes.topic}</span>
                        <h3>Notes:</h3>
                        <span>{log.practiceTopicNotes.notes}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}