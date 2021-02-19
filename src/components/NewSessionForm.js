import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { PracticeTimer } from "./PracticeTimer";
import { LogIcon } from "../icons/LogIcon"
import { ClockIcon } from "../icons/ClockIcon"
import DatePicker from "react-datepicker";
import TextareaAutosize from 'react-textarea-autosize';
import "react-datepicker/dist/react-datepicker.css";
import "./NewSessionForm.css"
import { StoreContext } from '../Store'

export const NewSessionForm = ({ firebase, activePage, setActivePage, newLog, setNewLog, practiceTopicNotes, setPracticeTopicNotes, practiceTime, setPracticeTime, timerStarted, setTimerStart, timerRunning, setTimerRunning, timerPaused, setTimerPaused, tInterval, setTInterval, timer, setTimer, differenceState, setDifferenceState, startDate, setStartDate, setActiveSession }) => {
    
    const { user } = React.useContext(StoreContext)
    console.log(user)

    const [startSessionModal, setStartSessionModal] = useState(false)
    const [stopSessionModal, setStopSessionModal] = useState(false)
    const [submitSessionModal, setSubmitSessionModal] = useState(false)
    const [cancelSessionModal, setCancelSessionModal] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(()=> {
        if (startSessionModal || stopSessionModal || submitSessionModal || cancelSessionModal) {
            setModalOpen(true)
        } else {
            setModalOpen(false)
        }
    }, [startSessionModal, stopSessionModal, submitSessionModal, cancelSessionModal])
    
    useEffect(() => {
        if (modalOpen) {
        document.body.style.overflow = 'hidden';
        } else {
        document.body.style.overflow = 'unset';
        }
    }, [modalOpen]);


    //set active page for header/footer
    setActivePage("home")
    
    //scroll to top on load
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

    const handleSubmit = () => {
        setModalOpen(false)
        document.body.style.overflow = 'unset'
        if (user) {
            let pTime
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

    
    const handleCancel = () => {
        setCancelSessionModal(false)
        setActiveSession(false)
        cancelForm()
    }
    
    const cancelForm = () => { 
        setActiveSession(false)
        setStartDate(new Date())
        setPracticeTime({hrs: "00", min: "00", sec: "00"})
        setPracticeTopicNotes({topic: "", notes: ""})
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
        const newPracticeTime = {hours: {hours}, minutes: {minutes}, seconds: {seconds}}
        setPracticeTime(newPracticeTime)
    }

    const setSec = (e) => {
        const hours = practiceTime[0]
        const minutes = practiceTime[2]
        const seconds = e.target.value
        const newPracticeTime = {hours: {hours}, minutes: {minutes}, seconds: {seconds}}
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

    let startTime

    const startTimer = () => {
        setStartSessionModal(false)
        if(!timerStarted){
            setTimerStart(true)
        } 
        startTime = new Date().getTime()
        setStartDate(Date.now())
        setTInterval(setInterval(getTime, 1000))
        setTimerRunning(true);
        setTimerPaused(false);
    }

    const getTime = () => {
        let difference;
        const updatedTime = new Date().getTime();
            if (differenceState){
                difference = (updatedTime - startTime) + differenceState
                setDifferenceState(difference)
            } else {
                difference = (updatedTime - startTime)
                setDifferenceState(difference)
            }

            let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            hours = (hours < 10) ? `0${hours}` : hours;
            minutes = (minutes < 10) ? `0${minutes}` : minutes;
            seconds = (seconds < 10) ? `0${seconds}` : seconds;

            setTimer(`${hours}:${minutes}:${seconds}`)
    }

    const stopTimer = () => {
        setStopSessionModal(false)
        const hrs = timer.slice(0,2)
        const min = timer.slice(3,5)
        const sec = timer.slice(6,8)
        const pTime= [hrs, min, sec]
        setPracticeTime(pTime)
        setTimerStart(false)
        setTimer("00:00:00")
        setTimerPaused(false)
        setDifferenceState(null)
    }

    const pause = () => {
        if (!timerPaused) {
            setTimerRunning(false)
            setTimerPaused(true)
            clearInterval(tInterval)
        } else {
            setTimerPaused(!timerPaused)
            startTimer()
        }
    }

    const cancelStop = () => {
        pause()
        setStopSessionModal(false)
    }

    const confirmSubmit = (e) => {
        e.preventDefault()
        setSubmitSessionModal(true)
    }

    const cancelSubmit = () => {
        setCancelSessionModal(true)
    }

    return (
        <div className="formContainer">
            <div className="newSessionContainer">
                <div className="practice-card-icon">
                    <ClockIcon />
                </div>
                <h1>Practice Timer</h1>
                <hr />
                <PracticeTimer pause={pause} stopTimer={stopTimer} startTimer={startTimer} startTime={startTime} setStopSessionModal={setStopSessionModal} setStartSessionModal={setStartSessionModal} setStartDate={setStartDate} practiceTime={practiceTime} setPracticeTime={setPracticeTime} timerStarted={timerStarted} setTimerStart={setTimerStart} timerRunning={timerRunning} setTimerRunning={setTimerRunning} timerPaused={timerPaused} setTimerPaused={setTimerPaused} tInterval={tInterval} setTInterval={setTInterval} timer={timer} setTimer={setTimer} differenceState={differenceState} setDifferenceState={setDifferenceState} />   
            </div>

            <div className="newSessionContainer">
            <form className="prForm" onSubmit={confirmSubmit} >
            <div className="practice-card-icon">
                <LogIcon />
            </div>
            <h1>New Practice Log</h1>
            <hr />
            <h2>Session</h2>
                <div className="start-time-input">
                    <h4>Start time:</h4>
                    <DatePicker
                        className="datepicker"
                        selected={new Date(startDate)}
                        onChange={(e) => setStartDate(Date.parse(e))}
                        // value={handleValue}
                        showTimeSelect
                        timeIntervals={1}
                        dateFormat="Pp"
                    /> 
                    <br />
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
                    <button onClick={cancelSubmit} type="reset" className="timerBtn cancelBtn">Cancel</button>
                </form>
            </div>
            {startSessionModal && (
                <div className="modal-container">
                    <div className="modal">
                        <button className="timerBtn pauseBtn" onClick={startTimer}>Skip</button>
                        <h2>What are you practicing?</h2>
                        <TextareaAutosize style={{padding: "1em", fontSize: "16px"}} value={practiceTopicNotes.topic} onChange={setTopic} autoFocus />
                        <h2>How long are you practicing?</h2>
                        <input value={practiceTime[0]} onChange={setHrs} type="number" id="hrs" name="hrs" min="0" max="99"></input>
                        <label for="hrs">hr</label>
                        <input value={practiceTime[1]} onChange={setMin} type="number" id="min" name="min" min="0" max="60"></input>
                        <label for="totalPracticeTime">min</label><br/>
                        <button className="timerBtn startBtn" onClick={startTimer}>Confirm</button>
                        <button className="timerBtn stopBtn" onClick={()=>setStartSessionModal(false)}>Cancel</button>
                    </div>
                </div>) 
            }
            {stopSessionModal && (
                <div className="modal-container">
                    <div className="modal">
                        <h2>Are you sure?</h2>
                        <p>Stopping now will end your practice timer and log your practice time</p>
                        <button className="timerBtn startBtn" onClick={stopTimer}>Confirm</button>
                        <button className="timerBtn stopBtn" onClick={cancelStop}>Cancel</button>
                    </div>
                </div>) 
            }
            {submitSessionModal && (
                <div className="modal-container">
                    <div className="modal">
                        <h2>Are you sure?</h2>
                        <p>Submitting now will clear this form and submit your session to our database</p>
                        <button className="timerBtn startBtn" onClick={handleSubmit}>Submit</button>
                        <button className="timerBtn stopBtn" onClick={()=>setSubmitSessionModal(false)}>Back</button>
                    </div>
                </div>) 
            }
            {cancelSessionModal && (
                <div className="modal-container">
                    <div className="modal">
                        <h2>Are you sure?</h2>
                        <p>Canceling now will clear this form and reset your session</p>
                        <button className="timerBtn startBtn" onClick={handleCancel}>Cancel Session</button>
                        <button className="timerBtn stopBtn" onClick={()=>setCancelSessionModal(false)}>Back to form</button>
                    </div>
                </div>) 
            }
        </div>
    )
}