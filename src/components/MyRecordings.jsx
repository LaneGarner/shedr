import { useState, useEffect, useContext } from "react"
import { StoreContext } from "../Store"

import Moment from "react-moment"
import "moment-timezone"

import { CloseIcon } from "../icons/CloseIcon"

import "./MyRecordings.scss"

Moment.globalLocal = true;

export const MyRecordings = ({update, setUpdate, updateTwo, setUpdateTwo}) => {
    const { firebase, user } = useContext(StoreContext)
    const [ myRecordings, setMyRecordings ] = useState([])
    const [ myRecordingsURL, setMyRecordingsURL ] = useState([])
    const [ myRecordingsMetadata, setMyRecordingsMetadata ] = useState([])
    const [ loadingComplete, setLoadingComplete] = useState(false)
    // const [ update, setUpdate ] = useState(0)
    
    let userId, storage, listRef

    const fetchRecordings = () => {
        userId = user.uid
        storage = firebase.storage().ref(`audio/${userId}`)
        listRef = storage.child(`audio/${userId}`)
        storage.list().then(snap => {
            let metadataPromise = []
            let urlPromise = []

            snap.items.map(itemRef => metadataPromise.push(itemRef.getMetadata()))
            snap.items.map(itemRef => urlPromise.push(itemRef.getDownloadURL()))
            
            Promise.all(metadataPromise).then((data) => {
                setMyRecordingsMetadata(data)
            })
            
            Promise.all(urlPromise).then((data) => {
                setMyRecordingsURL(data)
                setLoadingComplete(true)
            })
        })
    }
    
    useEffect(() => {
        if(user) {
            fetchRecordings()
            updateList()
        }
    }, [])

    const setRecordings = () => {
        let getMeta, getURL
        const getRecordings = []
        myRecordingsMetadata.forEach((meta, i) => {
            const metaIndex = i
            myRecordingsURL.forEach((url, i) => {
                if (i === metaIndex) {
                    getURL = url
                }
            })
            getMeta = meta
            const newListing = {meta: getMeta, url: getURL}
            getRecordings.push(newListing)
        })
    
        getRecordings.sort(function compare(a, b) {
            var dateA = new Date(a.meta.timeCreated);
            var dateB = new Date(b.meta.timeCreated);
            return dateA - dateB;
        })

        setMyRecordings(getRecordings.reverse())
    }
    
    const updateList = () => {
        // console.log("update")
        setLoadingComplete(false)
        fetchRecordings()
        setRecordings()
        setLoadingComplete(true)
    }

    useEffect(() => {
        setTimeout(()=> {
            updateList()
        }, 1000)
    }, [])

    useEffect(() => {
        let getMeta, getURL
        const getRecordings = []
        myRecordingsMetadata.forEach((meta, i) => {
            const metaIndex = i
            myRecordingsURL.forEach((url, i) => {
                if (i === metaIndex) {
                    getURL = url
                }
            })
            getMeta = meta
            const newListing = {meta: getMeta, url: getURL}
            getRecordings.push(newListing)
        })
    
        getRecordings.sort(function compare(a, b) {
            var dateA = new Date(a.meta.timeCreated);
            var dateB = new Date(b.meta.timeCreated);
            return dateA - dateB;
        })

        setMyRecordings(getRecordings.reverse())
        // updateList()
    }, [loadingComplete])

    const handleDeleteRecording = (recording) => {
        const deleteRef = firebase.storage().ref(recording.meta.fullPath)
        deleteRef.delete().then(() => {
            updateList()
            const newUpdate = update + 1
            setTimeout(()=> {
                setUpdate(newUpdate)
            }, 500)
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(()=> {
        updateList()
    }, [update, updateTwo])
    
    return (
        <div className="recordings-container">
                <h1>My Recordings</h1>
                <ul>
                    {loadingComplete && <button onClick={updateList}>Update list</button>}
                    {loadingComplete ? (
                        myRecordings.map((recording, index) => (
                            <li className="recording-card" key={index}>
                                <div className="delete-recording-button" onClick={()=>handleDeleteRecording(recording)}><CloseIcon/></div>
                                <h2>{recording.meta.name.substring(0, recording.meta.name.length - 4)}</h2>
                                <span>
                                    <Moment format="MMMM Do, YYYY">{recording.meta.timeCreated}</Moment>
                                </span>
                                <span>
                                    <Moment format="LT">{recording.meta.timeCreated}</Moment>
                                </span>
                                <audio src={recording.url} controls="controls" />
                            </li>
                        ))
                        ): 
                        <div>Loading</div>
                    }
                    {myRecordings.length === 0 && loadingComplete && (
                        <div>
                            <p>You do not have any recordings saved...</p> 
                            <p>Click above to create your first recording</p>
                        </div>
                    )
                    }
                </ul>
        </div>
    )
}
