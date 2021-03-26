import { useEffect, useContext, useState } from "react"
import { StoreContext } from "../Store"

import DatePicker from "react-datepicker"
import TextareaAutosize from "react-textarea-autosize"

import { CloseIcon } from "../icons/CloseIcon"
import { EditIcon } from "../icons/EditIcon"

import "./PracticeLog.scss"

let selectedLog

export const PracticeLog = () => {
    const { user, logs, setLogs, removeLog, firebase } = useContext(StoreContext)
    const [ deleteLogModal, setDeleteLogModal] = useState(false)
    const [ editLogModal, setEditLogModal] = useState(false)
    const [ modalOpen, setModalOpen ] = useState(false)
    const [ newStartDate, setNewStartDate ] = useState()
    const [ newTopic, setNewTopic ] = useState()
    const [ newNotes, setNewNotes ] = useState()
    const [ newPracticeTime, setNewPracticeTime ] = useState()

    useEffect(() => {
        if(user) {        
        const logsRef = firebase.database().ref('logs/' + user.uid);
        logsRef.orderByChild("startDate").on('value', (snapshot) => {
            let logs = snapshot.val();
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
                    })
                }
                newState.sort(function compare(a, b) {
                    var dateA = new Date(a.startDate)
                    var dateB = new Date(b.startDate)
                    return dateA - dateB;
                })
                setLogs(newState.reverse())
            });
        }
    }, [user, setLogs])
    
    useEffect(()=> {
        if (deleteLogModal || editLogModal ) {
            setModalOpen(true)
        } else {
            setModalOpen(false)
        }
    }, [ deleteLogModal, editLogModal]);
    
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [modalOpen])

    const handleDeleteLog = (log) => {
        setDeleteLogModal(true)
        selectedLog = log
    }

    const confirmDeleteLog = () => {
        removeLog(selectedLog)
        setDeleteLogModal(false)
    }

    const handleEditLog = (log) => {
        let startDt = log.startDate
        startDt = startDt.replace(/['"]+/g, '')
        let startTm = log.startTime
        startTm = startTm.replace(/['"]+/g, '')
        const startDateTime = `${startDt} ${startTm}`
        // setNewStartDate(startDateTime);
        setNewStartDate(Date.parse(startDateTime));
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
            <h1>Practice log</h1>
            {logs.length === 0 && 
                <div>
                    <p>You do not have any saved logs</p> 
                    <p>Create your first log above</p>
                </div>
        }
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
                            <span>{log.practiceTime[0]}hrs {log.practiceTime[1]}min {log.practiceTime[2]}sec</span>
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
                        <button className="modalBtn skip" onClick={()=>setDeleteLogModal(false)}>Back</button>
                        <button className="modalBtn cancel" onClick={confirmDeleteLog}>Delete</button>
                    </div>
                </div> ) 
            }
            {editLogModal && (
                <div className="modal-container">
                    <div className="modal">
                        <form onSubmit={confirmEditLog}>
                            {typeof selectedLog !== undefined && 
                            <div>
                                <label htmlFor="datepicker">Start time</label><br/>
                                    <DatePicker
                                        selected={newStartDate}
                                        onChange={setNewStartDate}
                                        id="datepicker"
                                        showTimeSelect
                                        timeIntervals={1}
                                        dateFormat="Pp"
                                    />
                                    <br/>
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
                                <button className="modalBtn cancel" type="button" onClick={()=>setEditLogModal(false)}>Cancel</button>
                                <button className="modalBtn submit" type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>)
            }
        </div>
    )
}