import { useState, useContext, useEffect } from "react"
import { StoreContext } from "../Store"

import { NewRecording } from "./NewRecording.jsx"
import { MyRecordings } from "./MyRecordings.jsx"

export const Record = () => {    
    const { setActivePage, user } = useContext(StoreContext)
    const [ update, setUpdate ] = useState(0)
    const [ updateTwo, setUpdateTwo ] = useState(0)
    const [ loadingComplete, setLoadingComplete] = useState(false)
    const [ recordingNames, setRecordingNames ] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        setActivePage("record")
    }, [])

    return (
        <div>
            <NewRecording loadingComplete={loadingComplete} setLoadingComplete={setLoadingComplete} update={update} setUpdate={setUpdate} updateTwo={updateTwo} setUpdateTwo={setUpdateTwo} recordingNames={recordingNames} setRecordingNames={setRecordingNames} />
            {user && 
                <>
                    <hr style={{width: "60%", marginTop: "2em", border:"1.5px solid #222", backgroundColor: "#222"}} />
                    <MyRecordings loadingComplete={loadingComplete} setLoadingComplete={setLoadingComplete} update={update} setUpdate={setUpdate} updateTwo={updateTwo} setUpdateTwo={setUpdateTwo} recordingNames={recordingNames} setRecordingNames={setRecordingNames} />
                </>
            }
        </div>
    )
}
