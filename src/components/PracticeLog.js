import React from 'react'
import "./PracticeLog.css";
import dummyData from "../dummyData.json";

export const PracticeLog = ({ removeLog, logs, newLog}) => {
    console.log(dummyData)
    return (
        <div className="logContainer">
            <h1>Practice log</h1>
            {/* <h2>{dummyData}</h2> */}
            {logs.map((log) => (
                <div className="log-card">
                    <h2>Topic:</h2>
                    <span>{log.practiceTopicNotes.topic}</span>
                    <h2>Notes:</h2>
                    <span>{log.practiceTopicNotes.notes}</span>
                    <h2>Practice time:</h2>
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