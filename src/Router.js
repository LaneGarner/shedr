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


const Router = ({ PracticeTimer, startDate, setStartDate, activeSession, setActiveSession, tempo, setTempo, playing, setPlaying, timeSig, setTimeSig, position, setPosition, accent, setAccent, droning, setDroning, droneVolume, setDroneVolume, root, setRoot, chordType, setChordType }) => {

    // useEffect(() => {
    //     console.log(tempo)
    //   }, [])
    return (
        <Switch>
            {/* <ProtectedRoute exact path="/" component={Listings} /> */}
            {/* <Route exact path="/" component={Listings} /> */}
            <Route exact path="/">
                <Home activeSession={activeSession} setActiveSession={setActiveSession} />
            </Route>
            <Route path="/user" component={User} />
            <Route path="/record" component={Record} />
            <Route path="/metdrone" component={MetDrone}>
                <MetDrone tempo={tempo} setTempo={setTempo} playing={playing} setPlaying={setPlaying} timeSig={timeSig} setTimeSig={setTimeSig} position={position} setPosition={setPosition} accent={accent} setAccent={setAccent} droning={droning} setDroning={setDroning} droneVolume={droneVolume} setDroneVolume={setDroneVolume} root={root} setRoot={setRoot} chordType={chordType} setChordType={setChordType} />
            </Route>
            <Route path="/fork" component={Fork} />
            <Route path="/form">
                <NewSessionForm PracticeTimer={PracticeTimer} startDate={startDate} setStartDate={setStartDate} activeSession={activeSession} setActiveSession={setActiveSession} />
            </Route>
            {/* <Route path="/login" component={Login} /> */}
            {/* <ProtectedRoute path="/add" component={Add} /> */}
            {/* <Route exact path="/details/:id" component={Details} /> */}
            {/* <ProtectedRoute path="/about" component={About} /> */}
            {/* <ProtectedRoute path="/car/:id" component={Car} /> */}
        </Switch>
    );
};

export default Router;