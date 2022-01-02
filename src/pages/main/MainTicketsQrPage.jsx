import React, { useState, useEffect } from 'react'
import MainLayout from '../../config/layouts/mainLayouts/MainLayout'
import { query, where } from "firebase/firestore";
import { db } from '../../config/auth/firebase'
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

const MainTicketsQrPage = () => {

  const { id_ticket } = useParams();
  const [ticket, setTicket] = useState()

  const horderRef = collection(db, "horder");
  const jadwalRef = collection(db, "jadwal");
  const movieRef = collection(db, "movie");

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

    setTicket(horder);
    console.log(horder);
  }

  useEffect(() => {
    getTicket();
  }, [])

  return (
    <MainLayout>
      <section className="section details">
        {/* details background */}
        <div className="details__bg" data-bg="img/home/home__bg.jpg" />
        {/* end details background */}
        {/* details content */}
        <div className="container">
          <div className="row">
            {/* title */}
            <div className="col-12">
              <h1 className="details__title">{ticket && ticket.movie.title} - QR Code</h1>
            </div>
            {/* end title */}
            {/* content */}
            <div className="col-12 col-xl-12">
              <div className="card card--details">
                <div className="row">
                  {/* card cover */}
                  {/* end card cover */}
                  {/* card content */}
                  <div className="col-12">
                    <div className="card__content">
                      
                        <div className="card__cover center">
                          <img src="img/qr.png" alt="" />
                        </div>
                      
                      <ul className="card__meta">
                        {/* <li><span>Genre:</span> 
                          <a href="#">Action</a>
                          <a href="#">Triler</a></li> */}
                        <li><span>Start at:</span>{ticket && ticket.jadwal.jamAwal}</li>
                        <li><span>Running time:</span> 120 min</li>
                        <li><span>Seats:</span> {ticket && ticket.totalKursi} Seats </li>
                      </ul>
                    </div>
                  </div>
                  {/* end card content */}
                </div>
              </div>
            </div>
            {/* end content */}
            
            <div className="col-12">
              <div className="details__wrap">
                {/* availables */}
                <div className="details__devices">
                  <span className="details__devices-title">Available on devices:</span>
                  <ul className="details__devices-list">
                    <li><i className="icon ion-logo-apple" /><span>IOS</span></li>
                    <li><i className="icon ion-logo-android" /><span>Android</span></li>
                    <li><i className="icon ion-logo-windows" /><span>Windows</span></li>
                    <li><i className="icon ion-md-tv" /><span>Smart TV</span></li>
                  </ul>
                </div>
                {/* end availables */}
                {/* share */}
                <div className="details__share">
                  <span className="details__share-title">Share with friends:</span>
                  <ul className="details__share-list">
                    <li className="facebook"><a href="#"><i className="icon ion-logo-facebook" /></a></li>
                    <li className="instagram"><a href="#"><i className="icon ion-logo-instagram" /></a></li>
                    <li className="twitter"><a href="#"><i className="icon ion-logo-twitter" /></a></li>
                    <li className="vk"><a href="#"><i className="icon ion-logo-vk" /></a></li>
                  </ul>
                </div>
                {/* end share */}
              </div>
            </div>
          </div>
        </div>
        {/* end details content */}
      </section>
    </MainLayout>

  )
}

export default MainTicketsQrPage
