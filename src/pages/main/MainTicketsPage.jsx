import React, { useState, useEffect } from 'react'
import { Route, Routes, Outlet } from 'react-router'
import { query, where } from "firebase/firestore";
import { db } from '../../config/auth/firebase'
import { Link } from 'react-router-dom'
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
import MainLayout from '../../config/layouts/mainLayouts/MainLayout'

// format thousands
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function MainTicketsPage() {
  const [tickets, setTickets] = useState([])

  // User Auth
  const { userNow } = useAuth()

  const getTickets = async () => {
    const horderRef = collection(db, "horder");
    const queryHorder = query(horderRef, where('email', "==", userNow.email));
    const data = await getDocs(queryHorder);
    let list_tickets = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    const jadwalRef = collection(db, "jadwal");
    const movieRef = collection(db, "movie");

    for (let index = 0; index < list_tickets.length; index++) {
      const ticket = list_tickets[index];

      const queryJadwal = query(jadwalRef, where(documentId(), "==", ticket.idJadwal));
      const dataJadwal = await getDocs(queryJadwal);
      let jadwal = dataJadwal.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
      list_tickets[index].jadwal = jadwal

      const queryMovie = query(movieRef, where(documentId(), "==", jadwal.idMovie));
      const dataMovie = await getDocs(queryMovie);
      let movie = dataMovie.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
      list_tickets[index].movie = movie
    }
    // console.log(list_tickets);

    setTickets(list_tickets);
  };

  useEffect(() => {
    getTickets();
  }, [])

  return (

    <MainLayout>
      {/* page title */}
      <section className="section section--first section--bg" data-bg="img/section/section.jpg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__wrap">
                {/* section title */}
                <h2 className="section__title">Tickets</h2>
                {/* end section title */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end page title */}
      {/* pricing */}
      <div className="section">
        <div className="container">
          <div className="row">
            {/* plan features */}
            <div className="col-12">
              <ul className="row plan-features">
                <li className="col-12">These tickets are available for qr code !</li>
              </ul>
            </div>
            {/* end plan features */}

            {/* price */}
            {tickets.map((ticket) => {
              return <div className="col-12 col-md-6 col-lg-4" key={ticket.id}>
                <div className="price">
                  <div className="price__item price__item--first"><span>{ticket.movie.title}</span> <span>IDR {numberWithCommas(ticket.totalBayar)}</span></div>
                  <div className="price__item"><span>Total Kursi : {ticket.totalKursi}</span></div>
                  <div className="price__item"><span>Tanggal : {ticket.jadwal.tanggal}</span></div>
                  <div className="price__item"><span>Jam Main : {ticket.jadwal.jamAwal}</span></div>
                  <a target="_blank" href={'/tickets/' + ticket.id + '/invoice'} className="price__btn">Invoice</a>
                  <Link to={'/tickets/' + ticket.id + '/qr'} className="price__btn">Show QR</Link>
                </div>
              </div>
            })}
            {/* end price */}

            


          </div>
        </div>
      </div>
      {/* end pricing */}

    </MainLayout>

  )
}
