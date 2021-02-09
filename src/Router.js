import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
// import Listings from './containers/Listings'
// import Login from './containers/Login'
// import Details from './containers/Details'
// import Add from './containers/Add'
import { Home } from './components/Home'
import { User } from './components/User'
import { Record } from './components/Record'
import MetDrone from './components/MetDrone/'
import { Fork } from './components/Fork'
import { NewSessionForm } from './components/NewSessionForm'
import { PracticeLog } from './components/PracticeLog'
import cookie from 'cookie'

const checkAuth = () => {
    const cookies = cookie.parse(document.cookie)
    return cookies["loggedIn"] ? true : false
}

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
        {...rest}
        render={(props) => checkAuth()
            ? <Component {...props} />
            : <Redirect to="/login" />}
        />
    )
}


const Router = ({ user, removeLog, logs, firebase, setActivePage, newLog, setNewLog, practiceTopicNotes, setPracticeTopicNotes, practiceTime, setPracticeTime, timerStarted, setTimerStart, timerRunning, setTimerRunning, timerPaused, setTimerPaused, tInterval, setTInterval, timer, setTimer, differenceState, setDifferenceState, startDate, setStartDate, activeSession, setActiveSession, tempo, setTempo, playing, setPlaying, timeSig, setTimeSig, position, setPosition, accent, setAccent, droning, setDroning, droneVolume, setDroneVolume, root, setRoot, chordType, setChordType }) => {

    // useEffect(() => {
    //     console.log(tempo)
    //   }, [])
    return (
        <Switch>
            {/* <ProtectedRoute exact path="/" component={Listings} /> */}
            {/* <Route exact path="/" component={Listings} /> */}
            <Route exact path="/">
                {/* <Home activeSession={activeSession} setActiveSession={setActiveSession} /> */}
                <NewSessionForm user={user} firebase={firebase} setActivePage={setActivePage} newLog={newLog} setNewLog={setNewLog} practiceTopicNotes={practiceTopicNotes} setPracticeTopicNotes={setPracticeTopicNotes} practiceTime={practiceTime} setPracticeTime={setPracticeTime} timerStarted={timerStarted} setTimerStart={setTimerStart} timerRunning={timerRunning} setTimerRunning={setTimerRunning} timerPaused={timerPaused} setTimerPaused={setTimerPaused} tInterval={tInterval} setTInterval={setTInterval} timer={timer} setTimer={setTimer} differenceState={differenceState} setDifferenceState={setDifferenceState} startDate={startDate} setStartDate={setStartDate} activeSession={activeSession} setActiveSession={setActiveSession} />
            </Route>
            <Route path="/user">
                <User user={user} logs={logs} setActivePage={setActivePage} />
            </Route>
            <Route path="/record">
                <Record setActivePage={setActivePage} />
            </Route>


            <Route path="/metdrone" component={MetDrone}>
                <MetDrone setActivePage={setActivePage} tempo={tempo} setTempo={setTempo} playing={playing} setPlaying={setPlaying} timeSig={timeSig} setTimeSig={setTimeSig} position={position} setPosition={setPosition} accent={accent} setAccent={setAccent} droning={droning} setDroning={setDroning} droneVolume={droneVolume} setDroneVolume={setDroneVolume} root={root} setRoot={setRoot} chordType={chordType} setChordType={setChordType} />
            </Route>
            <Route path="/fork">
                <Fork setActivePage={setActivePage} />
            </Route>
            <Route path="/log">
                <PracticeLog user={user} removeLog={removeLog} logs={logs} newLog={newLog}/>
            </Route>
            {/* <Route path="/form">
                <NewSessionForm setActivePage={setActivePage} newLog={newLog} setNewLog={setNewLog} practiceTopicNotes={practiceTopicNotes} setPracticeTopicNotes={setPracticeTopicNotes} practiceTime={practiceTime} setPracticeTime={setPracticeTime} timerStarted={timerStarted} setTimerStart={setTimerStart} timerRunning={timerRunning} setTimerRunning={setTimerRunning} timerPaused={timerPaused} setTimerPaused={setTimerPaused} tInterval={tInterval} setTInterval={setTInterval} timer={timer} setTimer={setTimer} differenceState={differenceState} setDifferenceState={setDifferenceState} startDate={startDate} setStartDate={setStartDate} activeSession={activeSession} setActiveSession={setActiveSession} />
            </Route> */}
        </Switch>
    );
};

export default Router;