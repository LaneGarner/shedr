import React from 'react'
import { Switch, Route } from 'react-router'
import { User } from './components/User'
import { Record } from './components/Record'
import MetDrone from './components/MetDrone/'
import { Fork } from './components/Fork'
import { NewSessionForm } from './components/NewSessionForm'
import { PracticeLog } from './components/PracticeLog'

const Router = () => {

    return (
        <Switch>
            <Route exact path="/" component={NewSessionForm} />
            <Route path="/user" component={User} />
            <Route path="/record" component={Record} />
            <Route path="/metdrone" component={MetDrone} />
            <Route path="/fork" component={Fork} />
            <Route path="/log" component={PracticeLog} />
        </Switch>
    )
}

export default Router;