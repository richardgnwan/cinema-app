import React, { useState, useEffect, Fragment } from "react";
import {db} from '../../config/auth/firebase'
import { query, where } from "firebase/firestore";
import { GridActionsCellItem } from '@mui/x-data-grid'
import { Alert, AlertTitle, Avatar, Button, Card, CardActions, CardContent, CardHeader, Collapse, Divider, Grid, Stack, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";

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
import { DatePicker } from "@mui/lab";
import { MyFormater } from "../../utils/dateFormater";
import MyNumberFormat from "../../utils/numberFormater";

const B_ITEMS = [
    { label: 'Admin' },
    { label: 'Report Penjualan' },
]

function ReportAdmin() {
    const [IsLoading, setIsLoading] = useState(true);
    const [jadwal, setJadwal] = useState([]);
    const [movie, setMovie] = useState([]);
    const [cinema, setCinema] = useState([]);
    const [totalAll, setTotalAll] = useState(0);
    
    const [newTanggal, setNewTanggal] = useState("");
    const [ChoosenDate, setChoosenDate] = useState(new Date());

    const getJadwal = async () => {
        setIsLoading(true)
        getMovie();
        getCinema();
        const jadwalRef = collection(db, "jadwal");
        const q = query(jadwalRef, where("isDeleted", "==", 0),where("tanggal","==",newTanggal));
        const data = await getDocs(q);
        const listJadwal = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        let totalHariIni = 0;
        for(let i=0;i<listJadwal.length;i++){
            let id = listJadwal[i].id;
            const horderRef = collection(db,"horder");
            const q2 = query(horderRef,where("idJadwal","==",id));
            const listH = await getDocs(q2);
            const listHorder = listH.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            let sum = 0;
            let totalPendapatan = 0;
            listHorder.forEach(function(horder){
               sum +=  horder.totalKursi;
            });
            totalPendapatan = sum*35000;
            listJadwal[i].totalKursi=sum;
            listJadwal[i].total = totalPendapatan;
            totalHariIni+=totalPendapatan;
        }
        setTotalAll(totalHariIni);
        setJadwal(listJadwal);
        // console.log(jadwal)
        setIsLoading(false)
    };
    const getMovie = async () => {
        const movieRef = collection(db, "movie");
        const q = query(movieRef, where("isActive", "==", 1),where("isDeleted", "==", 0));
        const data = await getDocs(q);
        setMovie(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getCinema = async () => {
        const cinemaRef = collection(db, "cinema");
        const q = query(cinemaRef);
        const data = await getDocs(q);
        setCinema(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const InputTanggalProps = {
        label: "Pilih Tanggal", disableFuture: true,
        renderInput: (params) => <TextField {...params} fullWidth />,
        value: ChoosenDate,
        onChange: (newValue) => {
            setChoosenDate(newValue)
            setNewTanggal(MyFormater(newValue, "dd-MM-yyyy"))
        },
    }
    const ButtonMakeReportProps = {
        variant: "contained", fullWidth: true, size: "small",
        onClick: getJadwal,
    }

    return (
        <AdminLayout title={"Master Voucher"} isLoading={IsLoading}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <MyBreadCrumbs items={B_ITEMS} />
            </Stack>

            <Grid container spacing={2} sx={{ pb: 8 }}>
                <Grid item xs={12} md={3}>
                    <Card elevation={3} sx={{ mb: 2 }}>
                        <CardHeader
                            title="Filter Report"
                        />
                        <Divider sx={{ mx: 1, borderColor: 'primary.main' }} />
                        <CardContent>
                            <DatePicker {...InputTanggalProps} />
                        </CardContent>
                        <CardActions>
                            <Button {...ButtonMakeReportProps}>
                                {'Buat Report'}
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Stack spacing={2}>
                        { jadwal.length <= 0 ? (
                            <Alert severity="info">{'Belum ada transaksi yang terjadi di hari ini.'}</Alert>
                        ) : (
                            <Alert severity="success">
                                <AlertTitle>{'Total Pendapatan Hari Ini'}</AlertTitle>
                                <Typography variant="h5">
                                    <MyNumberFormat value={totalAll} />
                                </Typography>
                            </Alert>
                        ) }
                        { jadwal.map((jadwal, idx) => {
                            const movieIdx = movie.findIndex(movie=>movie.id==jadwal.idMovie);
                            const cinemaIdx = cinema.findIndex(cinema=>cinema.id==jadwal.idCinema);
                            const currMovie = movie[movieIdx];
                            const currCinema = cinema[cinemaIdx];
                            console.log({ movie: currMovie, cinema: currCinema})

                            if (!currMovie) return null;
                            return (
                                <Card key={idx} elevation={3}>
                                    <CardHeader
                                        avatar={<Avatar alt={currMovie?.id} src={currMovie?.poster} />}
                                        title={<Typography variant="h6">{currMovie?.title}</Typography>}
                                        subheader={MyFormater(new Date(jadwal.tanggal), "dd MMMM yyyy")}
                                    />
                                    <Divider />
                                    <CardContent sx={{ p: 0.5 }}>
                                        <Table size="small">
                                            <TableBody sx={{ 'td, th': { border: 0 } }}>
                                                <TableRow>
                                                    <TableCell variant="head">{'Cinema'}</TableCell>
                                                    <TableCell align="right">{currCinema.cinemaName}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell variant="head">{'Jam Tayang'}</TableCell>
                                                    <TableCell align="right">{`${jadwal.jamAwal} - ${jadwal.jamAkhir}`}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell variant="head">{'Jumlah Kursi Terjual'}</TableCell>
                                                    <TableCell align="right">{`${jadwal.totalKursi} kursi`}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell variant="head">{'Harga Tiket'}</TableCell>
                                                    <TableCell align="right">
                                                        <MyNumberFormat value={35000} />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                    <CardActions>
                                        <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', p: 1 }}>
                                            <Typography fontSize={18} fontWeight="bold">{'Pendapatan dari Jadwal ini'}</Typography>
                                            <Typography fontSize={18} fontWeight="bold">
                                                <MyNumberFormat value={jadwal.total} />
                                            </Typography>
                                        </Stack>
                                    </CardActions>
                                    {/* <h1>Judul Film: {judulFilm}</h1>
                                    <h1>Cinema: {namaCinema}</h1>
                                    <h1>Jam Tayang : {jadwal.jamAwal} - {jadwal.jamAkhir}</h1>
                                    <h1>Jumlah Kursi Terjual : {jadwal.totalKursi}</h1>
                                    <h1>Pendapatan dari Jadwal ini : {jadwal.total}</h1> */}
                                </Card>
                            );
                        })}
                    </Stack>
                </Grid>
            </Grid>

            {/* Tanggal : <input
                            placeholder="Tanggal (DD-MM-YYYY)"
                            onChange={(event) => {
                                setNewTanggal(event.target.value);
                            }}
                            value={newTanggal}
                        />
            <button
                onClick={() => {
                    getJadwal();
                }}
            >
                Buat Report
            </button> */}
            {/* {jadwal.map((jadwal) => {
                const movieIdx = movie.findIndex(movie=>movie.id==jadwal.idMovie);
                const judulFilm = movie[movieIdx].title;
                const cinemaIdx = cinema.findIndex(cinema=>cinema.id==jadwal.idCinema);
                const namaCinema = cinema[cinemaIdx].cinemaName;
                return (
                    <div>
                        <h1>Judul Film: {judulFilm}</h1>
                        <h1>Cinema: {namaCinema}</h1>
                        <h1>Jam Tayang : {jadwal.jamAwal} - {jadwal.jamAkhir}</h1>
                        <h1>Jumlah Kursi Terjual : {jadwal.totalKursi}</h1>
                        <h1>Pendapatan dari Jadwal ini : {jadwal.total}</h1>
                    </div>
                );
            })}
            Total Pendapatan Hari Ini : {totalAll} */}
        </AdminLayout>
    );
}

export default ReportAdmin;
