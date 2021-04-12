import { useContext } from "react"
import { StoreContext } from "./Store"

import { Switch, Route, Redirect } from "react-router"
import { ProtectedRoute } from "./ProtectedRoute"

import { User } from "./components/User.jsx"
// import { Record } from "./components/Record.jsx"
import { Log } from "./components/Log.jsx"
import { MetDrone } from "./components/MetDrone/MetDrone.jsx"
import { Fork } from "./components/Fork.jsx"
import { RepList } from "./components/RepList.jsx"
import { Feedback } from "./components/Feedback.jsx"
import { About } from "./components/About.jsx"
import { Settings } from "./components/Settings.jsx"
import { Home } from "./components/Home.jsx"
import { Stats } from "./components/Stats.jsx"

export const Router = () => {
    const { user } = useContext(StoreContext)
    return (
            <Switch>
                <Route exact path="/">
                    {user ? <Redirect to="/dashboard" /> : <Home />}
                </Route>
                <Route exact path="/dashboard" component={User} />
                {/* <Route path="/record" component={Record} /> */}
                <Route path="/metdrone" component={MetDrone} />
                <Route path="/fork" component={Fork} />
                <Route path="/log" component={Log} />
                <ProtectedRoute redirectTo="/dashboard" path="/rep">
                    <RepList />
                </ProtectedRoute>
                <Route path="/feedback" component={Feedback} />
                <Route path="/about" component={About} />
                <ProtectedRoute redirectTo="/dashboard" path="/settings">
                    <Settings />
                </ProtectedRoute>
                <ProtectedRoute redirectTo="/dashboard" path="/stats">
                    <Stats />
                </ProtectedRoute>
            </Switch>
    )
}
