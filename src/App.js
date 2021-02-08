import React, { useState, useEffect } from 'react';
import { BrowserRouter, useParams } from 'react-router-dom'
import Router from './Router'
import {Header} from './components/Header'
import {Footer} from './components/Footer'

import { PracticeTimer } from './components/PracticeTimer'

import './App.css'

const App = () => {
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

  const [practiceTime, setPracticeTime] = useState(["00", "00", "00"])
  const [practiceTopicNotes, setPracticeTopicNotes] = useState({topic: "", notes: ""})
  const [newLog, setNewLog] = useState()
  // const [practiceTime, setPracticeTime] = useState()

  // timerStarted, setTimerStart, timerRunning, setTimerRunning, timerPaused, setTimerPaused, tInterval, setTInterval, timer, setTimer, differenceState, setDifferenceState
  // timerStarted={timerStarted} setTimerStart={setTimerStart} timerRunning={timerRunning} setTimerRunning={setTimerRunning} timerPaused={timerPaused} setTimerPaused={setTimerPaused} tInterval={tInterval} setTInterval={setTInterval} timer={timer} setTimer={setTimer} differenceState={differenceState} setDifferenceState={setDifferenceState}

  
  // useEffect(() => {
  //   // I want the time.. what is the time? its from the imported practice timer...
  // },[time])

  // <PracticeTimer />

  return (
    // <Provider store={store}>
      <BrowserRouter>
        <Header activePage={activePage} setActivePage={setActivePage} activeSession={activeSession} setActiveSession={setActiveSession} tempo={tempo} playing={playing} timeSig={timeSig} droning={droning} root={root} chordType={chordType} />
        <Router setActivePage={setActivePage} newLog={newLog} setNewLog={setNewLog} practiceTopicNotes={practiceTopicNotes} setPracticeTopicNotes={setPracticeTopicNotes} practiceTime={practiceTime} setPracticeTime={setPracticeTime} timerStarted={timerStarted} setTimerStart={setTimerStart} timerRunning={timerRunning} setTimerRunning={setTimerRunning} timerPaused={timerPaused} setTimerPaused={setTimerPaused} tInterval={tInterval} setTInterval={setTInterval} timer={timer} setTimer={setTimer} differenceState={differenceState} setDifferenceState={setDifferenceState} startDate={startDate} setStartDate={setStartDate} activeSession={activeSession} setActiveSession={setActiveSession} tempo={tempo} setTempo={setTempo} playing={playing} setPlaying={setPlaying} timeSig={timeSig} setTimeSig={setTimeSig} position={position} setPosition={setPosition} accent={accent} setAccent={setAccent} droning={droning} setDroning={setDroning} droneVolume={droneVolume} setDroneVolume={setDroneVolume} root={root} setRoot={setRoot} chordType={chordType} setChordType={setChordType} />
        <Footer activePage={activePage} setActivePage={setActivePage} />
      </BrowserRouter>
    // </Provider>
  );
}

export default App