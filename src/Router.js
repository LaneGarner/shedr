import { Switch, Route } from "react-router"
import { ProtectedRoute } from "./ProtectedRoute"

import { User } from "./components/User.jsx"
import { Record } from "./components/Record.jsx"
import { Log } from "./components/Log.jsx"
import { MetDrone } from "./components/MetDrone/MetDrone.jsx"
import { Fork } from "./components/Fork.jsx"
import { RepList } from "./components/RepList.jsx"
import { Feedback } from "./components/Feedback.jsx"
import { About } from "./components/About.jsx"
import { Settings } from "./components/Settings.jsx"
import { Home } from "./components/Home.jsx"

export const Router = () => {
    return (
            <Switch>
                <Route exact path="/dashboard" component={User} />
                <Route exact path="/" component={Home} />
                <Route path="/record" component={Record} />
                <Route path="/metdrone" component={MetDrone} />
                <Route path="/fork" component={Fork} />
                <Route path="/log" component={Log} />
                <ProtectedRoute redirectTo="/User" path="/rep">
                    <RepList />
                </ProtectedRoute>
                <Route path="/feedback" component={Feedback} />
                <Route path="/about" component={About} />
                <Route path="/settings" component={Settings} />
            </Switch>
    )
}
