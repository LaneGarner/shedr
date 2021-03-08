import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from '../Store'
import { RecordIcon } from "../icons/RecordIcon";
import MicRecorder from 'mic-recorder-to-mp3';
import "./Record.css";

const recorder = new MicRecorder({ bitRate: 128 });
let userRef;

export const Record = () => {
    const { setActivePage, isRecording, setIsRecording, blobURL, setBlobURL, isBlocked, setIsBlocked, recordingCreated, setRecordingCreated, firebase, user } = useContext(StoreContext)
    const [ saveRecordingModal, setSaveRecordingModal ] = useState(false)
    const [ recordingTitle, setRecordingTitle ] = useState("")

    const storageRef = firebase.storage().ref();
    const audioRef = storageRef.child("audio");

    let userId;
    if(user) {
        userId = user.uid
        // console.log(userId)
    } 
    
    useEffect(()=> {
        if(user){
            userRef = audioRef.child(userId)
        }
    }, [user])

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true },
            () => {
            console.log('Permission Granted');
            setIsBlocked(false);
            },
            () => {
            console.log('Permission Denied');
            setIsBlocked(true)
            },
        );
    }, [])
    
    useEffect(() => {
        window.scrollTo(0, 0);
        setActivePage("record")
    }, [])

    const record = () => {
        setRecordingCreated(false)
        if (isBlocked) {
            console.log('Permission Denied');
        } else {
            recorder
            .start()
            .then(() => {
                setIsRecording(true);
            }).catch((e) => console.error(e));
        }
    }

    const stopRecording = () => {
        setRecordingCreated(true)
        recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const newBlobURL = URL.createObjectURL(blob)
                setBlobURL(newBlobURL)
                setIsRecording(false)
            }).catch((e) => console.log(e));
    }

    useEffect(() => {
        console.log(blobURL)
    },[blobURL])

    
    const discardRecording = () => {
        setRecordingCreated(false)
        setBlobURL("")
    }
    
    const handleSaveRecording = () => {
        // console.log(blobURL)
        setSaveRecordingModal(false)
        setRecordingCreated(false)
        saveRecording()
    }
    
    const saveRecording = () => {
        if(user) {
            console.log(userRef)
            const recordingRef = userRef.child(`${recordingTitle}.mp3`)
            recordingRef.put(blobURL).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
        }
        setRecordingTitle("")
    }

    
    
    
    return (
        <div className="record-container">
            <h1>Record</h1>
            {isRecording ? (
            <div className="record-icon" onClick={stopRecording}>
                <RecordIcon width="81.543" height="122.316" isRecording={isRecording} />
                <p>Click mic to stop recording</p> 
            </div>) : (
            <div className="record-icon" onClick={record}>
                <RecordIcon width="81.543" height="122.316" isRecording={isRecording} />
                <p>Click mic to start recording</p> 
            </div> )
            // <button className="timerBtn stopBtn" onClick={stopRecording}>Stop</button> :
            // <button className="timerBtn stopBtn" onClick={record}>Record</button>
        }
        {recordingCreated &&
        <>
            <p>Preview recording:</p>
            <audio src={blobURL} controls="controls" />
            <div className="record-buttons">
                <button className="timerBtn cancelBtn" onClick={discardRecording}>Discard</button>
                <button className="timerBtn startBtn" onClick={()=>setSaveRecordingModal(true)}>Save</button>
            </div>
        </>
        }
        {/* <h2>My recordings</h2>
        <h2>Audio</h2>
        <h2>Looper</h2> */}
        {saveRecordingModal && (
            <div className="modal-container">
                <div className="modal">
                    <form className="save-recording-form" onSubmit={handleSaveRecording}>
                        <h2>Save recording</h2>
                        <p>Let's save your recording. Once saved it will available in your user dashboard.</p>
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