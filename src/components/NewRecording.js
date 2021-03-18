import React, { useState, useEffect, useContext } from "react";

import { StoreContext } from '../Store'
import { RecordIcon } from "../icons/RecordIcon";

import MicRecorder from 'mic-recorder-to-mp3';

import "./NewRecording.scss";

const recorder = new MicRecorder({ bitRate: 128 });
let userRef;

export const NewRecording = () => {
    const { setActivePage, isRecording, setIsRecording, blobURL, setBlobURL, isBlocked, setIsBlocked, recordingCreated, setRecordingCreated, firebase, user, recordTimerStarted, setRecordTimerStart, recordTimerRunning, setRecordTimerRunning, recordTimerPaused, setRecordTimerPaused, recordTInterval, setRecordTInterval, recordTimer, setRecordTimer, recordDifferenceState, setRecordDifferenceState, } = useContext(StoreContext)
    const [ saveRecordingModal, setSaveRecordingModal ] = useState(false)
    const [ recordingTitle, setRecordingTitle ] = useState("")

    const [ recordingFile, setRecordingFile] = useState("")
    
    let startTime

    const time = new Date();
    time.setSeconds(time.getSeconds() + 600); // 10 minutes recordTimer

    const storageRef = firebase.storage().ref();
    const audioRef = storageRef.child("audio");

    let userId;
    if(user) {
        userId = user.uid
    } 
    
    useEffect(()=> {
        if(user){
            userRef = audioRef.child(userId)
        }
    }, [user])

    useEffect(() => {
        // navigator.mediaDevices.getUserMedia({ audio: true },
        //     () => {
        //     console.log('Permission Granted')
        //     setIsBlocked(false);
        //     },
        //     () => {
        //     console.log('Permission Denied')
        //     setIsBlocked(true)
        //     },
        // )
    }, [])

    const getAudio = () => {
        navigator.mediaDevices.getUserMedia({ audio: true },
            () => {
            console.log('Permission Granted')
            setIsBlocked(false);
            },
            () => {
            console.log('Permission Denied')
            setIsBlocked(true)
            },
        )
    }


    const record = () => {
        getAudio()
        setRecordingCreated(false)
        if (isBlocked) {
            console.log('Permission Denied');
        } else {
            recorder
            .start()
            .then(() => {
                setIsRecording(true);
                startTimer()
            }).catch((e) => console.error(e));
        }
    }

    const stopRecording = () => {
        setRecordingCreated(true)
        stopTimer()
        recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const file = new File(buffer, 'me-at-thevoice.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                });
                setRecordingFile(file)

                const newBlobURL = URL.createObjectURL(blob)
                setBlobURL(newBlobURL)
                setIsRecording(false)
            }).catch((e) => console.log(e));
    }
    
    const discardRecording = () => {
        setRecordingCreated(false)
        setBlobURL("")
    }
    
    const handleSaveRecording = () => {
        setSaveRecordingModal(false)
        setRecordingCreated(false)
        saveRecording()
    }
    
    const saveRecording = () => {
        if(user) {
            const recordingRef = userRef.child(`${recordingTitle}.mp3`)
            recordingRef.put(recordingFile).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
        }
        setRecordingTitle("")
    }

    const startTimer = () => {
        if(!recordTimerStarted){
            setRecordTimerStart(true)
        } 
        startTime = new Date().getTime()
        setRecordTInterval(setInterval(getTime, 1000))
        setRecordTimerRunning(true);
        setRecordTimerPaused(false);
    }

    const getTime = () => {
        let difference;
        const updatedTime = new Date().getTime();
            if (recordDifferenceState){
                difference = (updatedTime - startTime) + recordDifferenceState
                setRecordDifferenceState(difference)
            } else {
                difference = (updatedTime - startTime)
                setRecordDifferenceState(difference)
            }

            let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            hours = (hours < 10) ? `0${hours}` : hours;
            minutes = (minutes < 10) ? `0${minutes}` : minutes;
            seconds = (seconds < 10) ? `0${seconds}` : seconds;

            setRecordTimer(`${hours}:${minutes}:${seconds}`)
    }

    const stopTimer = () => {
        console.log('stop timer')
        pause()
        setRecordTimerStart(false)
        setRecordTimer("00:00:00")
        setRecordTimerPaused(false)
        setRecordDifferenceState(null)
    }

    const pause = () => {
        if (!recordTimerPaused) {
            setRecordTimerRunning(false)
            setRecordTimerPaused(true)
            clearInterval(recordTInterval)
        } else {
            setRecordTimerPaused(!recordTimerPaused)
            startTimer()
        }
    }

    return (
        <div className="record-container">            
            {isRecording ? (
                <div className="record-icon" onClick={stopRecording}>
                    <h1 className="recording-text">Recording</h1>
                    <div className="is-recording">
                        <RecordIcon width="81.543" height="122.316" isRecording={isRecording} />
                    </div>
                    <p>Click mic to stop recording</p>
                    <div className="recording-timer">
                        {recordTimer}
                    </div>
                </div>) : (
                <div className="record-icon" onClick={record}>
                    <h1 className="recording-text">Record</h1>
                    <RecordIcon width="81.543" height="122.316" isRecording={isRecording} />
                    <p>Click mic to start recording</p> 
                </div> )
        }
        {recordingCreated &&
        <>
            <p style={{fontWeight: 800}}>Preview recording:</p>
            <audio src={blobURL} controls="controls" />
            <div className="record-buttons">
                <button className="timerBtn cancelBtn" onClick={discardRecording}>Discard</button>
                <button className="timerBtn startBtn" onClick={()=>setSaveRecordingModal(true)}>Save</button>
            </div>
        </>
        }
        {saveRecordingModal && (
            <div className="modal-container">
                <div className="modal">
                    <form className="save-recording-form" onSubmit={handleSaveRecording}>
                        <h2>Save recording</h2>
                        <label htmlFor="recordingName">Title*</label><br/>
                        <input value={recordingTitle} onChange={e=>setRecordingTitle(e.target.value)} type="text" placeholder="Name your recording" id="recordingName" required/><br/>
                        <button className="timerBtn startBtn" type="submit">Save</button>
                        <button className="timerBtn pauseBtn" onClick={()=>setSaveRecordingModal(false)}>Cancel</button>
                    </form>
                </div>
            </div>) 
        }
        </div>
        
    )

}