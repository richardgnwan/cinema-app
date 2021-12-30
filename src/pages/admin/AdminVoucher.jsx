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
    { label: 'Master Voucher' },
]

function AdminVoucher() {
    const [IsLoading, setIsLoading] = useState(true);
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
    ]
    
    const InputKodeUnikProps = {
        fullWidth: true, size: "small", variant: "standard", label: "Kode Unik",
        value: newKodeUnik, onChange: (e) => setNewKodeUnik(e.target.value),
    }
    const InputSaldoProps = {
        fullWidth: true, size: "small", variant: "standard", label: "Saldo", type: 'number',
        value: newSaldo, onChange: (e) => setNewSaldo(e.target.value),
    }

    return (
        <AdminLayout title={"Master Voucher"} isLoading={IsLoading}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <MyBreadCrumbs items={B_ITEMS} />
                <Button
                    variant="contained" startIcon={<AddOutlinedIcon/>}
                    onClick={() => setOpenAddForm(!OpenAddForm)}
                    >
                    {OpenAddForm?'Tutup':'Tambah'}
                </Button>
            </Stack>

            { !IsLoading ? (
                <Fragment>
                    <Collapse in={OpenAddForm} timeout="auto" unmountOnExit>
                        <Typography variant="h5" sx={{ mb: 1 }}>
                            {"Tambah Voucher"}
                        </Typography>
                        <Card elevation={4} sx={{ mb: 4 }}>
                            <CardContent>
                                <Stack spacing={2}>
                                    <TextField {...InputKodeUnikProps}/>
                                    <TextField {...InputSaldoProps}/>
                                </Stack>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" startIcon={<SaveIcon />} onClick={addVoucher} sx={{ ml: 'auto' }} >
                                    {"Simpan"}
                                </Button>
                            </CardActions>
                        </Card>
                    </Collapse>
        
                    <Alert severity="info" sx={{ mb: 2 }}>{'Ketuk 2 kali field yang di-inginkan untuk di-ubah.'}</Alert>

                    <MyDataGrid rows={voucher} pageSize={10} columns={columns} />
                </Fragment>
            ) : null }
            {/* {voucher.map((voucher, idx) => {
                return (
                    <div key={idx}>
                        <h1>Kode Unik: {voucher.kodeUnik}</h1>
                        <h1>Saldo: {voucher.saldo}</h1>
                        <button
                            onClick={() => {
                                hapus(voucher.id);
                            }}
                        >
                            Hapus
                        </button>
                        <button type="button"
                            onClick={() => {
                                handleOpen(voucher.id,voucher.kodeUnik,voucher.saldo);
                            }}
                        >
                            Update Voucher
                        </button>
                    </div>
                );
            })} */}
            {/* <Modal
                onClose={handleClose}
                open={open}
                style={{
                    position: 'absolute',
                    border: '2px solid #000',
                    backgroundColor: 'gray',
                    boxShadow: '2px solid black',
                    height:80,
                    width: 240,
                    margin: 'auto'
                }}
            >
                <div>
                    <input
                        placeholder="Kode Unik"
                        onChange={(event) => {
                            setUpdateKodeUnik(event.target.value);
                        }}
                        value={updateKodeUnik}
                    />
                    <input
                        type="number"
                        placeholder="Saldo"
                        onChange={(event) => {
                            setUpdateSaldo(event.target.value);
                        }}
                        value={updateSaldo}
                    />
                    <button onClick={updateVoucher}>Update</button>
                </div>
            </Modal> */}
        </AdminLayout>
    );
}

export default AdminVoucher;
