import { useState, useEffect } from "react";
import React from 'react';
import "./App.css";
import {db} from './config/auth/firebase'
import { query, where } from "firebase/firestore";
import Modal from '@material-ui/core/Modal';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

function AdminVoucher() {
    const [open, setOpen] = React.useState(false);

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
        const voucherRef = collection(db, "voucher");
        const q = query(voucherRef, where("isDeleted", "==", 0),where("isUsed", "==", 0));
        const data = await getDocs(q);
        setVoucher(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

    const updateVoucher = async () => {
        const userDoc = doc(db, "voucher", updateId);
        const newFields = { kodeUnik: updateKodeUnik, saldo:updateSaldo};
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



    return (
        <div className="App">
            <input
                placeholder="Kode Unik"
                onChange={(event) => {
                    setNewKodeUnik(event.target.value);
                }}
                value={newKodeUnik}
            />
            <input
                type="number"
                placeholder="Saldo"
                onChange={(event) => {
                    setNewSaldo(event.target.value);
                }}
                value={newSaldo}
            />

            <button onClick={addVoucher}> Add Voucher</button>
            {voucher.map((voucher) => {
                return (
                    <div>
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
            })}
            <Modal
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
            </Modal>
        </div>
    );
}

export default AdminVoucher;
