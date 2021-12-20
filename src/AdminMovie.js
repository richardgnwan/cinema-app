import { useState, useEffect } from "react";
import "./App.css";
import {db} from './config/auth/firebase'
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

function AdminMovie() {
    const [newTitle, setNewTitle] = useState("");
    const [newSynopsis, setNewSynopsis] = useState("");
    const [newPoster, setNewPoster] = useState("");
    const [newDuration, setNewDuration] = useState(0);

    const [movies, setMovies] = useState([]);
    const usersCollectionRef = collection(db, "movie");

    const getMovies = async () => {
        const data = await getDocs(usersCollectionRef);
        setMovies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const addMovie = async () => {
        await addDoc(usersCollectionRef, { title: newTitle, synopsis : newSynopsis,
                                                poster : newPoster, duration: Number(newDuration),
                                                isActive:Number(1),isDeleted:Number(0) });
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

    const updateUser = async (id, age) => {
        const userDoc = doc(db, "users", id);
        const newFields = { age: age + 1 };
        await updateDoc(userDoc, newFields);
        getMovies();
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div className="App">
            <input
                placeholder="Judul Film"
                onChange={(event) => {
                    setNewTitle(event.target.value);
                }}
            />
            <input
                placeholder="Sinopsis"
                onChange={(event) => {
                    setNewSynopsis(event.target.value);
                }}
            />
            <input
                placeholder="Link Foto Poster"
                onChange={(event) => {
                    setNewPoster(event.target.value);
                }}
            />
            <input
                type="number"
                placeholder=""
                onChange={(event) => {
                    setNewDuration(event.target.value);
                }}
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
                    </div>
                );
            })}
        </div>
    );
}

export default AdminMovie;
