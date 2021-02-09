import React from 'react'
import "./PracticeLog.css";
import dummyData from "../dummyData.json";

export const PracticeLog = ({ user, removeLog, logs, newLog}) => {

    console.log(logs)
    let userLogs; 
    // {logs ? userLogs = logs.filter((log) => log.userId === user.uid) : userLogs = null}

    return (
        <div className="logContainer">
            <h1>Practice log</h1>
            
            {logs.map((log) => (
                <div className="log-card">
                    <h3>Topic:</h3>
                    <span>{log.practiceTopicNotes.topic}</span>
                    <h3>Notes:</h3>
                    <span>{log.practiceTopicNotes.notes}</span>
                    <h3>Practice time:</h3>
                    <span>{log.practiceTime[0]}:{log.practiceTime[1]}:{log.practiceTime[2]}</span>
                    <button onClick={() => removeLog(log.id)}>Remove Item</button>
                    {/* <p>{log.content.notes}</p> */}
                    {/* <span>{log.time.practiceTime[0]}</span>: */}
                    {/* <span>{log.time.practiceTime[1]}</span>: */}
                    {/* <span>{log.time.practiceTime[2]}</span> */}
                </div>
            ))}
        </div>
    )
}