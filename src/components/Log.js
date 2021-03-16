import React, { useEffect, useContext } from 'react'
import { StoreContext } from '../Store'

import { NewSessionForm } from "./NewSessionForm"
import { PracticeLog } from "./PracticeLog"

export const Log = () => {
    const { setActivePage, activePage } = useContext(StoreContext)
    
    useEffect(() => {
        window.scrollTo(0, 0);
        setActivePage("log")
    }, [])

    useEffect(()=> {
        console.log(activePage)
    })

    return (
        <div>
            <NewSessionForm />
            <PracticeLog />
        </div>
    )
}
