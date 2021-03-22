import { useEffect, useContext } from "react"
import { StoreContext } from "../Store"

export const About = () => {
    const { setActivePage } = useContext(StoreContext)
    
    useEffect(() => {
        setActivePage("none")
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div>
            <h1>About</h1>
        </div>
    )
}
