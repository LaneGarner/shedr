import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import {Header} from './components/Header'
import {Footer} from './components/Footer'

import { PracticeTimer } from './components/PracticeTimer'

import './App.css'

const App = () => {
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
  const [time, setTime] = useState();

  // useEffect(() => {
  //   // I want the time.. what is the time? its from the imported practice timer...
  // },[time])

  <PracticeTimer />

  return (
    // <Provider store={store}>
      <BrowserRouter>
        <Header activeSession={activeSession} setActiveSession={setActiveSession} tempo={tempo} playing={playing} timeSig={timeSig} droning={droning} root={root} chordType={chordType} />
        <Router PracticeTimer={PracticeTimer} startDate={startDate} setStartDate={setStartDate} activeSession={activeSession} setActiveSession={setActiveSession} tempo={tempo} setTempo={setTempo} playing={playing} setPlaying={setPlaying} timeSig={timeSig} setTimeSig={setTimeSig} position={position} setPosition={setPosition} accent={accent} setAccent={setAccent} droning={droning} setDroning={setDroning} droneVolume={droneVolume} setDroneVolume={setDroneVolume} root={root} setRoot={setRoot} chordType={chordType} setChordType={setChordType} />
        <Footer />
      </BrowserRouter>
    // </Provider>
  );
}

export default App