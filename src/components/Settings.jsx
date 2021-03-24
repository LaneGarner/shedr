import { useEffect, useContext } from 'react'
import { StoreContext } from "../Store"

import "./Settings.scss"

export const Settings = () => {
    const { setActivePage } = useContext(StoreContext)

    useEffect(() => {
        setActivePage("none")
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <span>Remove account</span>
        </div>
    )
}
