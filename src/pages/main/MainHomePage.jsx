import React, {useEffect, useState} from 'react'
import { Route, Routes, Outlet } from 'react-router'
import { db } from '../../config/auth/firebase'
import { query, where } from "firebase/firestore";
import MainLayout from '../../config/layouts/mainLayouts/MainLayout'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {Link} from "react-router-dom";

export default function MainHomePage() {
  const [movieSoon, setMovieSoon] = useState([]);
  const [movieNow, setMovieNow] = useState([]);
  const [movie, setMovie] = useState([]);



  const getMovie = async () => {
    const movieRef = collection(db, "movie");
    const q = query(movieRef, where("isActive", "==", 1),where("isDeleted", "==", 0));
    const data = await getDocs(q);
    const mov = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const jadwalRef= collection(db, "jadwal");
    setMovie(mov);
    // movie.jadwal = jadwal;

    // setJadwal(jadwal);
    console.log(mov);
    // console.log(jadwal);
    // let tgl = new Date().toLocaleString();
    // // console.log(tgl); // bulan/tanggal/tahun
    // let d_array = tgl.split('/');
    // let hari = d_array[1];
    // let bln = d_array[0];
    // let thn = d_array[2];
    // let jam = thn.split(' ');
    // // console.log(jam);
    // let tgl2 = hari + "-" + bln +"-" + jam[0];
    // let tglFix = tgl2.slice(0,-1);
    // console.log(tglFix);

    let today = new Date().toDateString();
    let movie_now_playing = []
    let movie_coming_soon = []
    for (const m of mov) {
      // let listJadwal = m.jadwal
      const queryJadwal = query(jadwalRef, where("idMovie", "==", m.id));
      const data2 = await getDocs(queryJadwal);
      let jadwal = data2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let is_today = false, is_soon = false;
      // console.log(jadwal)

      jadwal.forEach(function(j){
        var dateParts = j.tanggal.split("-");
        // month is 0-based, that's why we need dataParts[1] - 1
        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toDateString();
        if(dateObject == today){
          is_today = true;
        }else{
          is_soon = true;
        }

        if(is_today){
          movie_now_playing.push(m);
          // console.log(m);
          return;
        }
        else if(is_soon){
          movie_coming_soon.push(m);
          // console.log(m);
          return;
        }

      })
    }
    setMovieNow(movie_now_playing);
    setMovieSoon(movie_coming_soon);


    console.log(mov);
  };

  useEffect(() => {
    getMovie();
  }, []);


  return (
    <MainLayout>
      {/* home */}
      <section className="section section--bg" data-bg="img/section/section.jpg">
        <div className="container">
          <div className="row">
            {/* section title */}
            <div className="col-12">
              <h2 className="section__title" style={{marginTop:100}}>NOW PLAYING</h2>
            </div>
            {/* end section title */}
            {/* card */}
            {movieNow && movieNow.map((movie) => {
              return <div className="col-6 col-sm-4 col-lg-3 col-xl-2" key={movie.id}>
                <div className="card">
                  <Link to={'/movies/' + movie.id}>
                    <div className="card__cover">
                        <img src= {movie.poster} alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                  </Link>

                  <div className="card__content">
                    <h3 className="card__title"><a href="#">{movie.title}</a></h3>
                  </div>
                </div>
              </div>
              {/* end card */}
            })}

            {/* card */}

            {/* section btn */}
            <div className="col-12">
              <a href="#" className="section__btn">Show more</a>
            </div>
            {/* end section btn */}
          </div>
        </div>
      </section>

      {/* expected premiere */}
      <section className="section section--bg" data-bg="img/section/section.jpg">
        <div className="container">
          <div className="row">
            {/* section title */}
            <div className="col-12">
              <h2 className="section__title">COMING SOON</h2>
            </div>
            {/* end section title */}

            {/* card */}
            {movieSoon && movieSoon.map((movie) => {
              return <div className="col-6 col-sm-4 col-lg-3 col-xl-2" key={movie.id}>
                <div className="card">
                  <div className="card__cover">
                    <img src= {movie.poster} alt="" />
                    <a href="#" className="card__play">
                      <i className="icon ion-ios-play" />
                    </a>
                  </div>
                  <div className="card__content">
                    <h3 className="card__title"><a href="#">{movie.title}</a></h3>
                  </div>
                </div>
              </div>
              {/* end card */}
            })}
            {/* card */}

            {/* section btn */}
            <div className="col-12">
              <a href="#" className="section__btn">Show more</a>
            </div>
            {/* end section btn */}
          </div>
        </div>
      </section>
      {/* end expected premiere */}

    </MainLayout>

  )
}
