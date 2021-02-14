import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { PracticeTimer } from "./PracticeTimer";
import { LogIcon } from "../icons/LogIcon"
import { ClockIcon } from "../icons/ClockIcon"
import DatePicker from "react-datepicker";
import TextareaAutosize from 'react-textarea-autosize';

import "react-datepicker/dist/react-datepicker.css";
import "./NewSessionForm.css"

// const {useRef} = React;


export const NewSessionForm = ({ user, firebase, setActivePage, newLog, setNewLog, practiceTopicNotes, setPracticeTopicNotes, practiceTime, setPracticeTime, timerStarted, setTimerStart, timerRunning, setTimerRunning, timerPaused, setTimerPaused, tInterval, setTInterval, timer, setTimer, differenceState, setDifferenceState, startDate, setStartDate, setActiveSession}) => {

    setActivePage("home")
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    let history = useHistory();


    let userId;
    
    if(user) {
        userId = user.uid
    } else {
        userId = null
    }
    
    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (user) {
            let pTime;
            if (timerRunning || timerPaused){
                setTimerPaused(true)
                setTimerRunning(false)
                const hrs = timer.slice(0,2)
                const min = timer.slice(3,5)
                const sec = timer.slice(6,8)
                pTime= [hrs, min, sec]
            } else {
                pTime = practiceTime;
            }
            clearInterval(tInterval)
            setTimer("00:00:00")
            const itemsRef = firebase.database().ref('logs/' + userId);
            const makeLog = {userId, practiceTopicNotes, startDate, practiceTime: pTime }
            itemsRef.push(makeLog);
            cancelForm()
            history.push("/log");
        } else {
            history.push("/user");
        }
    }

    const cancelForm = () => { 
        setActiveSession(false)
        setStartDate(new Date())
        setPracticeTime({hrs: "00", min: "00", sec: "00"})
        setPracticeTopicNotes({topic: "", notes: ""})
    }

    const handleCancel = () => {
        console.log('cancel')
        setActiveSession(false)
    }

    const setHrs = (e) => {
        const hours = e.target.value
        const minutes = practiceTime[1]
        const seconds = practiceTime[2]
        const newPracticeTime = {hours: {hours}, minutes: {minutes}, seconds: {seconds}}
        setPracticeTime(newPracticeTime)
    }

    const setMin = (e) => {
        const hours = practiceTime[0]
        const minutes = e.target.value
        const seconds = practiceTime[2]
        const newPracticeTime = {hours: {hours}, minutes: {minutes}, seconds: seconds}
        setPracticeTime(newPracticeTime)
    }

    const setSec = (e) => {
        const hours = practiceTime[0]
        const minutes = practiceTime[2]
        const seconds = e.target.value
        const newPracticeTime = [hours, minutes, seconds]
        setPracticeTime(newPracticeTime)
    }

    const setTopic = (e) => {
        const prTopic = e.target.value
        const prNotes = practiceTopicNotes.notes
        const newTopicNotes = {topic: prTopic, notes: prNotes}
        setPracticeTopicNotes(newTopicNotes)
    }

    const setNotes = (e) => {
        const prTopic = practiceTopicNotes.topic
        const prNotes = e.target.value
        const newTopicNotes = {topic: prTopic, notes: prNotes}
        setPracticeTopicNotes(newTopicNotes)
    }
    
    return (
        <div className="formContainer">
            <div className="newSessionContainer">
                <div className="practice-card-icon">
                    <ClockIcon />
                </div>
                <h1>Practice Timer</h1>
                <hr />
                <PracticeTimer setStartDate={setStartDate} practiceTime={practiceTime} setPracticeTime={setPracticeTime} timerStarted={timerStarted} setTimerStart={setTimerStart} timerRunning={timerRunning} setTimerRunning={setTimerRunning} timerPaused={timerPaused} setTimerPaused={setTimerPaused} tInterval={tInterval} setTInterval={setTInterval} timer={timer} setTimer={setTimer} differenceState={differenceState} setDifferenceState={setDifferenceState} />   
            </div>

            <div className="newSessionContainer">
            <form className="prForm" onSubmit={handleSubmit} >
            <div className="practice-card-icon">
                <LogIcon />
            </div>
            <h1>Practice Log</h1>
            <hr />
            <h2>Session</h2>
                <div className="start-time-input">
                    <h4>Start time:</h4>
                    <DatePicker
                        className="datepicker"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        showTimeSelect
                        timeIntervals={1}
                        dateFormat="Pp"
                    /> <br />
                </div>
                <div className="pr-time-input">
                    <h4>Total practice time:</h4>
                    <input value={practiceTime[0]} onChange={setHrs} type="number" id="hrs" name="hrs" min="0" max="99"></input>
                    <label for="hrs">hr</label>
                    <input value={practiceTime[1]} onChange={setMin} type="number" id="min" name="min" min="0" max="60"></input>
                    <label for="totalPracticeTime">min</label>
                    <input value={practiceTime[2]} onChange={setSec} type="number" id="min" name="min" min="0" max="60"></input>
                    <label for="min">sec</label>
                </div>
                <h2>Material</h2>
                    <label htmlFor="topic">Topic</label><br/>
                    <TextareaAutosize required value={practiceTopicNotes.topic} onChange={setTopic} id="topic" className="topic-input" placeholder="What are you practicing?" rows="2" /> 
                    <br />
                    <label htmlFor="notes">Notes</label><br/>
                    <TextareaAutosize value={practiceTopicNotes.notes} onChange={setNotes} id="notes" type="text" placeholder="Add notes like tempos, keys, and goals here..." rows="5" />
                    <br />
                    <button type="submit" className="timerBtn submitBtn">Submit</button>
                    <button onClick={handleCancel} type="reset" className="timerBtn cancelBtn">Cancel</button>
                </form>
            </div>
            <div className="modal-container">
                <div className="modal">
                    <h2>What are you practicing?</h2>
                    <TextareaAutosize minRows="3" autoFocus />
                    <h2>How long are you practicing?</h2>
                    <TextareaAutosize minRows="3"/>
                </div>
            </div>
        </div>
    )
}