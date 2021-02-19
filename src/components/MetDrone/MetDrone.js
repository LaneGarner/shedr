import { useEffect, useContext } from 'react'
import Metronome from './Components/Metronome';
import { Drone } from './Components/Drone';
import { StoreContext } from '../../Store'
import './MetDrone.css'

export const MetDrone = () => {
    const { setActivePage, droneVolume, setDroneVolume } = useContext(StoreContext)
    
    useEffect(() => {
        setActivePage("metdrone")
    })

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    if(droneVolume === undefined) {
        setDroneVolume(-10)
    }

    return (
            <div className="metDroneContainer">
                <div className="metDroneComponentContainer">
                    <div className="metdrone-container">
                        <Metronome />
                    </div>
                    <div className="metdrone-container">
                        <Drone />
                    </div>
                </div>
            </div>
    )
}