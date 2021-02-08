import React from 'react'
import "./PracticeLog.css";
import dummyData from "../dummyData.json";

export const PracticeLog = ({newLog}) => {
    console.log(dummyData)
    return (
        <div className="logContainer">
            <h1>Practice log</h1>
            {/* <h2>{dummyData}</h2> */}
            {dummyData.map((log, idx) => (
                <div key={idx}>
                    <h2>{log.content.topic}</h2>
                    <p>{log.content.notes}</p>
                    <span>{log.time.practiceTime[0]}</span>:
                    <span>{log.time.practiceTime[1]}</span>:
                    <span>{log.time.practiceTime[2]}</span>
                </div>
            ))}
        </div>
    )
}