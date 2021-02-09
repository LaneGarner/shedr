import React, { useEffect} from 'react'
import firebase from 'firebase'
import "./PracticeLog.css";
import dummyData from "../dummyData.json";

export const PracticeLog = ({ user, removeLog, setLogs, logs, newLog}) => {
    
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
                newState.push({
                    id: log,
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
                    {/* <span>{log.time.practiceTime[0]}</span>:
                    <span>{log.time.practiceTime[1]}</span>:
                    <span>{log.time.practiceTime[2]}</span> */}
                </div>
            ))}
        </div>
    )
}