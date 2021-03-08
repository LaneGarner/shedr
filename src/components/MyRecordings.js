import React, { useState, useEffect, useContext } from 'react'
import { StoreContext } from "../Store";
import "./MyRecordings.css"

export const MyRecordings = () => {
    const { firebase, user } = useContext(StoreContext)
    
    let userId, storageRef, listRef, recordingsList;


    useEffect(()=>{
        if(user) {
            userId= user.uid;
            storageRef = firebase.storage().ref();
            listRef = storageRef.child(`audio/${userId}`);
            // console.log(listRef)
            listRef.listAll()
                .then((res) => {
                    res.prefixes.forEach((folderRef) => {
                        // console.log(folderRef)
                    // All the prefixes under listRef.
                    // You may call listAll() recursively on them.
                    });
                    res.items.forEach((itemRef) => {
                        recordingsList = itemRef
                        console.log(recordingsList)
                    // All the items under listRef.
                    });
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                });
                        }
    }, [user])

    return (
        <div className="recordings-container">
            <h1>My Recordings</h1>
            <ul>
            {user && (
                <li></li>
            )}
            </ul>
        </div>
    )
}
