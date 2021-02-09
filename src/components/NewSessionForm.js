import React, { useState, useEffect, useRef } from 'react'
import { PracticeTimer } from "./PracticeTimer";
import DatePicker from "react-datepicker";
import TextareaAutosize from 'react-textarea-autosize';

import "react-datepicker/dist/react-datepicker.css";
import "./NewSessionForm.css"

// const {useRef} = React;

export const NewSessionForm = ({ user, firebase, setActivePage, newLog, setNewLog, practiceTopicNotes, setPracticeTopicNotes, practiceTime, setPracticeTime, timerStarted, setTimerStart, timerRunning, setTimerRunning, timerPaused, setTimerPaused, tInterval, setTInterval, timer, setTimer, differenceState, setDifferenceState, startDate, setStartDate, activeSession, setActiveSession}) => {

    setActivePage("home")

    let userId;
    {user ? userId = user.uid: userId = null}
    
    console.log(user)

    // handleSubmit(e) {
    //     e.preventDefault();
    //     const itemsRef = firebase.database().ref('items');
    //     const item = {
    //       title: this.state.currentItem,
    //       user: this.state.username
    //     }
    //     itemsRef.push(item);
    //     this.setState({
    //       currentItem: '',
    //       username: ''
    //     });
    //   }




    const handleSubmit = (e) => {
        e.preventDefault()
        // alert('submit')

        //if timer is running or paused stop it to submit pr time
        const itemsRef = firebase.database().ref('logs/' + userId);
        const makeLog = {userId, practiceTopicNotes, startDate, practiceTime }
        console.log(makeLog)
        itemsRef.push(makeLog);
        // setNewLog(makeLog)
        cancelForm()

        // console.log(makeLog)

        // setTotal()
    }

    const cancelForm = () => { 
        setActiveSession(false)
        setStartDate(new Date())
        setPracticeTime({hrs: "00", min: "00", sec: "00"})
        setPracticeTopicNotes({topic: "", notes: ""})
        // document.getElementById("practice-log-form").reset();
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
                <h1>Practice Timer</h1>
                <hr />
                <PracticeTimer practiceTime={practiceTime} setPracticeTime={setPracticeTime} timerStarted={timerStarted} setTimerStart={setTimerStart} timerRunning={timerRunning} setTimerRunning={setTimerRunning} timerPaused={timerPaused} setTimerPaused={setTimerPaused} tInterval={tInterval} setTInterval={setTInterval} timer={timer} setTimer={setTimer} differenceState={differenceState} setDifferenceState={setDifferenceState} />   
            </div>

            <div className="newSessionContainer">
            <form className="prForm" onSubmit={handleSubmit} >
            <h1>Practice Log</h1>
            <h2>Session</h2>
                <hr />
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
                <hr />
                    <label htmlFor="topic">Topic</label><br/>
                    <TextareaAutosize value={practiceTopicNotes.topic} onChange={setTopic} id="topic" className="topic-input" placeholder="What are you practicing?" rows="2" /> 
                    {/* <textarea value={practiceTopicNotes.topic} onChange={setTopic} id="topic" className="topic-input" placeholder="What are you practicing?" rows="2" />  */}
                    <br />
                    <label htmlFor="notes">Notes</label><br/>
                    <TextareaAutosize value={practiceTopicNotes.notes} onChange={setNotes} id="notes" type="text" placeholder="Add notes like tempos, keys, and goals here..." rows="5" />
                    {/* <textarea value={practiceTopicNotes.notes} onChange={setNotes} id="notes" type="text" placeholder="Add notes like tempos, keys, and goals here..." rows="5" /> */}
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
