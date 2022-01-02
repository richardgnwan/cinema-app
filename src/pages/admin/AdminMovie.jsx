import React, { useState, useEffect, Fragment } from "react";
import { Box } from "@mui/system";
import { GridActionsCellItem } from '@mui/x-data-grid'
import { Alert, Button, Card, CardActions, CardContent, Collapse, Stack, TextField, Typography } from "@mui/material";
import { query, where } from "firebase/firestore";
import {db} from '../../config/auth/firebase'
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

import AdminLayout from "../../config/layouts/adminLayouts/AdminLayout";
import MyBreadCrumbs from "../../components/utils/MyBreadCrumbs";
import MyDataGrid from "../../components/utils/MyDataGrid";

import DeleteIcon from '@mui/icons-material/Delete';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import SaveIcon from '@mui/icons-material/Save';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const B_ITEMS = [
    { label: 'Admin' },
    { label: 'Master Movie' },
]

function AdminMovie() {
    const [IsLoading, setIsLoading] = useState(true);
    const [OpenAddForm, setOpenAddForm] = useState(false)
    const [open, setOpen] = useState(false);

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
        setIsLoading(true)
        const movieRef = collection(db, "movie");
        const q = query(movieRef, where("isActive", "==", 1),where("isDeleted", "==", 0));
        const data = await getDocs(q);
        console.log("Data Movie", data.docs.map((doc, idx) => ({ ...doc.data(), id: doc.id, index: (idx + 1) })));
        setMovies(data.docs.map((doc, idx) => ({ ...doc.data(), id: doc.id, index: (idx + 1) })));
        setIsLoading(false)
        setOpenAddForm(false)
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
        getMovies()
    }
    const hapus = async (id) =>{
        const movieDoc = doc(db,"movie",id);
        const newFields = {isDeleted:1};
        await updateDoc(movieDoc,newFields);
        getMovies()
    }

    const updateMovie = async (row) => {
        const userDoc = doc(db, "movie", row.id);
        const newFields = {
            title: row.title,
            synopsis: row.synopsis,
            poster: row.poster,
            duration: row.duration
        };
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

    const columns = [
        { field: "index", type: "string", headerName: "No.", width: 20, align: 'center' },
        {
            field: "poster", type: "string", headerName: "Poster", width: 100, editable: true, align: 'center',
            renderCell: (params) => (<Box component="img" src={params.value} sx={{ maxWidth: 100, maxHeight: 56 }} />)
        },
        { field: "title", type: "string", headerName: "Judul Film", width: 220, editable: true },
        { field: "synopsis", type: "string", headerName: "Sinopsis", flex: 1, editable: true },
        { field: "duration", type: "number", headerName: "Duration", width: 100, valueGetter: (params) => `${params.value} minutes`, editable: true },
        {
            field: 'actions', headerName: "Action", type: 'actions', width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    color="error"
                    icon={<DoNotDisturbOnIcon />}
                    label="Non-aktifkan"
                    showInMenu
                    onClick={() => nonAktif(params.row.id)}
                />,
                <GridActionsCellItem
                    color="error"
                    icon={<DeleteIcon />}
                    label="Hapus"
                    showInMenu
                    onClick={() => hapus(params.row.id)}
                />,
                <GridActionsCellItem
                    color="error"
                    icon={<SaveIcon />}
                    label="Simpan"
                    showInMenu
                    onClick={() => updateMovie(params.row)}
                />,
            ],
          },
    ]

    const InputJudulProps = {
        fullWidth: true, size: "small", variant: "standard", label: "Judul Film",
        value: newTitle, onChange: (e) => setNewTitle(e.target.value),
    }
    const InputSinopsisProps = {
        fullWidth: true, size: "small", variant: "standard", label: "Sinopsis", multiline: true, minRows: 4,
        value: newSynopsis, onChange: (e) => setNewSynopsis(e.target.value),
    }
    const InputLinkFotoProps = {
        fullWidth: true, size: "small", variant: "standard", label: "Link Foto Poster",
        value: newPoster, onChange: (e) => setNewPoster(e.target.value),
    }
    const InputDurationProps = {
        fullWidth: true, size: "small", variant: "standard", label: "Duration", type: 'number',
        value: newDuration, onChange: (e) => setNewDuration(e.target.value),
    }

    // console.log(movies)

    return (
        <AdminLayout title={"Master Movie"} isLoading={IsLoading}>
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
                            {"Tambah Movie"}
                        </Typography>
                        <Card elevation={4} sx={{ mb: 4 }}>
                            <CardContent>
                                <Stack spacing={2}>
                                    <TextField {...InputJudulProps}/>
                                    <TextField {...InputSinopsisProps}/>
                                    <TextField {...InputLinkFotoProps}/>
                                    <TextField {...InputDurationProps}/>
                                </Stack>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" startIcon={<SaveIcon />} onClick={addMovie} sx={{ ml: 'auto' }} >
                                    {"Simpan"}
                                </Button>
                            </CardActions>
                        </Card>
                    </Collapse>
        
                    <Alert severity="info" sx={{ mb: 2 }}>{'Ketuk 2 kali field yang di-inginkan untuk di-ubah.'}</Alert>

                    <MyDataGrid rows={movies} pageSize={10} columns={columns} density="comfortable" />
                </Fragment>
            ) : null }

            {/* <input
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

            <button onClick={addMovie}> Add Movie</button> */}
            {/* {movies.map((movie) => {
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
            </Modal> */}
        </AdminLayout>
    );
}

export default AdminMovie;
