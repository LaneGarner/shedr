export const RecordIcon = ({hover, activePage, isRecording, width, height}) => <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 27.181 40.772"><g id="noun_recording_1614610" transform="translate(196.384 -984.924)"><g id="Group_23" data-name="Group 23" transform="translate(-222.384 18.562)"><path id="Path_11" data-name="Path 11" d="M39.59,966.362a8.5,8.5,0,0,0-8.494,8.494v12.458a8.494,8.494,0,1,0,16.988,0V974.856A8.5,8.5,0,0,0,39.59,966.362Zm0,2.265a6.191,6.191,0,0,1,6.229,6.229v12.458a6.229,6.229,0,1,1-12.458,0V974.856A6.191,6.191,0,0,1,39.59,968.627ZM27.15,980.519a1.178,1.178,0,0,0-1.15,1.15v5.663a13.574,13.574,0,0,0,12.458,13.537v4h-4.53a1.133,1.133,0,1,0,0,2.265H45.253a1.133,1.133,0,1,0,0-2.265h-4.53v-4a13.574,13.574,0,0,0,12.458-13.537v-5.663a1.133,1.133,0,1,0-2.265,0v5.663a11.325,11.325,0,0,1-22.651,0v-5.663a1.177,1.177,0,0,0-1.115-1.15Z" fill={isRecording ? "tomato" : activePage === "record" || hover === "record" ? "orange" : "#707070"}/></g></g></svg>