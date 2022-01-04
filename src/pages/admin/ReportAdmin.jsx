import React, { useState, useEffect, Fragment } from "react";
import {db} from '../../config/auth/firebase'
import { query, where } from "firebase/firestore";
import { GridActionsCellItem } from '@mui/x-data-grid'
import { Alert, Button, Card, CardActions, CardContent, Collapse, Stack, TextField, Typography } from "@mui/material";

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
    { label: 'Report Penjualan' },
]

function ReportAdmin() {
    /*const [IsLoading, setIsLoading] = useState(true);
    const [OpenAddForm, setOpenAddForm] = useState(false)
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const [newKodeUnik, setNewKodeUnik] = useState("");
    const [newSaldo, setNewSaldo] = useState(0);

    const [voucher, setVoucher] = useState([]);
    const voucherCollectionRef = collection(db, "voucher");

    const [updateKodeUnik, setUpdateKodeUnik] = useState("");
    const [updateSaldo, setUpdateSaldo] = useState(0);
    const [updateId, setUpdateId] = useState("");

    const getVoucher = async () => {
        setIsLoading(true)
        const voucherRef = collection(db, "voucher");
        const q = query(voucherRef, where("isDeleted", "==", 0),where("isUsed", "==", 0));
        const data = await getDocs(q);
        setVoucher(data.docs.map((doc, idx) => ({ ...doc.data(), id: doc.id, index: (idx + 1) })));
        setIsLoading(false)
        setOpenAddForm(false)
    };

    const addVoucher = async () => {
        await addDoc(voucherCollectionRef, { kodeUnik: newKodeUnik, saldo : Number(newSaldo),
            isUsed:Number(0),isDeleted:Number(0) });
        setNewKodeUnik('');
        setNewSaldo('');
        getVoucher();
    };

    const hapus = async (id) =>{
        const voucherDoc = doc(db,"voucher",id);
        const newFields = {isDeleted:1};
        await updateDoc(voucherDoc,newFields);
        getVoucher();
    }

    const handleOpen = async (id,kodeUnik,saldo) => {
        setUpdateId(id);
        setUpdateKodeUnik(kodeUnik);
        setUpdateSaldo(saldo);
        setOpen(true);
    };

    const updateVoucher = async (row) => {
        const userDoc = doc(db, "voucher", row.id);
        const newFields = { kodeUnik: row.kodeUnik, saldo: row.saldo };
        await updateDoc(userDoc, newFields);
        setUpdateId('');
        setUpdateKodeUnik('');
        setUpdateSaldo('');
        handleClose();
        getVoucher();
    };

    useEffect(() => {
        getVoucher();
    }, []);

    const columns = [
        { field: "index", type: "string", headerName: "No.", width: 20, align: 'center' },
        { field: "kodeUnik", type: "string", headerName: "Kode Unik", width: 300, editable: true },
        { field: "saldo", type: "number", headerName: "Saldo", width: 200, editable: true },
        {
            field: 'actions',
            headerName: "Action",
            type: 'actions',
            width: 120,
            getActions: (params) => [
                <GridActionsCellItem
                    color="primary"
                    icon={<SaveIcon />}
                    label="Save"
                    onClick={() => updateVoucher(params.row)}
                />,
                <GridActionsCellItem
                    color="error"
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => hapus(params.row.id)}
                    // showInMenu
                />,
            ],
        },
    ]*/

    /*const InputKodeUnikProps = {
        fullWidth: true, size: "small", variant: "standard", label: "Kode Unik",
        value: newKodeUnik, onChange: (e) => setNewKodeUnik(e.target.value),
    }
    const InputSaldoProps = {
        fullWidth: true, size: "small", variant: "standard", label: "Saldo", type: 'number',
        value: newSaldo, onChange: (e) => setNewSaldo(e.target.value),
    }*/
    const [newTanggal, setNewTanggal] = useState("");
    const [jadwal, setJadwal] = useState([]);
    const [movie, setMovie] = useState([]);
    const [cinema, setCinema] = useState([]);
    const [totalAll, setTotalAll] = useState(0);
    const getJadwal = async () => {
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

    return (
        <div>
            Tanggal : <input
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
            </button>
            {jadwal.map((jadwal) => {
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
            Total Pendapatan Hari Ini : {totalAll}
        </div>
    );
}

export default ReportAdmin;
