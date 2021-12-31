import React, { useState, useEffect, Fragment } from "react";
import { GridActionsCellItem } from '@mui/x-data-grid'
import {db} from '../../config/auth/firebase'
import { query, where } from "firebase/firestore";
import { Button, Card, CardActions, CardContent, Collapse, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

import AdminLayout from "../../config/layouts/adminLayouts/AdminLayout";
import MyDataGrid from "../../components/utils/MyDataGrid";
import MyBreadCrumbs from "../../components/utils/MyBreadCrumbs";

import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const B_ITEMS = [
    { label: 'Admin' },
    { label: 'Master Jadwal' },
]

export default function AdminJadwalPage() {
    const [IsLoading, setIsLoading] = useState(true);
    const [OpenAddForm, setOpenAddForm] = useState(false)

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
        setIsLoading(true)
        getMovie();
        getCinema();
        const jadwalRef = collection(db, "jadwal");
        const q = query(jadwalRef, where("isDeleted", "==", 0));
        const data = await getDocs(q);
        setJadwal(data.docs.map((doc, idx) => ({ ...doc.data(), id: doc.id, index: (idx + 1) })));
        setIsLoading(false)
        setOpenAddForm(false)
    };

    const getMovie = async () => {
        const movieRef = collection(db, "movie");
        const q = query(movieRef, where("isActive", "==", 1),where("isDeleted", "==", 0));
        const data = await getDocs(q);
        console.log(data.docs.map((doc) => ({...doc.data()})))
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

    const columns = [
        { field: "index", type: "string", headerName: "No.", width: 20, align: 'center' },
        {
            field: "judulMovie", type: "string", headerName: "Judul Movie", width: 240,
            valueGetter: (params) => { return (movie[movie.findIndex(movie=>movie.id==params.row.idMovie)]?.title ?? "This Movie is Deleted!") }
            // valueGetter: (params) => { return JSON.stringify(movie[movie.findIndex(mov=>mov.id==params.row.idMovie)]); }
        },
        {
            field: "cinema", type: "string", headerName: "Cinema", width: 240, 
            valueGetter: (params) => { return cinema[cinema.findIndex(cinema=>cinema.id==params.row.idCinema)].cinemaName; }
        },
        { field: "tanggal", type: "string", headerName: "Tanggal", width: 120 },
        {
            field: "jamTayang", type: "string", headerName: "Jam Tayang", width: 120,
            valueGetter: (params) => { return `${params.row.jamAwal} - ${params.row.jamAkhir}` }
        },
        {
            field: 'actions', headerName: "Action", type: 'actions', width: 120,
            getActions: (params) => [
                <GridActionsCellItem
                    color="error"
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => hapus(params.row.id)}
                />,
            ],
          },
    ]
    // {"title":"Spongebob","idMovie":"sdffg","isDeleted":0,"duration":123,"synopsis":"SpongeBob Squarepants","isActive":1,"poster":"https://yt3.ggpht.com/a/AATXAJyV31zVm1EJcIaWncG7N3iSwyV3Hcss6cW6jA=s900-c-k-c0xffffffff-no-rj-mo","id":"rKqZobvTBvtjUSPIquev"}
    // {"idMovie":"123123","isDeleted":0,"poster":"https://th.bing.com/th/id/OIP.DX2ry7psxEgFZQZ5Go_3zwHaKZ?pid=ImgDet&rs=1","title":"Dora","duration":120,"isActive":1,"synopsis":"Petualangan Dora The Explorer","id":"LNUU92LBqwf3nfpLfwjl"}

    const InputMovieProps = {
        formControlProps: { fullWidth: true, size: 'small', variant: 'standard' },
        inputLabelProps: { id: "input-movie-select-label" },
        selectProps: {
            labelId: "input-movie-select-label", id: "input-movie-select", label: "Pilih Movie",
            value: newIdMovie, onChange: handleChange,
        },
        options: movie,
    }
    const InputTanggalProps = {
        fullWidth: true, size: "small", variant: "standard", label: "Tanggal (DD/MM/YYYY)",
        value: newTanggal, onChange: (e) => setNewTanggal(e.target.value),
    }
    const InputJamTayangProps = {
        fullWidth: true, size: "small", variant: "standard", label: "Jam Tayang",
        value: newJamAwal, onChange: (e) => { setNewJamAwal(e.target.value); hitung(); },
    }
    const InputCinemaProps = {
        formControlProps: { fullWidth: true, size: 'small', variant: 'standard' },
        inputLabelProps: { id: "input-cinema-select-label" },
        selectProps: {
            labelId: "input-cinema-select-label", id: "input-cinema-select", label: "Pilih Cinema",
            value: newIdCinema, onChange: handleChange2,
        },
        options: cinema,
    }

    return (
        <AdminLayout title={"Master Jadwal"} isLoading={IsLoading}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <MyBreadCrumbs items={B_ITEMS} />
                <Button
                    variant="contained" startIcon={<AddOutlinedIcon/>}
                    onClick={() => setOpenAddForm(!OpenAddForm)}
                    >
                    {OpenAddForm?'Close':'Add'}
                </Button>
            </Stack>

            { !IsLoading ? (
                <Fragment>
                    <Collapse in={OpenAddForm} timeout="auto" unmountOnExit>
                        <Typography variant="h5" sx={{ mb: 1 }}>
                            {"Tambah Jadwal"}
                        </Typography>
                        <Card elevation={4} sx={{ mb: 4 }}>
                            <CardContent>
                                <Stack spacing={2}>
                                    <FormControl {...InputMovieProps.formControlProps}>
                                        <InputLabel {...InputMovieProps.inputLabelProps}>{InputMovieProps.selectProps.label}</InputLabel>
                                        <Select {...InputMovieProps.selectProps}>
                                            {/* <MenuItem value={""}>{'Pilih Movie'}</MenuItem> */}
                                            { InputMovieProps.options.map((movie, idx) => (
                                                <MenuItem key={idx} value={movie.id}>{movie.title}</MenuItem>
                                            )) }
                                        </Select>
                                    </FormControl>
                                    <TextField {...InputTanggalProps}/>
                                    <TextField {...InputJamTayangProps}/>
                                    <FormControl {...InputCinemaProps.formControlProps}>
                                        <InputLabel {...InputCinemaProps.inputLabelProps}>{InputCinemaProps.selectProps.label}</InputLabel>
                                        <Select {...InputCinemaProps.selectProps}>
                                            {/* <MenuItem value={""}>{'Pilih Movie'}</MenuItem> */}
                                            { InputCinemaProps.options.map((option, idx) => (
                                                <MenuItem key={idx} value={option.id}>{option.cinemaName}</MenuItem>
                                            )) }
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" startIcon={<SaveIcon />} onClick={addJadwal} sx={{ ml: 'auto' }} >
                                    {"Simpan"}
                                </Button>
                            </CardActions>
                        </Card>
                    </Collapse>
                    
                    <MyDataGrid rows={jadwal} pageSize={10} columns={columns} />
                </Fragment>
            ) : null }

            {/* <select value={newIdMovie} onChange={handleChange}>
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
            })} */}
        </AdminLayout>
    )
}
