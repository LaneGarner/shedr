import React from 'react'
import { Switch, Route } from 'react-router'
import { User } from './components/User'
import { Record } from './components/Record'
import MetDrone from './components/MetDrone/'
import { Fork } from './components/Fork'
import { NewSessionForm } from './components/NewSessionForm'
import { PracticeLog } from './components/PracticeLog'
import { Login } from './components/Login'


const Router = ({ polyrhythmMode, 
                setPolyrhythmMode, 
                polyrhythm, 
                setPolyrhythm, 
                setClickVolume, 
                clickVolume, 
                uiConfig, 
                firebaseAuth, 
                user, 
                removeLog, 
                setLogs, 
                logs, 
                firebase, 
                setActivePage, 
                newLog, 
                setNewLog, 
                practiceTopicNotes, 
                setPracticeTopicNotes, 
                practiceTime, 
                setPracticeTime, 
                timerStarted, 
                setTimerStart, 
                timerRunning, 
                setTimerRunning, 
                timerPaused, 
                setTimerPaused, 
                tInterval, 
                setTInterval, 
                timer, 
                setTimer, 
                differenceState, 
                setDifferenceState, 
                startDate, 
                setStartDate, 
                activeSession, 
                setActiveSession, 
                tempo, 
                setTempo, 
                playing, 
                setPlaying, 
                timeSig, 
                setTimeSig, 
                position, 
                setPosition, 
                accent, 
                setAccent, 
                droning, 
                setDroning, 
                droneVolume, 
                setDroneVolume, 
                root, 
                setRoot, 
                chordType, 
                setChordType }) => {

    return (
        <Switch>
            <Route exact path="/">
                <NewSessionForm 
                    user={user} 
                    firebase={firebase} 
                    setActivePage={setActivePage} 
                    newLog={newLog} setNewLog={setNewLog} 
                    practiceTopicNotes={practiceTopicNotes} 
                    setPracticeTopicNotes={setPracticeTopicNotes} 
                    practiceTime={practiceTime} 
                    setPracticeTime={setPracticeTime} 
                    timerStarted={timerStarted} 
                    setTimerStart={setTimerStart} 
                    timerRunning={timerRunning} 
                    setTimerRunning={setTimerRunning} 
                    timerPaused={timerPaused} 
                    setTimerPaused={setTimerPaused} 
                    tInterval={tInterval} 
                    setTInterval={setTInterval} 
                    timer={timer} 
                    setTimer={setTimer} 
                    differenceState={differenceState} 
                    setDifferenceState={setDifferenceState} 
                    startDate={startDate} 
                    setStartDate={setStartDate} 
                    activeSession={activeSession} 
                    setActiveSession={setActiveSession} />
            </Route>
            <Route path="/user">
                <User 
                    uiConfig={uiConfig} 
                    firebaseAuth={firebaseAuth} 
                    user={user} 
                    logs={logs} 
                    setActivePage={setActivePage} />
            </Route>
            <Route path="/record">
                <Record setActivePage={setActivePage} />
            </Route>
            <Route path="/metdrone" component={MetDrone}>
                <MetDrone 
                    polyrhythmMode={polyrhythmMode} 
                    setPolyrhythmMode={setPolyrhythmMode} 
                    polyrhythm={polyrhythm} 
                    setPolyrhythm={setPolyrhythm} 
                    setClickVolume={setClickVolume} 
                    clickVolume={clickVolume} 
                    setActivePage={setActivePage} 
                    tempo={tempo} 
                    setTempo={setTempo} 
                    playing={playing} 
                    setPlaying={setPlaying} 
                    timeSig={timeSig} 
                    setTimeSig={setTimeSig} 
                    position={position} 
                    setPosition={setPosition} 
                    accent={accent} 
                    setAccent={setAccent} 
                    droning={droning} 
                    setDroning={setDroning} 
                    droneVolume={droneVolume} 
                    setDroneVolume={setDroneVolume} 
                    root={root} 
                    setRoot={setRoot} 
                    chordType={chordType} 
                    setChordType={setChordType} />
            </Route>
            <Route path="/fork">
                <Fork setActivePage={setActivePage} />
            </Route>
            <Route path="/log">
                <PracticeLog 
                    user={user} 
                    removeLog={removeLog} 
                    setLogs={setLogs} 
                    logs={logs} 
                    newLog={newLog}/>
            </Route>
            <Route>
                <Login 
                    setActivePage={setActivePage} 
                    uiConfig={uiConfig} 
                    firebaseAuth={firebaseAuth} />
            </Route>
        </Switch>
    );
};

export default Router;