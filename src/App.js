import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import {Header} from './components/Header'
import {Footer} from './components/Footer'
// import firebase, { auth, uiConfig } from './firebase.js';
import { StoreContext } from './Store'


// import StoreProvider from "./Store.js";

const App = () => {
  const { setUser, auth } = useContext(StoreContext)



  // const [user, setUser] = useState(null)
  // const [logs, setLogs] = useState([])

  // const [activePage, setActivePage] = useState()

  // const [tempo, setTempo] = useState(120)
  // const [ playing, setPlaying ] = useState (false)
  // const [ timeSig, setTimeSig ] = useState(4)
  // const [ position, setPosition ] = useState("0:0:0")
  // const [ accent, setAccent ] = useState(true)
  // const [clickVolume, setClickVolume] = useState(1)
  // const [polyrhythmMode, setPolyrhythmMode] = useState(false)
  // const [polyrhythm, setPolyrhythm] = useState(.6666666666666666666666666666666666666666666666666666667)
  
  // const [droning, setDroning] = useState()
  // const [droneVolume, setDroneVolume] = useState(1)
  // const [root, setRoot] = useState("C")
  // const [chordType, setChordType] = useState("minor ninth")

  // const [activeSession, setActiveSession] = useState()
  
  // const [startDate, setStartDate] = useState(Date.now());
  // const [timerStarted, setTimerStart] = useState(false)
  // const [timerRunning, setTimerRunning] = useState(false)
  // const [timerPaused, setTimerPaused] = useState(false)
  // const [tInterval, setTInterval] = useState()
  // const [timer, setTimer] = useState("00:00:00")
  // const [differenceState, setDifferenceState] = useState()

  // const [practiceTime, setPracticeTime] = useState({hours: "00", seconds: "00", minutes: "00"})
  // const [practiceTopicNotes, setPracticeTopicNotes] = useState({topic: "", notes: ""})
  // const [newLog, setNewLog] = useState()

  // const [isOpen, setIsOpen] = useState(false)

  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } 
      });
    },[])
    
  // const closeMenu = () => {
  //     setIsOpen(false)
  // }

  // const removeLog = (logId) => {
  //   const logsRef = firebase.database().ref(`/logs/${user.uid}/${logId}`);
  //   logsRef.remove();
  // }

  // const logout = () => {
  //   auth.signOut()
  //   .then(() => {
  //     setUser(null)
  //   });  
  // }

  return (
    // <Provider store={store}>
    // <FirebaseDatabaseProvider>
    // <StoreProvider>
      <BrowserRouter>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    // </StoreProvider>
    //  </FirebaseDatabaseProvider>
  );
}

export default App