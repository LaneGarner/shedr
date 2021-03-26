import { useState, useEffect, useContext } from "react"
import { StoreContext } from "../Store"

import MicRecorder from "mic-recorder-to-mp3"
import { Link } from "react-router-dom"

import "./NewRecording.scss"
import { RecordingIcon } from "./RecordingIcon"

const recorder = new MicRecorder({ bitRate: 128 })
let userRef

export const NewRecording = ({setLoadingComplete, update, setUpdate, updateTwo, setUpdateTwo, recordingNames }) => {
    const { isRecording, setIsRecording, blobURL, setBlobURL, isBlocked, recordingCreated, setRecordingCreated, firebase, user, recordTimerStarted, setRecordTimerStart, setRecordTimerRunning, recordTimerPaused, setRecordTimerPaused, recordTInterval, setRecordTInterval, recordTimer, setRecordTimer, recordDifferenceState, setRecordDifferenceState, } = useContext(StoreContext)
    const [ recordingTitle, setRecordingTitle ] = useState("")
    const [ recordingFile, setRecordingFile] = useState("")
    const [ saveRecordingModal, setSaveRecordingModal ] = useState(false)
    const [ nameExistsModal, setNameExistsModal ] = useState(false)
    const [ modalOpen, setModalOpen ] = useState(false)

    let startTime

    const time = new Date();
    time.setSeconds(time.getSeconds() + 600)

    const storageRef = firebase.storage().ref()
    const audioRef = storageRef.child("audio")

    let userId
    if(user) {
        userId = user.uid
    } 
    
    useEffect(()=> {
        if(user){
            userRef = audioRef.child(userId)
        }
    }, [user])

    useEffect(()=> {
        if (saveRecordingModal || nameExistsModal ) {
            setModalOpen(true)
        } else {
            setModalOpen(false)
        }
    }, [ saveRecordingModal, nameExistsModal])
    
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [modalOpen])

    // const testBrowser = async () => {
    //     let stream = await navigator.mediaDevices.getUserMedia({audio: true});
    //     let track = stream.getAudioTracks()[0];
    //     console.log(track.getCapabilities());
    // }

    // testBrowser()

    // const getAudio = () => {
    //     // navigator.mediaDevices.getUserMedia({ audio: true },
    //     navigator.mediaDevices.getUserMedia({ audio: { 
    //         echoCancellation: false,
    //         autoGainControl: true,
    //         // sampleRate: 96000,
    //         // sampleRate: 16000,
    //         // noiseSuppression: false,
    //         // googAutoGainControl: true,
    //         // mozNoiseSuppression: false,
    //         // mozAutoGainControl: false 
    //     }},
    //         () => {
    //         console.log('Permission Granted')
    //         setIsBlocked(false);
    //         },
    //         () => {
    //         console.log('Permission Denied')
    //         setIsBlocked(true)
    //         },
    //     )
    // }

    const record = () => {
        // getAudio()
        setRecordingCreated(false)
        if (isBlocked) {
            console.log('Permission Denied')
        } else {
            recorder
            .start()
            .then(() => {
                setIsRecording(true)
                startTimer()
            }).catch((e) => console.error(e))
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
    
    const handleSaveRecording = (e) => {
        e.preventDefault()
        nameCheck()
    }

    const nameCheck = () => {
        const title = `${recordingTitle}.mp3`
        if (recordingNames.includes(title)) {
            setSaveRecordingModal(false)
            setNameExistsModal(true)
            // alert("name exists")
        } else {
            saveRecording()
        }
    }
    
    const saveRecording = () => {
        setLoadingComplete(false)
        setSaveRecordingModal(false)
        setNameExistsModal(false)
        setRecordingCreated(false)


        if (user) {
            const recordingRef = userRef.child(`${recordingTitle}.mp3`)
            recordingRef.put(recordingFile).then(() => {
                const newUpdate = update + 1
                setUpdate(newUpdate)
            })
            .then(()=> {
                const newUpdateTwo = updateTwo + 1
                setTimeout(()=>{
                    setLoadingComplete(true)
                    setUpdateTwo(newUpdateTwo)
                }, 1000)
            })
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
            {!recordingCreated && <RecordingIcon isRecording={isRecording} stopRecording={stopRecording} recordTimer={recordTimer} record={record}/>}
            {recordingCreated &&
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h1 style={{paddingBottom: ".5em"}}>Preview Recording</h1>
                <audio src={blobURL} controls="controls" />
                <div>
                    <div className="record-buttons">
                        {user ? (
                            <>
                                <button className="timerBtn cancelBtn" onClick={discardRecording}>Discard</button>
                                <button className="timerBtn startBtn" onClick={()=>setSaveRecordingModal(true)}>Save</button> 
                            </>
                            ) : (
                                <button className="timerBtn cancelBtn" onClick={discardRecording}>Discard</button>
                            )}
                    </div>
                    {!user && <Link to="/dashboard">Login or sign up for an account to save your recordings</Link>}
                </div>
            </div>
            }
            {saveRecordingModal && (
                <div className="modal-container">
                    <div className="modal">
                        <form className="save-recording-form" onSubmit={handleSaveRecording}>
                            <h2>Save Recording</h2>
                            <label htmlFor="recordingName">Title*</label><br/>
                            <input autoFocus value={recordingTitle} onChange={e=>setRecordingTitle(e.target.value)} type="text" placeholder="Name your recording" id="recordingName" required/>
                            <div style={{marginTop: "1em"}}>
                                <button className="modalBtn cancel" type="button" onClick={()=>setSaveRecordingModal(false)}>Cancel</button>
                                <button className="modalBtn submit" type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>) 
            }
            {nameExistsModal && (
                <div className="modal-container">
                    <div className="modal">
                        <form className="save-recording-form" onSubmit={handleSaveRecording}>
                            <h2>File name exists</h2>
                            <p style={{textAlign: "center"}}>Please enter a new name or overwrite your recording</p>
                            <label htmlFor="recordingName">Title*</label><br/>
                            <input autoFocus value={recordingTitle} onChange={e=>setRecordingTitle(e.target.value)} type="text" placeholder="Name your recording" id="recordingName" required/>
                            <div style={{marginTop: "1em"}}>
                                <button className="modalBtn cancel" type="button" onClick={saveRecording}>Overwrite</button>
                                <button className="modalBtn submit" type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>) 
            }
        </div>
    )
}
