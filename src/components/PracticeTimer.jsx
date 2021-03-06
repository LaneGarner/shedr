import "./PracticeTimer.scss"

export const PracticeTimer = ({ pause, setStopSessionModal, setStartSessionModal, timerStarted, timerRunning, timerPaused, timer }) => {

    const start = () => {
        setStartSessionModal(true)
    }
    
    const stop = () => {
        if(!timerPaused) {
            pause()
        }
        setStopSessionModal(true)
    }
    
    return (
        <>
            <div className="timerDisplay">
                {timer}
            </div>
            <br />
            <div>
                {timerRunning && <button className="timerBtn pauseBtn" onClick={pause}>Pause</button>}
                {timerPaused && <button className="timerBtn pauseBtn" onClick={pause}>Resume</button>}
                {timerStarted ? <button className="timerBtn stopBtn" onClick={stop}>Stop</button> : <button className="timerBtn startBtn" onClick={start}>Start</button>}
            </div>
        </>
    )
}
