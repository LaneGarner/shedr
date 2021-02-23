import React from 'react'

import "./RepList.css"

export const RepList = () => {
    return (
        <div className="rep-list-container">
            <h1>Repertoire List</h1>
            <input className="rep-search-field" type="text" placeholder="Filter by song by title, artist, composer, etc..." rows="5" />
            <button>Add</button>
            <table className="rep-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist/Composer</th>
                        <th>Style</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>All The Small Things</td>
                        <td>Blink-182</td>
                        <td>Pop punk</td>
                        <td>🤘</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}