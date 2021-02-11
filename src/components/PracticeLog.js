import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import "./PracticeLog.css";
import { CloseIcon } from "../icons/CloseIcon"
import { EditIcon } from "../icons/EditIcon"
import dummyData from "../dummyData.json";

export const PracticeLog = ({ user, removeLog, setLogs, logs, newLog}) => {
    const [hover, setHover] = useState()
    //get relevant data from db
    useEffect(() => {
        if(user) {        
        const logsRef = firebase.database().ref('logs/' + user.uid);
        // const currentId = user.uid
        // console.log(user.uid)
        logsRef.on('value', (snapshot) => {
            let logs = snapshot.val();
            let newState = [];
            for (let log in logs) {
              // if(log.userId === currentId) {
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
                // }
                }
                setLogs(newState)
                
            });
        }

            }, [user])

    console.log(user)
    let userLogs; 

    const showLogOptions = (e) => {
        setHover(e.target.id)
    }

    const hideLogOptions = (e) => {
        setHover(undefined)
    }

    const editLog = (params) => {
        alert('edit feature coming soon...')
    }
    
    
    
    // {logs ? userLogs = logs.filter((log) => log.userId === user.uid) : userLogs = null}

    return (
        <div className="logContainer">
            <h1>Practice log</h1>
            <div className="log-grid">
                {logs.map((log, idx) => (
                    <div key={log.id} id={log.id} onMouseEnter={showLogOptions}  onMouseLeave={hideLogOptions} className="log-card">
                    {hover == log.id && typeof hover != undefined ? (
                        <div>
                            <div className="edit-log-btn" onClick={() => editLog(log.id)}><EditIcon /></div>
                            <div className="remove-log-btn" onClick={() => removeLog(log.id)}><CloseIcon /></div>
                        </div>
                    ) : <></> }
                        <h2>{JSON.parse(log.startDate)}</h2>
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