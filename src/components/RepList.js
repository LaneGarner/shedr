import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../Store';

import "./RepList.css"

export const RepList = () => {
    const [ newTitle, setNewTitle ] = useState("");
    const [ newArtist, setNewArtist ] = useState("");
    const [ newStyle, setNewStyle ] = useState("");
    const [ newNotes, setNewNotes ] = useState("");
    const [ addRepModal, setAddRepModal ] = useState(false);
    const [ modalOpen, setModalOpen ] = useState(false)
    const [ filterRepertoire, setFilterRepertoire ] = useState(false)
    const [ filterSearch, setFilterSearch ] = useState("");
    const [ rep, setRep ] = useState([]);

    const { user, firebase, setActivePage } = useContext(StoreContext)

    let userId
    if(user) {
        userId = user.uid
    } else {
        userId = null
    }

    const confirmAddRep = (e) => {
        e.preventDefault();
        const repRef = firebase.database().ref("repertoire/" + userId);
        const newRep = { title: newTitle, artist: newArtist, style: newStyle, notes: newNotes };
        repRef.push(newRep);

        setNewTitle("");
        setNewArtist("");
        setNewStyle("");
        setNewNotes("");
        setAddRepModal(false);
    }
    
    useEffect(()=> {
        if (addRepModal) {
            setModalOpen(true)
        } else {
            setModalOpen(false)
        }
    }, [addRepModal]);
    
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [modalOpen]);
    
    useEffect(() => {
        if(user) {        
            const repertoireRef = firebase.database().ref('repertoire/' + user.uid);
            repertoireRef.on('value', (snapshot) => {
                const songs = snapshot.val();
                let newState = [];
                for (let song in songs) {
                    newState.push({
                        title: songs[song].title,
                        artist: songs[song].artist,
                        style: songs[song].style,
                        notes: songs[song].notes,
                        });
                    }
                setRep(newState);
            });
        }
    }, [user]);

    useEffect(()=>{
        if(rep.length != 0) {

            console.log(rep)
        }
    }, [rep])
    
    //set active page for header/footer
    // setActivePage("user");
    
    //scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="rep-list-container">
            <h1>Repertoire List</h1>
            <div>
                <button className="timerBtn submitBtn" onClick={()=>setAddRepModal(true)}>Add</button>
                <button className="timerBtn cancelBtn" onClick={()=>setFilterRepertoire(!filterRepertoire)}>Filter</button>
            </div>
            {filterRepertoire && (
                <div>
                    <label className="sr-only" htmlFor="filterRep">Filter</label>
                    <input value={filterSearch} onChange={e=>setFilterSearch(e.target.value)} className="rep-search-field" type="text" id="filterRep" placeholder="Filter by song by title, artist, composer, etc..." rows="5" />
                </div>
            )}
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
                    {rep.length !== 0 && (
                        rep.map((song, id)=> (
                            <tr key={id}>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.style}</td>
                                <td>{song.notes}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {addRepModal && (
                <div className="modal-container">
                    <div className="modal">
                        <form className="add-rep" onSubmit={confirmAddRep}>
                        <h2>Add new song</h2>
                            <label htmlFor="title">Title</label>
                            <input value={newTitle} onChange={e=>setNewTitle(e.target.value)} id="title" type="text"/>
                            <label htmlFor="artistComposer">Artist/Composer</label>
                            <input value={newArtist} onChange={e=>setNewArtist(e.target.value)} id="artistComposer" type="text"/>
                            <label htmlFor="style">Style</label>
                            <input value={newStyle} onChange={e=>setNewStyle(e.target.value)} id="style" type="text"/>
                            <label htmlFor="title">Notes</label>
                            <input value={newNotes} onChange={e=>setNewNotes(e.target.value)} id="notes" type="text"/>
                            <div>
                                <button className="timerBtn stopBtn" onClick={()=>setAddRepModal(false)}>Cancel</button>
                                <button type="submit" className="timerBtn startBtn">Add</button>
                            </div>
                        </form>
                    </div>
                </div>) 
            }
        </div>
    )
}