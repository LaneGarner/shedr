import { useEffect, useContext } from 'react'
import { StoreContext } from "../Store"

export const Settings = () => {
    const { setActivePage } = useContext(StoreContext)

    useEffect(() => {
        setActivePage("none")
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div>
            <h1>Settings</h1>
        </div>
    )
}
