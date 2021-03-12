import React, { useState, useEffect, useContext } from 'react'

import Moment from 'react-moment';
import 'moment-timezone';

import { StoreContext } from "../Store"

import "./MyRecordings.scss"
Moment.globalLocal = true;

export const MyRecordings = () => {
    const { firebase, user } = useContext(StoreContext)
    const [ myRecordings, setMyRecordings ] = useState([])
    const [ myRecordingsURL, setMyRecordingsURL ] = useState([])
    const [ myRecordingsMetadata, setMyRecordingsMetadata ] = useState([])
    const [ loadingComplete, setLoadingComplete] = useState(false)
    
    let userId, storage, listRef, recordingsList

    useEffect(() => {
        if(user) {
            const URLs = []
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
                    setLoadingComplete(true)
                })
                Promise.all(urlPromise).then((data) => {
                    setMyRecordingsURL(data)
                    setLoadingComplete(true)
                })
            })
        }
    }, [user])


    useEffect(() => {
        let getMeta, getURL
        const getRecordings = []
        myRecordingsMetadata.map((meta, i) => {
            const metaIndex = i
            myRecordingsURL.map((url, i) => {
                if (i === metaIndex) {
                    getURL = url
                }
            })
            getMeta = meta
            const newListing = {meta: getMeta, url: getURL}
            getRecordings.push(newListing)
        })
        setMyRecordings(getRecordings.reverse())
    }, [loadingComplete])

    useEffect(()=>{
        console.log(myRecordings)
    }, [myRecordings])

    return (
        <div className="recordings-container">
            <h1>My Recordings</h1>
            <ul>
                {loadingComplete === true && (
                    myRecordings.map((recording, index) => (
                        <li className="recording-card" key={index}>
                            {console.log(recording)}
                            <h2>{recording.meta.name.substring(0, recording.meta.name.length - 4)}</h2>
                            <audio src={recording.url} controls="controls" />
                            <span>
                                <Moment format="MMMM Do, YYYY">{recording.meta.timeCreated}</Moment>
                            </span>
                            <span>
                                <Moment format="LT">{recording.meta.timeCreated}</Moment>
                            </span>
                        </li>
                    ))
                    )
                }
            </ul>
        </div>
    )
}
