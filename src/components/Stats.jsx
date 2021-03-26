import { useState, useEffect, useContext } from "react"
import { StoreContext } from "../Store"

import { summary } from 'date-streaks';

import { PracticeTopics } from "./PracticeTopics"

export const Stats = () => {
    const { user, logs, setLogs, firebase, setActivePage } = useContext(StoreContext)
    const [ totalTime, setTotalTime ] = useState()
    const [ streak, setStreak ] = useState()

    useEffect(() => {
        setActivePage("none")
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if(user) {        
        const logsRef = firebase.database().ref('logs/' + user.uid);
        logsRef.orderByChild("startDate").on('value', (snapshot) => {
            let logs = snapshot.val();
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
                newState.sort(function compare(a, b) {
                    var dateA = new Date(a.startDate);
                    var dateB = new Date(b.startDate);
                    return dateA - dateB;
                })
                setLogs(newState.reverse())
            });
        }
    }, [user, setLogs])

    //format seconds to HH:SS:MM 
    const formatSec = (timestamp) => {
        const hours = Math.floor(timestamp / 60 / 60);
        const minutes = Math.floor(timestamp / 60) - (hours * 60);
        const seconds = timestamp % 60;
        const formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
        return formatted 
    }
    
    //calculate total practice time
    useEffect(() => {
        if (user) {
            const fetchLogs = logs
            const hrs = [0]
            const min = [0]
            const sec = [0]
            fetchLogs.forEach(log => {
                const hrsToSec = log.practiceTime[0] * 3600
                hrs.push(hrsToSec)
            })
            fetchLogs.forEach(log => {
                const minToSec = log.practiceTime[1] * 60
                min.push(minToSec)
            })
            fetchLogs.forEach(log => sec.push(parseInt(log.practiceTime[2])))
            const addConvertedHrs = hrs.reduce((a, b) => a + b)
            const addConvertedMin = min.reduce((a, b) => a + b)
            const addSec = sec.reduce((a, b) => a + b)
            const totalSec = addConvertedHrs + addConvertedMin + addSec
            const formatted = formatSec(totalSec)
            setTotalTime(formatted.split(":"))
        }
    }, [logs])

    //calculate streaks

    useEffect(() => {
        if (user) {
            const dates = []
            logs.forEach(log => {
                const formatDate = new Date(log.startDate)
                dates.push(formatDate)
            })
            const streaks = summary(dates)
            setStreak(streaks)
        }
    }, [logs])

    return (
        <div className="stats-container">
            <h1>Practice Stats</h1>
            <section id="streaks">
                <div><strong>Current streak:</strong> { streak && streak.currentStreak } days</div>
                <div><strong>Longest streak:</strong> { streak && streak.longestStreak } days</div>
                <div><strong>Total practice sessions:</strong> {logs.length}</div>
                <div><strong>Total practice time:</strong> {totalTime && totalTime[0]} hours {totalTime && totalTime[1]} minutes {totalTime && totalTime[2]} seconds</div>
            </section>
            <PracticeTopics logs={logs} user={user}/>
            {/* <div>Min per day/week/month</div> */}
        </div>
    )
}
