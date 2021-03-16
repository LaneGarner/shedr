import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../Store'

import { NewRecording } from './NewRecording'
import { MyRecordings } from './MyRecordings'

export const Record = () => {
    const { setActivePage } = useContext(StoreContext)

    useEffect(() => {
        window.scrollTo(0, 0);
        setActivePage("record")
    }, [])

    return (
        <div>
            <NewRecording />
            <MyRecordings />
        </div>
    )
}
