import React, { useState, useEffect, useContext } from "react"
import { StoreContext } from "../Store"

import TextareaAutosize from "react-textarea-autosize"
import Axios from "axios"
import ReCAPTCHA from "react-google-recaptcha"

import "./Feedback.scss"

export const Feedback = () => {
    const { setActivePage, firebase } = useContext(StoreContext)
    const [ feedbackForm, setFeedbackForm ] = useState(true)
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ message, setMessage ] = useState("")
    const [ verified, setVerified ] = useState(false)

    useEffect(() => {
        setActivePage("none")
        window.scrollTo(0, 0);
    }, [])

    const handleFeedbackSubmit = (e) => {
        e.preventDefault()
        const data = { name, email, message }

        Axios.post("https://us-central1-shedr-app.cloudfunctions.net/submit", data)
        .then(res => {
            return firebase
                .database()
                .ref("feedback")
                .push(data)
        })
        .catch(error => {
            console.log(error)
        });
    
        
        setName("")
        setEmail("")
        setMessage("")
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
                    <input value={name} onChange={e=>setName(e.target.value)} type="text" id="name" placeholder="Your name" required/>
                    <label htmlFor="email">Email*</label>
                    <input value={email} onChange={e=>setEmail(e.target.value)} type="email" id="email" placeholder="Your email" required/>
                    <label htmlFor="message">Message*</label>
                    <TextareaAutosize value={message} onChange={e=>setMessage(e.target.value)} id="message" type="text" placeholder="Your message..." minRows="3" required />
                    <ReCAPTCHA className="recaptcha" sitekey={process.env.REACT_APP_RECAPTCHA_KEY} onChange={()=>setVerified(true)} />
                    <button style={{margin: 0}} disabled={!verified} type="submit" className={!verified ? "disabledBtn" : "timerBtn submitBtn" }>Submit</button>
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
