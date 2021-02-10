import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, useParams } from 'react-router-dom'
import Router from './Router'
import {Header} from './components/Header'
import {Footer} from './components/Footer'

// import firebase from "firebase/app";
// import "firebase/database"
import firebase, { auth, uiConfig } from './firebase.js';
// import { FirebaseDatabaseProvider } from "@react-firebase/database";
// import "firebase/auth";

import { PracticeTimer } from './components/PracticeTimer'

import './App.css'



const App = () => {
  const [user, setUser] = useState(null)
  const [logs, setLogs] = useState([])

  const [activePage, setActivePage] = useState()

  const [tempo, setTempo] = useState(120)
  const [ playing, setPlaying ] = useState (false)
  const [ timeSig, setTimeSig ] = useState(4)
  const [ position, setPosition ] = useState("0:0:0")
  const [ accent, setAccent ] = useState(true)
  
  const [droning, setDroning] = useState()
  const [droneVolume, setDroneVolume] = useState(-10)
  const [root, setRoot] = useState("C")
  const [chordType, setChordType] = useState("minor ninth")

  const [activeSession, setActiveSession] = useState()
  const [startDate, setStartDate] = useState(new Date());

  const [timerStarted, setTimerStart] = useState(false)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerPaused, setTimerPaused] = useState(false)
  const [tInterval, setTInterval] = useState()
  const [timer, setTimer] = useState("00:00:00")
  const [differenceState, setDifferenceState] = useState()

  const [practiceTime, setPracticeTime] = useState({hours: "00", seconds: "00", minutes: "00"})
  const [practiceTopicNotes, setPracticeTopicNotes] = useState({topic: "", notes: ""})
  const [newLog, setNewLog] = useState()
  // const [practiceTime, setPracticeTime] = useState()

  // timerStarted, setTimerStart, timerRunning, setTimerRunning, timerPaused, setTimerPaused, tInterval, setTInterval, timer, setTimer, differenceState, setDifferenceState
  // timerStarted={timerStarted} setTimerStart={setTimerStart} timerRunning={timerRunning} setTimerRunning={setTimerRunning} timerPaused={timerPaused} setTimerPaused={setTimerPaused} tInterval={tInterval} setTInterval={setTInterval} timer={timer} setTimer={setTimer} differenceState={differenceState} setDifferenceState={setDifferenceState}

  
  // useEffect(() => {
  //   // I want the time.. what is the time? its from the imported practice timer...
  // },[time])

  // <PracticeTimer />
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } 
    });
  },[])

  console.log(user)

  //get relevant data from db
  // useEffect(() => {
    
  //   const logsRef = firebase.database().ref('logs/');
  //   // const currentId = user.uid
  //   // console.log(user.uid)
  //   logsRef.on('value', (snapshot) => {
  //       let logs = snapshot.val();
  //       let newState = [];
  //       for (let log in logs) {
  //         // if(log.userId === currentId) {
  //           newState.push({
  //             id: log,
  //             practiceTime: logs[log].practiceTime,
  //             practiceTopicNotes: logs[log].practiceTopicNotes,
  //             userId: logs[log].userId,
  //           });
  //         // }
  //       }
  //       setLogs(newState)
        
  //     });
  //   }, [])

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

  const login = () => {
    
    // auth.signInWithRedirect(provider) 
    //   .then((result) => {
    //     const user = result.user;
    //     setUser(user)
    //   });
  }

  return (
    // <Provider store={store}>
    // <FirebaseDatabaseProvider>
      <BrowserRouter>
        <Header login={login} logout={logout} user={user} activePage={activePage} setActivePage={setActivePage} activeSession={activeSession} setActiveSession={setActiveSession} tempo={tempo} playing={playing} timeSig={timeSig} droning={droning} root={root} chordType={chordType} />
        <Router uiConfig={uiConfig} firebaseAuth={firebase.auth()} login={login} logout={logout} user={user} user={user} removeLog={removeLog} setLogs={setLogs} logs={logs} firebase={firebase} setActivePage={setActivePage} newLog={newLog} setNewLog={setNewLog} practiceTopicNotes={practiceTopicNotes} setPracticeTopicNotes={setPracticeTopicNotes} practiceTime={practiceTime} setPracticeTime={setPracticeTime} timerStarted={timerStarted} setTimerStart={setTimerStart} timerRunning={timerRunning} setTimerRunning={setTimerRunning} timerPaused={timerPaused} setTimerPaused={setTimerPaused} tInterval={tInterval} setTInterval={setTInterval} timer={timer} setTimer={setTimer} differenceState={differenceState} setDifferenceState={setDifferenceState} startDate={startDate} setStartDate={setStartDate} activeSession={activeSession} setActiveSession={setActiveSession} tempo={tempo} setTempo={setTempo} playing={playing} setPlaying={setPlaying} timeSig={timeSig} setTimeSig={setTimeSig} position={position} setPosition={setPosition} accent={accent} setAccent={setAccent} droning={droning} setDroning={setDroning} droneVolume={droneVolume} setDroneVolume={setDroneVolume} root={root} setRoot={setRoot} chordType={chordType} setChordType={setChordType} />
        <Footer activePage={activePage} setActivePage={setActivePage} />
      </BrowserRouter>
    //  </FirebaseDatabaseProvider>
  );
}

export default App