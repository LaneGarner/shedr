import React, { useState, useEffect } from 'react'
// import { PracticeTimer } from "./PracticeTimer";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./NewSessionForm.css"

export const NewSessionForm = ({ PracticeTimer, startDate, setStartDate, activeSession, setActiveSession}) => {

    const test = (e) => {
        e.preventDefault()
        alert('submit')
    }

    const handleCancel = () => {
        console.log('cancel')
        setActiveSession(false)
    }
    
    return (
        <div className="formContainer">
            <div className="newSessionContainer">
                <h2>Practice Timer</h2>
                <hr />
                <PracticeTimer />   
            </div>

            <div className="newSessionContainer">
            <h2>Session</h2>
                <hr />
                <h4>Start time:</h4>
                <DatePicker 
                    selected={startDate} 
                    onChange={date => setStartDate(date)} 
                    showTimeSelect
                    timeIntervals={1}
                    dateFormat="Pp"
                /> <br />
                <h4>Total practice time:</h4>
                <label for="hrs">hr</label>
                <input type="number" id="hrs" name="hrs" min="0"></input>
                <label for="totalPracticeTime">min</label>
                <input type="number" id="min" name="min" min="0" max="60"></input>
                <label for="min">sec</label>
                <input type="number" id="min" name="min" min="0" max="60"></input>
                <h2>Material</h2>
                <hr />
                <form onSubmit={test} >
                    <label htmlFor="topic">Topic</label>
                    <input required id="topic" type="text" className="topic-input" placeholder="What are you practicing?" /> 
                    <br />
                    <label htmlFor="notes">Notes</label>
                    <input required id="notes" type="text" placeholder="Add notes like tempos, keys, and goals here..." />
                    <br />
                    <button type="submit" className="timerBtn submitBtn">Submit</button>
                    <button onClick={handleCancel} type="reset" className="timerBtn cancelBtn">Cancel</button>
                </form>
            </div>
        </div>
    )
}
