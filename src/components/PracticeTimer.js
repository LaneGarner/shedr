import "./PracticeTimer.css";

export const PracticeTimer = ({ setStartDate, setPracticeTime, timerStarted, setTimerStart, timerRunning, setTimerRunning, timerPaused, setTimerPaused, tInterval, setTInterval, timer, setTimer, differenceState, setDifferenceState }) => {
    
    let startTime
    
    const start = () => {
        if(!timerStarted){
            setTimerStart(true)
        } 
        startTime = new Date().getTime()
        setStartDate(Date.now())
        setTInterval(setInterval(getTime, 1000))
        setTimerRunning(true);
        setTimerPaused(false);
    }
    
    const getTime = () => {
        let difference;
        const updatedTime = new Date().getTime();
            if (differenceState){
                difference = (updatedTime - startTime) + differenceState
                setDifferenceState(difference)
            } else {
                difference = (updatedTime - startTime)
                setDifferenceState(difference)
            }

            let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            hours = (hours < 10) ? `0${hours}` : hours;
            minutes = (minutes < 10) ? `0${minutes}` : minutes;
            seconds = (seconds < 10) ? `0${seconds}` : seconds;

            setTimer(`${hours}:${minutes}:${seconds}`)
    }

    const pause = () => {
            if (!timerPaused) {
                setTimerRunning(false)
                setTimerPaused(true)
                clearInterval(tInterval)
            } else {
                setTimerPaused(!timerPaused)
                start()
            }
    }

    const stop = () => {
        if(!timerPaused) {
            pause()
        }
        const hrs = timer.slice(0,2)
        const min = timer.slice(3,5)
        const sec = timer.slice(6,8)
        const pTime= [hrs, min, sec]
        setPracticeTime(pTime)
        setTimerStart(false)
        setTimer("00:00:00")
        setTimerPaused(false)
        setDifferenceState(null)
    }

    // const reset = () => {
    //     setTimerStart(false)
    //     setTimerRunning(false)
    // }

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
