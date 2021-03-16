import { useEffect, useContext } from 'react'
import { StoreContext } from '../../Store'

import Metronome from './Components/Metronome';
import { Drone } from './Components/Drone';

import './MetDrone.scss'

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
        // <div className="metDroneContainer">
            <div className="metdrone-container">
                <div className="metdrone-component">
                    <Metronome />
                </div>
                <div className="metdrone-component">
                    <Drone />
                </div>
            </div>
        // </div>
    )
}