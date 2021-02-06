import React, { useState, useRef } from 'react'
import "./PracticeTimer.css";

export const PracticeTimer = () => {
    const [timerStarted, setTimerStart] = useState(false)
    
    const [timerRunning, setTimerRunning] = useState(false)
    const [timerPaused, setTimerPaused] = useState(false)
    // const [startTime, setStartTime] = useState()
    const [tInterval, setTInterval] = useState()

    const [timer, setTimer] = useState("00:00:00")
    const [differenceState, setDifferenceState] = useState()
    // const [savedTime, setSavedTime] = useState()

    let startTime, savedTime
    // let updatedTime, difference;

    const test = () => {
        // const actualTime = getTime();
        // console.log(actualTime)
    }
    
    const start = () => {
        {!timerStarted && setTimerStart(true)}
        startTime = new Date().getTime()

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
        {!timerPaused && pause()}
        // pause()
        setTimerStart(false)
        // setTimerRunning(false)
        setTimer("00:00:00")
        setTimerPaused(false)
        setDifferenceState(null)
        // setTimerPaused()
        // {timerPaused && setTimerPaused(!timerPaused)}


        // window.confirm('Are you sure? This will end your session and add current practice time to your log')
        // reset()
    }

    const reset = () => {
        setTimerStart(false)
        setTimerRunning(false)




    //     clearInterval(tInterval);
    // savedTime = 0;
    // difference = 0;
    // paused = 0;
    // running = 0;
    }

//     const getShowTime = () => {
//         updatedTime = new Date().getTime();

//         // if (savedTime){
//         //   difference = (updatedTime - startTime) + savedTime;
//         // } else {
//         //   difference =  updatedTime - startTime;
//         // }
//         let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//         let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
//         hours = (hours < 10) ? `0${hours}` : hours;
//         minutes = (minutes < 10) ? `0${minutes}` : minutes;
//         seconds = (seconds < 10) ? `0${seconds}` : seconds;

//         setTimer(`${hours}:${minutes}:${seconds}`)
// }


    return (
                <>
                    <div className="timerDisplay">
                        {timer}
                    {/* <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />  */}
                    </div>
                    
                    {/* <div>{timerState}</div> */}
                    <br />
                    <div>
                        {timerStarted ? <><button className="timerBtn stopBtn" onClick={stop}>Stop</button><br/></> : <><button className="timerBtn startBtn" onClick={start}>Start</button><br /></>}
                        
                        {timerRunning && <><button className="timerBtn pauseBtn" onClick={pause}>Pause</button><br /></>}
                        {/* <button onClick={start}>Start</button> */}
                        {/* <button onClick={pause}>Pause</button> */}
                        {timerPaused && <><button className="timerBtn pauseBtn" onClick={pause}>Resume</button><br /></>}
                        
                        {/* <button onClick={()=>test(getTime)}>Test</button> */}
                        {/* {timerStarted && <button className="timerBtn resetBtn" onClick={reset}>Reset</button>} */}
                        
                    </div>
                </>
            )




        // <Timer
        //     formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
        //     // initialTime={55000}
        //     startImmediately={false}
        //     onStart={handleStart}
        //     onResume={handlePause}
        //     onPause={handlePause}
        //     // onChange={()=>setTimer(`${<Timer.Hours />}:${<Timer.Minutes />}:${<Timer.Seconds />}`)}
        //     // onStop={handleStop}
        //     onReset={handleStop}

        //     checkpoints={[
        //         {
        //             time: 2000,
        //             callback: () => console.log('Checkpoint A'),
        //         },
        //         {
        //             time: 60000 * 60 * 48 - 5000,
        //             callback: () => console.log('Checkpoint B'),
        //         }
        //     ]}

        // >
        //     {({ start, resume, pause, stop, reset, getTime, timerState, getTimerState }) => (
        //         <>
        //             <div className="timerDisplay" ref={inputEl}>
        //             <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds /> 
        //             </div>
                    
        //             {/* <div>{timerState}</div> */}
        //             <br />
        //             <div>
        //                 {timerStarted ? <><button className="timerBtn stopBtn" onClick={() => {
        //                     window.confirm('Are you sure? This will end your session and add current practice time to your log')
        //                         {timerPaused && setTimerPaused(!timerPaused)}
        //                         // setPracticeTime(Timer)
        //                         // console.log(inputEl.current.slice(0, 4))
        //                         handleStop()
        //                         stop()
        //                         reset()
                            
        //                     // if(window.confirm('Are you sure? This will end your session add current practice time to your log')) {
        //                     //     {timerPaused && setTimerPaused(!timerPaused)}
        //                     //     handleStop()
        //                     //     stop()
        //                     //     reset()
        //                     // }
        //                 }}>Stop</button><br/></> : <><button className="timerBtn startBtn" onClick={start}>Start</button><br /></>}
                        
        //                 {timerRunning && <><button className="timerBtn pauseBtn" onClick={pause}>Pause</button><br /></>}
        //                 {/* <button onClick={start}>Start</button> */}
        //                 {/* <button onClick={pause}>Pause</button> */}
        //                 {timerPaused && <><button className="timerBtn pauseBtn" onClick={resume}>Resume</button><br /></>}
                        
        //                 <button onClick={()=>test(getTime)}>Test</button>
        //                 {/* {timerStarted && <button className="timerBtn resetBtn" onClick={reset}>Reset</button>} */}
                        
        //             </div>
        //         </>
        //     )}
        // </Timer>

    // )
}
