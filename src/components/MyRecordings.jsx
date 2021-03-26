import { useState, useEffect, useContext } from "react"
import { StoreContext } from "../Store"

import Moment from "react-moment"
import "moment-timezone"
import Loader from "react-loader-spinner";

import { CloseIcon } from "../icons/CloseIcon"

import "./MyRecordings.scss"

Moment.globalLocal = true

let selectedRecording

export const MyRecordings = ({loadingComplete, setLoadingComplete, update, setUpdate, updateTwo, setRecordingNames}) => {
    const { firebase, user } = useContext(StoreContext)
    const [ myRecordings, setMyRecordings ] = useState([])
    const [ myRecordingsURL, setMyRecordingsURL ] = useState([])
    const [ myRecordingsMetadata, setMyRecordingsMetadata ] = useState([])
    // const [ loadingComplete, setLoadingComplete] = useState(false)
    const [ deleteRecordingModal, setDeleteRecordingModal] = useState(false)
    const [ modalOpen, setModalOpen ] = useState(false)
    const [ loadingSpinner, setLoadingSpinner ] = useState(false)
    
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
                // setLoadingComplete(true)
            })
        })
    }

    useEffect(()=> {
        const names = []
        if (loadingComplete) {
            myRecordings.forEach((recording) => {
                names.push(recording.meta.name)
            })
            setRecordingNames(names)
        }
    }, [myRecordings])
    
    useEffect(() => {
        if(user) {
            fetchRecordings()
            updateList()
        }
    }, [])

    useEffect(()=> {
        if (deleteRecordingModal ) {
            setModalOpen(true)
        } else {
            setModalOpen(false)
        }
    }, [ deleteRecordingModal])
    
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [modalOpen])


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
        fetchRecordings()
        setRecordings()
    }

    useEffect(() => {
        setTimeout(()=> {
            updateList()
            setLoadingComplete(true)
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
        setDeleteRecordingModal(true)
        selectedRecording = recording
    }

    const deleteRecording = () => {
        setDeleteRecordingModal(false)
        const deleteRef = firebase.storage().ref(selectedRecording.meta.fullPath)
        deleteRef.delete().then(() => {
            updateList()
            setLoadingSpinner(true)
            const newUpdate = update + 1
            setTimeout(()=> {
                setUpdate(newUpdate)
                setLoadingSpinner(false)
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
                    {loadingComplete && <button className="modalBtn skip" onClick={updateList}>Update list</button>}
                    {loadingComplete ? (
                        myRecordings.map((recording, index) => (
                            <li className="recording-card" key={index}>
                                {loadingSpinner && selectedRecording ? 
                                    <Loader className="delete-recording-button" type="ThreeDots" color="dodgerblue" height={30} width={30}/> :
                                    <div className="delete-recording-button" onClick={()=>handleDeleteRecording(recording)}><CloseIcon/></div>
                                }
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
                        <div>
                            <Loader type="ThreeDots" color="dodgerblue" height={30} width={30} />
                            <p>Loading</p>
                        </div>
                    }
                    {myRecordings.length === 0 && loadingComplete && (
                        <div>
                            <p>You do not have any recordings saved...</p> 
                            <p>Click above to create your first recording</p>
                        </div>
                    )
                    }
                </ul>
                {deleteRecordingModal && (
                <div className="modal-container">
                    <div className="modal">
                        <h2>Are you sure?</h2>
                        <p>This will permanently delete this recording</p>
                        <button className="modalBtn skip" onClick={()=>setDeleteRecordingModal(false)}>Back</button>
                        <button className="modalBtn cancel" onClick={deleteRecording}>Delete</button>
                    </div>
                </div>) 
            }
        </div>
    )
}
