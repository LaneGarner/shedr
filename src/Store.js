import React, { useState } from 'react'

export const StoreContext = React.createContext(null)

export default ({ children }) => {

    const [user, setUser] = useState(null)
    const [logs, setLogs] = useState([])

    const [activePage, setActivePage] = useState()

    const [tempo, setTempo] = useState(120)
    const [ playing, setPlaying ] = useState (false)
    const [ timeSig, setTimeSig ] = useState(4)
    const [ position, setPosition ] = useState("0:0:0")
    const [ accent, setAccent ] = useState(true)
    const [clickVolume, setClickVolume] = useState(1)
    const [polyrhythmMode, setPolyrhythmMode] = useState(false)
    const [polyrhythm, setPolyrhythm] = useState(.6666666666666666666666666666666666666666666666666666667)

    const [droning, setDroning] = useState()
    const [droneVolume, setDroneVolume] = useState(1)
    const [root, setRoot] = useState("C")
    const [chordType, setChordType] = useState("minor ninth")

    const [activeSession, setActiveSession] = useState()
    const [startDate, setStartDate] = useState(Date.now());

    const [timerStarted, setTimerStart] = useState(false)
    const [timerRunning, setTimerRunning] = useState(false)
    const [timerPaused, setTimerPaused] = useState(false)
    const [tInterval, setTInterval] = useState()
    const [timer, setTimer] = useState("00:00:00")
    const [differenceState, setDifferenceState] = useState()

    const [practiceTime, setPracticeTime] = useState({hours: "00", seconds: "00", minutes: "00"})
    const [practiceTopicNotes, setPracticeTopicNotes] = useState({topic: "", notes: ""})
    const [newLog, setNewLog] = useState()

    const [isOpen, setIsOpen] = useState(false)  

    const store = {
        user: [user, setUser],
        logs: [logs, setLogs],

        activePage: [activePage, setActivePage],
        setActivePage: setActivePage,

        tempo: [tempo, setTempo],
        playing: [ playing, setPlaying ],
        timeSig: [ timeSig, setTimeSig ],
        position: [ position, setPosition ],
        accent: [ accent, setAccent ],
        clickVolume: [clickVolume, setClickVolume],
        polyrhythmMode: [polyrhythmMode, setPolyrhythmMode],
        polyrhythm: [polyrhythm, setPolyrhythm],
        
        droning: [droning, setDroning],
        droneVolume: [droneVolume, setDroneVolume],
        root: [root, setRoot],
        chordType: [chordType, setChordType],
    
        activeSession: [activeSession, setActiveSession],
        startDate: [startDate, setStartDate],
    
        timerStarted: [timerStarted, setTimerStart],
        timerRunning: [timerRunning, setTimerRunning],
        timerPaused: [timerPaused, setTimerPaused],
        tInterval: [tInterval, setTInterval],
        timer: [timer, setTimer],
        differenceState: [differenceState, setDifferenceState],
    
        practiceTime: [practiceTime, setPracticeTime],
        practiceTopicNotes: [practiceTopicNotes, setPracticeTopicNotes],
        newLog: [newLog, setNewLog],
    
        isOpen: [isOpen, setIsOpen],

    }

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}