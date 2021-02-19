import React from 'react'
import { Switch, Route } from 'react-router'
// import Listings from './containers/Listings'
// import Login from './containers/Login'
// import Details from './containers/Details'
// import Add from './containers/Add'
// import { Home } from './components/Home'
import { User } from './components/User'
import { Record } from './components/Record'
import MetDrone from './components/MetDrone/'
import { Fork } from './components/Fork'
import { NewSessionForm } from './components/NewSessionForm'
import { PracticeLog } from './components/PracticeLog'
import { Login } from './components/Login'
// import cookie from 'cookie'

// const checkAuth = () => {
//     const cookies = cookie.parse(document.cookie)
//     return cookies["loggedIn"] ? true : false
// }

// const ProtectedRoute = ({component: Component, authenticated, ...rest}) => {
//     return (
//         <Route
//         {...rest}
//         render={(props) => checkAuth()
//             ? <Component {...props} {...rest} />
//             : <Redirect to="/login" />}
//         />
//     )
// }


const Router = () => {

    // useEffect(() => {
    //     console.log(tempo)
    //   }, [])
    return (
        <Switch>
            {/* <ProtectedRoute exact path="/" component={Listings} /> */}
            {/* <Route exact path="/" component={Listings} /> */}
            <Route exact path="/">
                {/* <Home activeSession={activeSession} setActiveSession={setActiveSession} /> */}
                <NewSessionForm />
            </Route>
            <Route path="/user">
                <User />
            </Route>
            <Route path="/record">
                <Record />
            </Route>


            <Route path="/metdrone" component={MetDrone}>
                <MetDrone />
            </Route>
            <Route path="/fork">
                <Fork />
            </Route>
            <Route path="/log">
                <PracticeLog />
            </Route>
            <Route>
                <Login />
            </Route>
        </Switch>
    );
};

export default Router;