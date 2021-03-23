import { useState, useEffect, useContext } from 'react'
import { StoreContext } from '../Store'
import { TrashIcon } from "../icons/TrashIcon"
import { EditIcon } from "../icons/EditIcon"

import "./RepList.scss"

let selectedRep

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
    const [ deleteRepModal, setDeleteRepModal] = useState(false)
    const [ editRepModal, setEditRepModal] = useState(false)

    const { user, firebase } = useContext(StoreContext)

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

    const handleDeleteRep = (id) => {
        setDeleteRepModal(true)
        selectedRep = id;
    }
    
    const confirmDeleteRep = () => {
        removeRep(selectedRep);
        setDeleteRepModal(false);
    }

    const removeRep = (songId) => {
        const songRef = firebase.database().ref(`/repertoire/${user.uid}/${songId}`);
        songRef.remove();
    }

    const handleEditRep = (song) => {
        setNewTitle(song.title)
        setNewArtist(song.artist)
        setNewStyle(song.style)
        setNewNotes(song.notes)
        setEditRepModal(true);
        selectedRep = song.id;
    }
    
    const confirmEditRep = () => {
        editRep(selectedRep);
        setEditRepModal(false);
    }
    
    const editRep = (songId) => {
        const songRef = firebase.database().ref(`/repertoire/${user.uid}/${songId}`);
        const updatedSong = { title: newTitle, artist: newArtist, style: newStyle, notes: newNotes };
        songRef.update(updatedSong); 
        setNewTitle("");
        setNewArtist("");
        setNewStyle("");
        setNewNotes("");       
    }
    
    
    
    useEffect(()=> {
        if (addRepModal || deleteRepModal || editRepModal ) {
            setModalOpen(true)
        } else {
            setModalOpen(false)
        }
    }, [addRepModal, deleteRepModal, editRepModal]);
    
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
                        id: song,
                        title: songs[song].title,
                        artist: songs[song].artist,
                        style: songs[song].style,
                        notes: songs[song].notes,
                        });
                    }
                newState.sort((a,b)=> (a.title > b.title ? 1 : -1))
                setRep(newState);
            });
        }
    }, [user]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="rep-list-container">
            <h1>Repertoire List</h1>
            <div>
                <button className="timerBtn submitBtn" onClick={()=>setAddRepModal(true)}>Add</button>
                {rep.length !== 0 && 
                    <button className="timerBtn cancelBtn" onClick={()=>setFilterRepertoire(!filterRepertoire)}>Filter</button>
                }
            </div>
            {rep.length !== 0 ? (
                <>
                    {filterRepertoire && (
                        <div>
                            <label className="sr-only" htmlFor="filterRep">Filter</label>
                            <input value={filterSearch} onChange={e=>setFilterSearch(e.target.value)} className="rep-search-field" type="text" id="filterRep" placeholder="Filter song by title, artist, composer, etc..." rows="5" />
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
                                rep.map((song)=> (
                                    <tr key={song.id}>
                                        <td>{song.title}</td>
                                        <td>{song.artist}</td>
                                        <td>{song.style}</td>
                                        <td>
                                            <div className="remove-edit-rep">
                                                <div className="rep-icon" onClick={()=>handleEditRep(song)}>
                                                    <EditIcon  />
                                                </div>
                                                <div className="rep-icon" onClick={()=>handleDeleteRep(song.id)}>
                                                    <TrashIcon />
                                                </div>
                                            </div>
                                            <div className="rep-notes">{song.notes}</div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    </>
                ) :
                <div>
                    <p>You do not have any songs saved...</p> 
                    <p>Click above to add your first song</p>
                </div>
            }
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
                                <button type="button" className="modalBtn" onClick={()=>setAddRepModal(false)}>Cancel</button>
                                <button type="submit" className="modalBtn">Add</button>
                            </div>
                        </form>
                    </div>
                </div>)
            }
            {deleteRepModal && (
                <div className="modal-container">
                    <div className="modal">
                        <h2>Are you sure?</h2>
                        <p>This will delete this item from your repertoire list</p>
                        <button className="modalBtn" onClick={()=>setDeleteRepModal(false)}>Cancel</button>
                        <button className="modalBtn" onClick={confirmDeleteRep}>Delete</button>
                    </div>
                </div>)
            }
            {editRepModal && (
                <div className="modal-container">
                    <div className="modal">
                    <form className="add-rep" onSubmit={confirmEditRep}>
                        <h2>Edit Rep</h2>
                            <label htmlFor="title">Title</label>
                            <input value={newTitle} onChange={e=>setNewTitle(e.target.value)} id="title" type="text"/>
                            <label htmlFor="artistComposer">Artist/Composer</label>
                            <input value={newArtist} onChange={e=>setNewArtist(e.target.value)} id="artistComposer" type="text"/>
                            <label htmlFor="style">Style</label>
                            <input value={newStyle} onChange={e=>setNewStyle(e.target.value)} id="style" type="text"/>
                            <label htmlFor="title">Notes</label>
                            <input value={newNotes} onChange={e=>setNewNotes(e.target.value)} id="notes" type="text"/>
                            <div>
                                <button type="button" className="modalBtn" onClick={()=>setEditRepModal(false)}>Cancel</button>
                                <button type="submit" className="modalBtn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>)
            }
        </div>
    )
}
