import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from '../Store'
import { RecordIcon } from "../icons/RecordIcon";
import MicRecorder from 'mic-recorder-to-mp3';

// window.AudioContext = window.AudioContext || window.webkitAudioContext;
const recorder = new MicRecorder({ bitRate: 128 });

export const Record = () => {
    const { setActivePage, isRecording, setIsRecording, blobURL, setBlobURL, isBlocked, setIsBlocked } = useContext(StoreContext)
    // const [ isRecording, setIsRecording ] = useState(false)
    // const [ blobURL, setBlobURL ] = useState("")
    // const [ isBlocked, setIsBlocked ] = useState(false)


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true },
            () => {
            console.log('Permission Granted');
            setIsBlocked(false);
            },
            () => {
            console.log('Permission Denied');
            setIsBlocked(true)
            },
        );
    }, [])
    
    useEffect(() => {
        window.scrollTo(0, 0);
        setActivePage("record")
    }, [])

    const styles = {
        recordContainer: {
            paddingTop: "10em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    }
    // const microphone = () => {
    //     const meter = new Tone.Meter();
    //     const mic = new Tone.UserMedia().connect(meter);
    //     mic.open().then(() => {
    //         // promise resolves when input is available
    //         console.log("mic open");
    //         // print the incoming mic levels in decibels
    //         setInterval(() => setMicLevel(meter.getValue()), 100);
    //     }).catch(e => {
    //         // promise is rejected when the user doesn't have or allow mic access
    //         console.log("mic not open");
    //     });
    // }

    const record = () => {
        if (isBlocked) {
            console.log('Permission Denied');
        } else {
            recorder
            .start()
            .then(() => {
                setIsRecording(true);
            }).catch((e) => console.error(e));
        }
    }

    const stopRecording = () => {
        recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
            const newBlobURL = URL.createObjectURL(blob)
            setBlobURL(newBlobURL)
            setIsRecording(false)
            // this.setState({ blobURL, isRecording: false });
        }).catch((e) => console.log(e));
    };
    

    return (

        

        <div style={styles.recordContainer}>
            <RecordIcon />
            <h1>Record</h1>
            {isRecording ? 
            <button onClick={stopRecording}>Stop</button> :
            <button onClick={record}>Record</button>
            }
            <audio src={blobURL} controls="controls" />
            {/* <h2>My recordings</h2>
            <h2>Audio</h2>
            <h2>Video</h2>
            <h2>Looper</h2> */}
        </div>
    )
}