import React, { useState, useEffect } from 'react'
import { PracticeTimer } from "./PracticeTimer";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./NewSessionForm.css"

export const NewSessionForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    
    
    const test = (e) => {
        e.preventDefault()
        alert('submit')
    }

    
    
    
    
    return (
        <div className="formContainer">
            <div className="newSessionContainer">
                <h2>Practice Timer</h2>
                <hr />
                <PracticeTimer />
                {/* <button onClick={() => setTimerRunning(!timerRunning)}>
                    {timerRunning ? "Stop" : "Start"}
                </button>
                <br /> */}
                
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
            </div>

            <div className="newSessionContainer">
                <h2>Material</h2>
                <hr />
                <form onSubmit={test} >
                    <label htmlFor="topic">Topic</label>
                    <input required id="topic" type="text" placeholder="What are you practicing?" /> 
                    <br />
                    <label htmlFor="notes">Notes</label>
                    <input required id="notes" type="text" placeholder="Add notes like tempos, keys, and goals here..." />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
