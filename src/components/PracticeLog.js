import React, { useEffect, useContext, useState } from 'react'
// import firebase from 'firebase'
import "./PracticeLog.css";
import { CloseIcon } from "../icons/CloseIcon"
import { EditIcon } from "../icons/EditIcon"
import { LogIcon } from "../icons/LogIcon"
import { Link } from 'react-router-dom'
import { StoreContext } from '../Store'
import DatePicker from "react-datepicker";
import TextareaAutosize from 'react-textarea-autosize';


let selectedLog;

export const PracticeLog = () => {
    const { user, logs, setLogs, removeLog, firebase } = useContext(StoreContext)
    const [ deleteLogModal, setDeleteLogModal] = useState(false)
    const [ editLogModal, setEditLogModal] = useState(false)
    const [ modalOpen, setModalOpen ] = useState(false)
    const [ newStartDate, setNewStartDate ] = useState()
    const [ newStartTime, setNewStartTime ] = useState()
    const [ newTopic, setNewTopic ] = useState()
    const [ newNotes, setNewNotes ] = useState()
    const [ newPracticeTime, setNewPracticeTime ] = useState()


    useEffect(() => {
        if(user) {        
        const logsRef = firebase.database().ref('logs/' + user.uid);
        logsRef.orderByChild("startDate").on('value', (snapshot) => {
            let logs = snapshot.val();
            // const sortedActivities = logs.sort((a, b) => b.startDate - a.startDate)
            let newState = [];
            for (let log in logs) {
                let thisDate = new Date(logs[log].startDate).toLocaleDateString()
                thisDate = thisDate.replace(/"/g,"")
                let thisTime = new Date(logs[log].startDate).toLocaleTimeString()
                newState.push({
                    id: log,
                    startDate: JSON.stringify(thisDate),
                    startTime: JSON.stringify(thisTime),
                    practiceTime: logs[log].practiceTime,
                    practiceTopicNotes: logs[log].practiceTopicNotes,
                    userId: logs[log].userId,
                    });
                }
                setLogs(newState)
            });
        }
    }, [user, setLogs])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    useEffect(()=> {
        if (deleteLogModal || editLogModal ) {
            setModalOpen(true)
        } else {
            setModalOpen(false)
        }
    }, [ deleteLogModal, editLogModal]);
    
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [modalOpen]);


    const handleDeleteLog = (log) => {
        setDeleteLogModal(true)
        selectedLog = log;
    }

    const confirmDeleteLog = () => {
        removeLog(selectedLog)
        setDeleteLogModal(false)
    }

    // const editLog = () => {
    //     alert('edit feature coming soon...')
    // }

    const handleEditLog = (log) => {
        const startDateTime = `${log.startDate} ${log.startTime}`
        setNewStartDate(startDateTime);
        setNewNotes(log.practiceTopicNotes.notes);
        setNewTopic(log.practiceTopicNotes.topic);
        setNewPracticeTime(log.practiceTime)
        setEditLogModal(true);
        selectedLog = log;
    }
    
    const confirmEditLog = () => {
        editLog(selectedLog);
        setEditLogModal(false);
    }
    
    const editLog = (log) => {
        const logId = log.id
        const userId = log.userId
        const logRef = firebase.database().ref(`/logs/${userId}/${logId}`);
        const updatedLog = {userId, practiceTopicNotes: {notes: newNotes, topic: newTopic } , startDate: newStartDate, practiceTime: newPracticeTime };
        logRef.update(updatedLog);        
    }

    const setNewHrs = (e) => {
        const hours = e.target.value.padStart(2, "0")
        const minutes = newPracticeTime[1]
        const seconds = newPracticeTime[2]
        const updatePracticeTime = [hours, minutes, seconds]
        setNewPracticeTime(updatePracticeTime)
    }

    const setNewMin = (e) => {
        const hours = newPracticeTime[0]
        const minutes = e.target.value.padStart(2, "0")
        const seconds = newPracticeTime[2]
        const updatePracticeTime = [hours, minutes, seconds]
        setNewPracticeTime(updatePracticeTime)
    }

    const setNewSec = (e) => {
        const hours = newPracticeTime[0]
        const minutes = newPracticeTime[1]
        const seconds = e.target.value.padStart(2, "0")
        const updatePracticeTime = [hours, minutes, seconds]
        setNewPracticeTime(updatePracticeTime)
    }
    
    return (
        <div className="logContainer">
            <LogIcon />
            <h1>Practice log</h1>
            {logs.length === 0 && <Link to="/">Click here to create your first log</Link>}
            <div className="log-grid">
                {logs.map((log, idx) => (
                    <div key={log.id} id={log.id} className="log-card">
                        <div id={log.id} className="log-card-header">
                            <div>
                                <div className="edit-log-btn" onClick={() => handleEditLog(log)}><EditIcon /></div>
                                <div className="remove-log-btn" onClick={() => handleDeleteLog(log.id)}><CloseIcon /></div>
                            </div>
                            <span className="cal-emoji">🗓</span>
                            <h2>{JSON.parse(log.startDate)}</h2>
                    </div>
                        <h2>{JSON.parse(log.startTime)}</h2>
                        <h3>Total practice time:</h3>
                        <span>
                            <span>{log.practiceTime[0]}:{log.practiceTime[1]}:{log.practiceTime[2]}</span>
                        </span><br />
                        <h3>Topic:</h3>
                        <span>{log.practiceTopicNotes.topic}</span>
                        <h3>Notes:</h3>
                        <span>{log.practiceTopicNotes.notes}</span>
                    </div>
                ))}
            </div>
            {deleteLogModal && (
                <div className="modal-container">
                    <div className="modal">
                        <h2>Are you sure?</h2>
                        <p>This will remove this item from your practice log</p>
                        <button className="timerBtn cancelBtn" onClick={()=>setDeleteLogModal(false)}>Cancel</button>
                        <button className="timerBtn stopBtn" onClick={confirmDeleteLog}>Delete</button>
                    </div>
                </div>) 
            }
            {editLogModal && (
                <div className="modal-container">
                    <div className="modal">
                        <form onSubmit={confirmEditLog}>
                            {typeof selectedLog !== undefined && 
                            
                            <div>
                                <label htmlFor="datepicker">Start time</label><br/>
                                    <DatePicker
                                        // className="datepicker"
                                        selected={new Date(newStartDate)}
                                        onChange={(e) => setNewStartDate(e)}
                                        id="datepicker"
                                        showTimeSelect
                                        timeIntervals={1}
                                        dateFormat="Pp"
                                    /><br />
                                    <div className="pr-time-input">
                                        <h4>Total practice time:</h4>
                                        <input value={newPracticeTime[0]} onChange={setNewHrs} type="number" id="newHrs" name="newHrs" min="0" max="99"></input>
                                        <label htmlFor="newHrs">hr</label>
                                        <input value={newPracticeTime[1]} onChange={setNewMin} type="number" id="newMin" name="newMin" min="0" max="60"></input>
                                        <label htmlFor="newMin">min</label>
                                        <input value={newPracticeTime[2]} onChange={setNewSec} type="number" id="newSec" name="newSec" min="0" max="60"></input>
                                        <label htmlFor="newSec">sec</label>
                                    </div>
                                    <label htmlFor="topic">Topic</label><br/>
                                    <TextareaAutosize required value={newTopic} onChange={e=>setNewTopic(e.target.value)} id="topic" /> 
                                    <br />
                                    <label htmlFor="notes">Notes</label><br/>
                                    <TextareaAutosize value={newNotes} onChange={e=>setNewNotes(e.target.value)} id="notes" type="text" minRows="5" />
                                    <br />
                            </div>
                            
                            }
                            <div>
                                <button className="timerBtn cancelBtn" onClick={()=>setEditLogModal(false)}>Cancel</button>
                                <button type="submit" className="timerBtn pauseBtn">Edit</button>
                            </div>
                        </form>
                    

                        {/* <form className="prForm" onSubmit={confirmSubmit} >
                            <div className="practice-card-icon">
                                <LogIconSmall />
                            </div>
                            <h1>New Practice Log</h1>
                            <hr />
                            <h2>Session</h2>
                            <div className="start-time-input">
                                
                            </div>
                            <div className="pr-time-input">
                                <h4>Total practice time:</h4>
                                <input value={practiceTime[0]} onChange={setHrs} type="number" id="hrs" name="hrs" min="0" max="99"></input>
                                <label htmlFor="hrs">hr</label>
                                <input value={practiceTime[1]} onChange={setMin} type="number" id="min" name="min" min="0" max="60"></input>
                                <label htmlFor="totalPracticeTime">min</label>
                                <input value={practiceTime[2]} onChange={setSec} type="number" id="min" name="min" min="0" max="60"></input>
                                <label htmlFor="min">sec</label>
                            </div>
                            <h2>Material</h2>
                            <label htmlFor="topic">Topic</label><br/>
                            <TextareaAutosize required value={practiceTopicNotes.topic} onChange={setTopic} id="topic" className="topic-input" placeholder="What are you practicing?" /> 
                            <br />
                            <label htmlFor="notes">Notes</label><br/>
                            <TextareaAutosize value={practiceTopicNotes.notes} onChange={setNotes} id="notes" type="text" placeholder="Add notes like tempos, keys, and goals here..." minRows="5" />
                            <br />
                            <button type="submit" className="timerBtn submitBtn">Submit</button>
                            <button onClick={cancelSubmit} type="reset" className="timerBtn cancelBtn">Cancel</button>
                        </form> */}


{/* <form className="add-rep" onSubmit={confirmAddRep}>
                        <h2>Edit Log</h2>
                            <label htmlFor="title">Title</label>
                            <input value={newTitle} onChange={e=>setNewTitle(e.target.value)} id="title" type="text"/>
                            <label htmlFor="artistComposer">Artist/Composer</label>
                            <input value={newArtist} onChange={e=>setNewArtist(e.target.value)} id="artistComposer" type="text"/>
                            <label htmlFor="style">Style</label>
                            <input value={newStyle} onChange={e=>setNewStyle(e.target.value)} id="style" type="text"/>
                            <label htmlFor="title">Notes</label>
                            <input value={newNotes} onChange={e=>setNewNotes(e.target.value)} id="notes" type="text"/>
                            
                        </form> */}


                    </div>
                </div>)
            }
        </div>
    )
}