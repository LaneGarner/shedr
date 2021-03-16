import React from "react";
import { Switch, Route } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import { User } from "./components/User";
import { Record } from "./components/Record";
// import { Record } from "./components/NewRecording";
import { Log } from "./components/Log";
import MetDrone from "./components/MetDrone/";
import { Fork } from "./components/Fork";
import { NewSessionForm } from "./components/NewSessionForm";
import { PracticeLog } from "./components/PracticeLog";
import { RepList } from "./components/RepList";
import { MyRecordings } from "./components/MyRecordings";
import { Feedback } from './components/Feedback';
import { Home } from './components/Home';

const Router = () => {
    return (
            <Switch>
                <Route exact path="/dashboard" component={User} />
                <Route exact path="/" component={Home} />
                <Route path="/record" component={Record} />
                <Route path="/metdrone" component={MetDrone} />
                <Route path="/fork" component={Fork} />
                <Route path="/log" component={Log} />
                <ProtectedRoute path="/practice-log">
                    <PracticeLog />
                </ProtectedRoute>
                <ProtectedRoute redirectTo="/User" path="/rep">
                    <RepList />
                </ProtectedRoute>
                <ProtectedRoute redirectTo="/User" path="/recordings">
                    <MyRecordings />
                </ProtectedRoute>
                <Route path="/feedback" component={Feedback} />
            </Switch>
    )
}

export default Router;