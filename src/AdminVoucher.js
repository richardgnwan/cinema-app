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

function AdminVoucher() {
    const [newKodeUnik, setNewKodeUnik] = useState("");
    const [newSaldo, setNewSaldo] = useState(0);

    const [voucher, setVoucher] = useState([]);
    const voucherCollectionRef = collection(db, "voucher");

    const getVoucher = async () => {
        const data = await getDocs(voucherCollectionRef);
        setVoucher(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const addVoucher = async () => {
        await addDoc(voucherCollectionRef, { kodeUnik: newKodeUnik, saldo : Number(newSaldo),
            isUsed:Number(0),isDeleted:Number(0) });
        getVoucher();
    };

    const hapus = async (id) =>{
        const voucherDoc = doc(db,"voucher",id);
        const newFields = {isDeleted:1};
        await updateDoc(voucherDoc,newFields);
        getVoucher();
    }

    const updateUser = async (id, age) => {
        const userDoc = doc(db, "users", id);
        const newFields = { age: age + 1 };
        await updateDoc(userDoc, newFields);
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
            />
            <input
                type="number"
                placeholder="Saldo"
                onChange={(event) => {
                    setNewSaldo(event.target.value);
                }}
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
                    </div>
                );
            })}
        </div>
    );
}

export default AdminVoucher;
