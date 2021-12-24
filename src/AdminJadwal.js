import { useState, useEffect } from "react";
import React from 'react';
import "./App.css";
import {db} from './config/auth/firebase'
import { query, where } from "firebase/firestore";
import Modal from '@material-ui/core/Modal';
import Select from 'react-select'

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

function AdminJadwal() {
    const [newIdMovie, setNewIdMovie] = useState("");
    const [newIdCinema, setNewIdCinema] = useState("");
    const [newJamAwal, setNewJamAwal] = useState("");
    const [newJamAkhir, setNewJamAkhir] = useState("");
    const [newTanggal, setNewTanggal] = useState("");
    const [newDuration, setDuration] = useState(0);

    const jadwalCollectionRef = collection(db, "jadwal");
    const [jadwal, setJadwal] = useState([]);
    const [movie, setMovie] = useState([]);
    const [cinema, setCinema] = useState([]);

    const getJadwal = async () => {
        getMovie();
        getCinema();
        const jadwalRef = collection(db, "jadwal");
        const q = query(jadwalRef, where("isDeleted", "==", 0));
        const data = await getDocs(q);
        setJadwal(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getMovie = async () => {
        const movieRef = collection(db, "movie");
        const q = query(movieRef, where("isActive", "==", 1),where("isDeleted", "==", 0));
        const data = await getDocs(q);
        setMovie(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const hitung = async () =>{
        var jamAwal = newJamAwal;
        var splitJam = jamAwal.split(":");
        var jam = parseInt(splitJam[0]);
        var menit = parseInt(splitJam[1]);
        var hitung = parseInt(jam*60+menit+newDuration);
        var bagi = parseInt(hitung/60);
        var sisa = hitung%60;
        if(sisa<10){
            sisa="0"+sisa;
        }
        var rangkai = bagi+":"+sisa;
        console.log(rangkai);
        setNewJamAkhir(rangkai);
    }


    const getCinema = async () => {
        const cinemaRef = collection(db, "cinema");
        const q = query(cinemaRef);
        const data = await getDocs(q);
        setCinema(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const addJadwal = async () => {
        await addDoc(jadwalCollectionRef, { idCinema: newIdCinema, idMovie : newIdMovie,
            jamAwal:newJamAwal,jamAkhir:newJamAkhir,tanggal:newTanggal,isDeleted:Number(0) });
        setNewIdMovie('');
        setNewIdCinema('');
        setNewJamAwal('');
        setNewJamAkhir('');
        setNewTanggal('');
        getJadwal();
    };

    const hapus = async (id) =>{
        const jadwalDoc = doc(db,"jadwal",id);
        const newFields = {isDeleted:1};
        await updateDoc(jadwalDoc,newFields);
        getJadwal();
    }

    useEffect(() => {
        getJadwal();
    }, []);

    const handleChange = (e) => {
        setNewIdMovie(e.target.value);
        const movieIdx = movie.findIndex(movie=>movie.id==e.target.value);
        setDuration(movie[movieIdx].duration);
    }

    const handleChange2 = (e) => {
        setNewIdCinema(e.target.value);
    }

    return (
        <div className="App">
            <select value={newIdMovie} onChange={handleChange}>
                <option value={""}>Pilih Movie</option>
                {movie.map((movie) => (
                    <option value={movie.id}>{movie.title}</option>
                ))}
            </select>
            <input
                placeholder="Tanggal (DD/MM/YYYY)"
                onChange={(event) => {
                    setNewTanggal(event.target.value);
                }}
                value={newTanggal}
            />
            <input
                placeholder="Jam Tayang"
                onChange={(event) => {
                    setNewJamAwal(event.target.value);
                    hitung();
                }}
                value={newJamAwal}
            />
            <select value={newIdCinema} onChange={handleChange2}>
                <option value={""}>Pilih Cinema</option>
                {cinema.map((cinema) => (
                    <option value={cinema.id}>{cinema.cinemaName}</option>
                ))}
            </select>
            <button onClick={addJadwal}> Add Jadwal</button>
            {jadwal.map((jadwal) => {
                const movieIdx = movie.findIndex(movie=>movie.id==jadwal.idMovie);
                const judulFilm = movie[movieIdx].title;
                const cinemaIdx = cinema.findIndex(cinema=>cinema.id==jadwal.idCinema);
                const namaCinema = cinema[cinemaIdx].cinemaName;
                return (
                    <div>
                        <h1>Judul Film: {judulFilm}</h1>
                        <h1>Cinema: {namaCinema}</h1>
                        <h1>Tanggal: {jadwal.tanggal}</h1>
                        <h1>Jam Tayang : {jadwal.jamAwal} - {jadwal.jamAkhir}</h1>
                        <button
                            onClick={() => {
                                hapus(jadwal.id);
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

export default AdminJadwal;
