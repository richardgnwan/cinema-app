import { useState, useEffect } from "react";
import "./App.css";
import { query, where } from "firebase/firestore";
import {db} from './config/auth/firebase'
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import Modal from '@material-ui/core/Modal';
import React from 'react';

function AdminMovie() {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const [newTitle, setNewTitle] = useState("");
    const [newSynopsis, setNewSynopsis] = useState("");
    const [newPoster, setNewPoster] = useState("");
    const [newDuration, setNewDuration] = useState(0);

    const [updateId, setUpdateId] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateSynopsis, setUpdateSynopsis] = useState("");
    const [updatePoster, setUpdatePoster] = useState("");
    const [updateDuration, setUpdateDuration] = useState(0);

    const [movies, setMovies] = useState([]);
    const usersCollectionRef = collection(db, "movie");

    const getMovies = async () => {
        const movieRef = collection(db, "movie");
        const q = query(movieRef, where("isActive", "==", 1),where("isDeleted", "==", 0));
        const data = await getDocs(q);
        setMovies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const addMovie = async () => {
        await addDoc(usersCollectionRef, { title: newTitle, synopsis : newSynopsis,
                                                poster : newPoster, duration: Number(newDuration),
                                                isActive:Number(1),isDeleted:Number(0) });
        setNewTitle('');
        setNewSynopsis('');
        setNewPoster('');
        setNewDuration(0);
        getMovies();
    };

    const nonAktif = async (id) =>{
        const movieDoc = doc(db,"movie",id);
        const newFields = {isActive:0};
        await updateDoc(movieDoc,newFields);
    }
    const hapus = async (id) =>{
        const movieDoc = doc(db,"movie",id);
        const newFields = {isDeleted:1};
        await updateDoc(movieDoc,newFields);
    }

    const updateMovie = async () => {
        const userDoc = doc(db, "movie", updateId);
        const newFields = { title: updateTitle,synopsis:updateSynopsis,poster:updatePoster,duration:updateDuration };
        await updateDoc(userDoc, newFields);
        setUpdateId('');
        setUpdateTitle('');
        setUpdateSynopsis('');
        setUpdatePoster('');
        setUpdateDuration('');
        handleClose();
        getMovies();
    };

    useEffect(() => {
        getMovies();
    }, []);

    const handleOpen = async (id,title,synopsis,poster,duration) => {
        setUpdateId(id);
        setUpdateTitle(title);
        setUpdateSynopsis(synopsis);
        setUpdatePoster(poster);
        setUpdateDuration(duration);
        setOpen(true);
    };

    return (
        <div className="App">
            <input
                placeholder="Judul Film"
                onChange={(event) => {
                    setNewTitle(event.target.value);
                }}
                value={newTitle}
            />
            <input
                placeholder="Sinopsis"
                onChange={(event) => {
                    setNewSynopsis(event.target.value);
                }}
                value={newSynopsis}
            />
            <input
                placeholder="Link Foto Poster"
                onChange={(event) => {
                    setNewPoster(event.target.value);
                }}
                value={newPoster}
            />
            <input
                type="number"
                placeholder=""
                onChange={(event) => {
                    setNewDuration(event.target.value);
                }}
                value={newDuration}
            />

            <button onClick={addMovie}> Add Movie</button>
            {movies.map((movie) => {
                return (
                    <div>
                        <img src={movie.poster} alt="Poster" style={{width:100}}/>
                        <h1>Title: {movie.title}</h1>
                        <h1>Synopsis: {movie.synopsis}</h1>
                        <h1>Duration: {movie.duration} minutes</h1>
                        <button
                            onClick={() => {
                                nonAktif(movie.id);
                            }}
                        >
                            Non Aktifkan
                        </button>
                        <button
                            onClick={() => {
                                hapus(movie.id);
                            }}
                        >
                            Hapus
                        </button>
                        <button type="button"
                                onClick={() => {
                                    handleOpen(movie.id,movie.title,movie.synopsis,movie.poster,movie.duration);
                                }}
                        >
                            Update Movie
                        </button>
                    </div>
                );
            })}
            <Modal
                onClose={handleClose}
                open={open}
                style={{
                    position: 'absolute',
                    border: '2px solid #000',
                    backgroundColor: 'gray',
                    boxShadow: '2px solid black',
                    height:500,
                    width: 240,
                    margin: 'auto'
                }}
            >
                <div>
                    <div>
                        <input
                            placeholder="Title"
                            onChange={(event) => {
                                setUpdateTitle(event.target.value);
                            }}
                            value={updateTitle}
                        />
                        <input
                            placeholder="Synopsis"
                            onChange={(event) => {
                                setUpdateSynopsis(event.target.value);
                            }}
                            value={updateSynopsis}
                        />
                        <input
                            placeholder="Poster"
                            onChange={(event) => {
                                setUpdatePoster(event.target.value);
                            }}
                            value={updatePoster}
                        />
                        <input
                            placeholder="Duration"
                            onChange={(event) => {
                                setUpdateDuration(event.target.value);
                            }}
                            value={updateDuration}
                        />
                        <button onClick={updateMovie}>Update</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AdminMovie;
