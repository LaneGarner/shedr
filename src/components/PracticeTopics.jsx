import { useState, useEffect } from "react"

import { Doughnut, Bar } from "react-chartjs-2"

import "./Stats.scss"
import "./PracticeTopics.scss"


export const PracticeTopics = ({ logs, user }) => {
    const [ topics, setTopics ] = useState([])
    
    const data = {
        labels: [...topics],
        // labels: ['Pentatonics', 'Song review', 'New repertoire', 'Blues', 'Melodic minor scales', 'Arpeggios'],
        datasets: [
        {
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
            "tomato",
            "orange",
            "dodgerblue",
            "aqua",
            "blueviolet",
            "coral",
            "tomato",
            "orange",
            "dodgerblue",
            "tomato",
            "orange",
            "dodgerblue",
            "tomato",
            "orange",
            "dodgerblue",
            "tomato",
            "orange",
            "dodgerblue",
            "tomato",
            "orange",
            "dodgerblue",
            "tomato",
            "orange",
            "dodgerblue",
            // 'rgb(75, 192, 192)',
            // 'rgb(153, 102, 255)',
            // 'rgb(255, 159, 64)',
            ],
            borderColor: [
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
            
            ],
            borderWidth: 1,
        },
        ],
    }
    const data2 = {
        // labels: [...topics],
        //pass array of timestamps to labels
        labels: ['5/21/2021', '5/22/2021', '5/23/2021', '5/24/2021', '5/25/2021', '5/26/2021', '5/27/2021'],
        datasets: [
        {
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
            "orange",
            "orange",
            "orange",
            "orange",
            "orange",
            "orange",
            // 'rgb(75, 192, 192)',
            // 'rgb(153, 102, 255)',
            // 'rgb(255, 159, 64)',
            ],
            borderColor: [
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
                "#333",
            
            ],
            borderWidth: 1,
        },
        ],
    }
    
    useEffect(() => {
        if (user) {
            const topicsList = []
            const list = logs
            list.forEach(item => {
                topicsList.push(item.practiceTopicNotes.topic)
            })
            setTopics(topicsList)
        }
    }, [logs])

    return (
        <div style={{width: 500}}>
            {topics && (
            <div className="practice-topics">
            <Doughnut data={data} />
            <h3 style={{textAlign: "center"}}>Practice minutes this week</h3>
            <Bar
                data={data2}
                width={50}
                height={25}
                // options={{ maintainAspectRatio: false }}
            />
            </div>
            )}

        </div>
    )
}
