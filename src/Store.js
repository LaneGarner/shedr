import React, { useState, createContext } from "react"
import firebase, { auth } from "./firebase.js"

export const StoreContext = createContext(null)

export default ({ children }) => {

    const [ user, setUser ] = useState(null)
    const [ logs, setLogs ] = useState([])

    const [ activePage, setActivePage ] = useState()
    const [ hover, setHover ] = useState()
    
    const [ isRecording, setIsRecording ] = useState(false)
    const [ blobURL, setBlobURL ] = useState("")
    const [ isBlocked, setIsBlocked ] = useState(false)
    const [ recordingCreated, setRecordingCreated ] = useState(false)

    const [ tempo, setTempo ] = useState(120)
    const [ playing, setPlaying ] = useState (false)
    const [ timeSig, setTimeSig ] = useState(4)
    const [ position, setPosition ] = useState("0:0:0")
    const [ accent, setAccent ] = useState(true)
    const [ clickVolume, setClickVolume ] = useState(.99)
    const [ polyrhythmMode, setPolyrhythmMode ] = useState(false)
    const [ polyrhythm, setPolyrhythm ] = useState(.6666666666666666666666666666666666666666666666666666667)

    const [ droning, setDroning ] = useState()
    const [ droneVolume, setDroneVolume ] = useState(.99)
    const [ root, setRoot ] = useState("C")
    const [ chordType, setChordType ] = useState("minor ninth")

    const [ activeSession, setActiveSession ] = useState(false)
    const [ startDate, setStartDate ] = useState(Date.now());

    const [ timerStarted, setTimerStart ] = useState(false)
    const [ timerRunning, setTimerRunning ] = useState(false)
    const [ timerPaused, setTimerPaused ] = useState(false)
    const [ tInterval, setTInterval ] = useState()
    const [ timer, setTimer ] = useState("00:00:00")
    const [ differenceState, setDifferenceState ] = useState()

    const [ recordTimerStarted, setRecordTimerStart ] = useState(false)
    const [ recordTimerRunning, setRecordTimerRunning ] = useState(false)
    const [ recordTimerPaused, setRecordTimerPaused ] = useState(false)
    const [ recordTInterval, setRecordTInterval ] = useState()
    const [ recordTimer, setRecordTimer ] = useState("00:00:00")
    const [ recordDifferenceState, setRecordDifferenceState ] = useState()

    const [ tunerMounted, setTunerMounted ] = useState(false)

    const [ practiceTime, setPracticeTime ] = useState(["00", "00", "00"])
    const [ practiceTopicNotes, setPracticeTopicNotes ] = useState({topic: "", notes: ""})
    // const [ newLog, setNewLog ] = useState()

    const [ isOpen, setIsOpen ] = useState(false)

    const closeMenu = () => {
        setIsOpen(false)
    }

    const removeLog = (logId) => {
        const logsRef = firebase.database().ref(`/logs/${user.uid}/${logId}`);
        logsRef.remove();
    }
    
    const logout = () => {
        auth.signOut()
        .then(() => {
        setUser(null)
        });  
    }

    const store = {
        user, setUser,
        logs, setLogs,

        activePage, setActivePage,
        hover, setHover,

        isRecording, setIsRecording, 
        blobURL, setBlobURL, 
        isBlocked, setIsBlocked,
        recordingCreated, setRecordingCreated,

        tempo, setTempo,
        playing, setPlaying ,
        timeSig, setTimeSig ,
        position, setPosition ,
        accent, setAccent ,
        clickVolume, setClickVolume,
        polyrhythmMode, setPolyrhythmMode,
        polyrhythm, setPolyrhythm,
        
        droning, setDroning,
        droneVolume, setDroneVolume,
        root, setRoot,
        chordType, setChordType,
    
        activeSession, setActiveSession,
        startDate, setStartDate,
    
        timerStarted, setTimerStart,
        timerRunning, setTimerRunning,
        timerPaused, setTimerPaused,
        tInterval, setTInterval,
        timer, setTimer,
        differenceState, setDifferenceState,

        recordTimerStarted, setRecordTimerStart, 
        recordTimerRunning, setRecordTimerRunning, 
        recordTimerPaused, setRecordTimerPaused, 
        recordTInterval, setRecordTInterval, 
        recordTimer, setRecordTimer, 
        recordDifferenceState, setRecordDifferenceState,

        tunerMounted, setTunerMounted,
    
        practiceTime, setPracticeTime,
        practiceTopicNotes, setPracticeTopicNotes,
        // newLog, setNewLog,
    
        isOpen, setIsOpen,

        closeMenu, removeLog, logout, firebase

        // firebase, auth, uiConfig

    }

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
