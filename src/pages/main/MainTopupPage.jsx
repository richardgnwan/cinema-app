import React, { useRef, useState } from 'react'
import MainLayout from '../../config/layouts/mainLayouts/MainLayout'
import { query, where, increment, setDoc } from "firebase/firestore";
import { db } from '../../config/auth/firebase'
import { useAuth } from '../../hooks/auth'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  documentId
} from "firebase/firestore";

const MainTopupPage = () => {
  const [status, setStatus] = useState(0)
  const kodeRef = useRef("")

  // User Auth
  const { userNow } = useAuth()

  // FIREBASE
  const voucherRef = collection(db, "voucher");
  const userRef = collection(db, "users");

  const addTopup = async (kode) => {
    // Check if voucher is valid
    const queryVoucher = query(voucherRef, where('kodeUnik', "==", kode));
    const dataVoucher = await getDocs(queryVoucher);
    let voucher = dataVoucher.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0] ?? null;

    console.log(voucher);

    if (voucher == null) {
      setStatus(-1)
      return;
    } else if(voucher.isUsed == 1) {
      setStatus(-3);
      return;
    } else if(voucher.isDeleted == 1) {
      setStatus(-4);
      return;
    }

    updateBalance(voucher);
  };

  const updateBalance = async (voucher) => {
    
    // get id_user from user
    const queryUser = query(userRef, where('email', "==", userNow.email));
    const dataUser = await getDocs(queryUser);
    let user = dataUser.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0] ?? null;
    console.log(user);
    const id_user = user.id;
    
    // Update status voucher
    const voucherDoc = doc(db, "voucher", voucher.id);
    const voucherField = { isUsed: 1 };
    await updateDoc(voucherDoc, voucherField);
    console.log("Voucher updated");
    // Update user balance
    const userDoc = doc(db, "users", id_user);
    const userField = { balance: increment(voucher.saldo) };
    await updateDoc(userDoc, userField);
    console.log("User balance updated");

    setStatus(1)
    kodeRef.current.value = "";
  }


  const submitHandler = () => {

    let kode = kodeRef.current.value;
    if(kode == '') {
      setStatus(-2)
      return;
    }

    addTopup(kodeRef.current.value)
  }

  let message = "";
  if (status === 0) {
    message = "";
  } else if (status === -1) {
    message = "Kode voucher tidak valid";
  } else if (status === -2) {
    message = "Kode voucher tidak boleh kosong";
  } else if (status === -3) {
    message = "Kode voucher sudah digunakan";
  } else if (status === -4) {
    message = "Kode voucher sudah dihapus";
  } else if (status === 1) {
    message = "Topup berhasil";
  }


  return (
    <MainLayout>
      <div className="sign__content">
        {/* registration form */}
        <form action="#" className="sign__form" style={{ width: '700px' }}>
          {/* <span className="faq__text">Maximum 20 Character</span> */}

          <div className="sign__group">
            <input ref={kodeRef} type="text" className="sign__input" placeholder="Kode Topup" style={{ width: '560px' }} />
          </div>

          <button onClick={submitHandler} className="sign__btn" type="button">Topup</button>
          <span className="sign__text">
            {message}
          </span>
        </form>
        {/* registration form */}
      </div>
    </MainLayout>
  )
}

export default MainTopupPage
