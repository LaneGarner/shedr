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


const Router = () => {
    return (
        <Switch>
            {/* <ProtectedRoute exact path="/" component={Listings} /> */}
            {/* <Route exact path="/" component={Listings} /> */}
            <Route exact path="/" component={Home} />
            <Route path="/user" component={User} />
            <Route path="/record" component={Record} />
            <Route path="/metdrone" component={MetDrone} />
            <Route path="/fork" component={Fork} />
            <Route path="/form" component={NewSessionForm} />
            {/* <Route path="/login" component={Login} /> */}
            {/* <ProtectedRoute path="/add" component={Add} /> */}
            {/* <Route exact path="/details/:id" component={Details} /> */}
            {/* <ProtectedRoute path="/about" component={About} /> */}
            {/* <ProtectedRoute path="/car/:id" component={Car} /> */}
        </Switch>
    );
};

export default Router;