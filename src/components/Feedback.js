import React, { useState, useContext } from 'react'
import { StoreContext } from '../Store'
import TextareaAutosize from 'react-textarea-autosize';
import "./Feedback.css";

export const Feedback = () => {
    const { firebase } = useContext(StoreContext)
    const [ feedbackForm, setFeedbackForm ] = useState(true)
    const [ feedbackName, setFeedbackName ] = useState("")
    const [ feedbackEmail, setFeedbackEmail ] = useState("")
    const [ feedbackMessage, setFeedbackMessage ] = useState("")

    const handleFeedbackSubmit = (e) => {
        e.preventDefault()
        const feedbackRef = firebase.database().ref("feedback/");
        const feedback = { feedbackName, feedbackEmail, feedbackMessage }
        feedbackRef.push(feedback);
        setFeedbackName("")
        setFeedbackEmail("")
        setFeedbackMessage("")
        setFeedbackForm(false)
    }
    
    
    return (
        <div className="feedback-form">
            {feedbackForm ? (
            <>
                <h1>Feedback</h1>
                <p>Thanks for checking out shedr!</p>
                <p>What do you think of the app? What would you add? What would you change?</p>
                <p>Your feedback is <span>highly appreciated</span>, thanks!</p>
                <form onSubmit={handleFeedbackSubmit}>
                    <label htmlFor="name">Name*</label>
                    <input value={feedbackName} onChange={e=>setFeedbackName(e.target.value)} type="text" id="name" placeholder="Your name" required/>
                    <label htmlFor="email">Email*</label>
                    <input value={feedbackEmail} onChange={e=>setFeedbackEmail(e.target.value)} type="email" id="email" placeholder="Your email" required/>
                    <label htmlFor="message">Message*</label>
                    <TextareaAutosize value={feedbackMessage} onChange={e=>setFeedbackMessage(e.target.value)} id="message" type="text" placeholder="Your message..." minRows="3" required />
                    <button type="submit" className="timerBtn submitBtn">Submit</button>
                </form>
            </>
            ) : 
            <>
                <p className="checkmark">🤘</p>
                <p>Thanks, your feedback has been submitted!</p>
            </>
            }
        </div>
    )
}
