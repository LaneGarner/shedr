import React from "react";
import { Switch, Route } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import { User } from "./components/User";
// import Record from "./components/Record";
import { Record } from "./components/Record";
import MetDrone from "./components/MetDrone/";
import { Fork } from "./components/Fork";
import { NewSessionForm } from "./components/NewSessionForm";
import { PracticeLog } from "./components/PracticeLog";
import { RepList } from "./components/RepList";
import { Feedback } from './components/Feedback';

const Router = () => {

    return (
            <Switch>
                <Route exact path="/" component={NewSessionForm} />
                <Route path="/user" component={User} />
                <Route path="/record" component={Record} />
                <Route path="/metdrone" component={MetDrone} />
                <Route path="/fork" component={Fork} />
                <ProtectedRoute path="/log">
                    <PracticeLog />
                </ProtectedRoute>
                <ProtectedRoute redirectTo="/User" path="/rep">
                    <RepList />
                </ProtectedRoute>
                <Route path="/feedback" component={Feedback} />
            </Switch>
    )
}

export default Router;