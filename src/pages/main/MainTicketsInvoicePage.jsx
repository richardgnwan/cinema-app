import React, { useState, useEffect } from 'react'
import { query, where } from "firebase/firestore";
import { db } from '../../config/auth/firebase'
import classes from './css/invoice.module.css';
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  documentId
} from "firebase/firestore";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const MainTicketsInvoicePage = () => {
  document.body.style = 'background: white;';

  const { id_ticket } = useParams();
  const [ticket, setTicket] = useState()

  const horderRef = collection(db, "horder");
  const dorderRef = collection(db, "dorder");
  const jadwalRef = collection(db, "jadwal");
  const movieRef = collection(db, "movie");
  const usersRef = collection(db, "users");

  const getTicket = async () => {
    const queryHorder = query(horderRef, where(documentId(), "==", id_ticket));
    const dataHorder = await getDocs(queryHorder);
    let horder = dataHorder.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];

    const queryJadwal = query(jadwalRef, where(documentId(), "==", horder.idJadwal));
    const dataJadwal = await getDocs(queryJadwal);
    let jadwal = dataJadwal.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
    horder.jadwal = jadwal

    const queryMovie = query(movieRef, where(documentId(), "==", jadwal.idMovie));
    const dataMovie = await getDocs(queryMovie);
    let movie = dataMovie.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
    horder.movie = movie

    const queryUser = query(usersRef, where('username', "==", horder.username));
    const dataUser = await getDocs(queryUser);
    let user = dataUser.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
    horder.user = user

    const queryDorder = query(dorderRef, where('idHorder', "==", id_ticket));
    const dataDorder = await getDocs(queryDorder);
    let dorder = dataDorder.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    horder.dorder = dorder

    setTicket(horder);
    console.log(horder);
  }

  useEffect(() => {
    getTicket();
  }, [])

  // const jadwalRef = collection(db, "jadwal");
  // const movieRef = collection(db, "movie");

  return (
    <div>
      <button onClick={() => window.print()}>PRINT</button>
      <div className={classes.invoicebox}>
        <table cellPadding={0} cellSpacing={0}>
          <tbody><tr className={classes.top}>
            <td colSpan={2}>
              <table>
                <tbody>
                  <tr>
                    <td className={classes.title}>
                      <img src="https://www.sparksuite.com/images/logo.png" style={{ width: '100%', maxWidth: '300px' }} />
                    </td>
                    <td>
                      Invoice Code:{id_ticket}<br />
                    </td>
                </tr>
                </tbody></table>
            </td>
          </tr>
            <tr className={classes.information}>
              <td colSpan={2}>
                <table>
                  <tbody><tr>
                    <td>
                      Cinema App, Inc.<br />
                      {ticket && ticket.movie.title}<br />
                      {ticket && ticket.jadwal.tanggal} Starts at {ticket && ticket.jadwal.jamAwal} - {ticket && ticket.jadwal.jamAkhir}<br />
                      {ticket && ticket.totalKursi} Seat/Seats<br />
                    </td>
                    <td>
                      {ticket && ticket.user.name}<br />
                      Age : {ticket && ticket.user.age}
                    </td>
                  </tr>
                  </tbody></table>
              </td>
            </tr>
            <tr className={classes.heading}>
              <td>Payment Method</td>
              <td>Check #</td>
            </tr>
            <tr>
              <td>Check</td>
              <td>{ticket && 'IDR ' + numberWithCommas(ticket.totalBayar)}</td>
            </tr>
            <tr className={classes.heading}>
              <td>Detail</td>
              <td>Seats</td>
            </tr>

            {ticket && ticket.dorder.map((item, index) => (
              <tr className={classes.item} key={index}>
                <td>{item.nomorKursi}</td>
                <td>IDR {numberWithCommas(item.hargaTiket)}</td>
              </tr>
            ))}

            {/* <tr className={classes.item}>
              <td>{ticket && ticket.movie.title}</td>
              <td>Jumalah 2 tiket</td>
            </tr> */}

            <tr className={classes.total}>
              <td />
              <td>Total: {ticket && 'IDR ' + numberWithCommas(ticket.totalBayar)}</td>
            </tr>
          </tbody></table>
      </div>
    </div>

  )
}

export default MainTicketsInvoicePage
