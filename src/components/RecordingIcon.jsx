import { RecordIcon } from "../icons/RecordIcon"

export const RecordingIcon = ({isRecording, stopRecording, recordTimer, record}) => {
    return (
        <>
            {isRecording ? (
                <div className="record-icon" onClick={stopRecording}>
                    <h1 className="recording-text">Recording</h1>
                    <div className="is-recording">
                        <RecordIcon width="81.543" height="122.316" isRecording={isRecording} />
                    </div>
                    <p>Click mic to stop recording</p>
                    <div className="recording-timer">
                        {recordTimer}
                    </div>
                </div>) : (
                <div className="record-icon" onClick={record}>
                    <h1 className="recording-text">Record</h1>
                    <RecordIcon width="81.543" height="122.316" isRecording={isRecording} />
                    <p>Click mic to start recording</p> 
                </div> )
            }
        </>
    )
}
