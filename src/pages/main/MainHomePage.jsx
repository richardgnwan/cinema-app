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
  const [movies, setMovie] = useState([]);
  const [movies2, setMovie2] = useState([]);

  const getMovie = async () => {
    const movieRef = collection(db, "movie");
    const q = query(movieRef, where("isActive", "==", 1),where("isDeleted", "==", 0));
    const data = await getDocs(q);
    const mov = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setMovie(mov);

    // const jadwalRef= collection(db, "jadwal");
    // const queryJadwal = query(jadwalRef, where("idMovie", "==", id));
    // const data2 = await getDocs(queryJadwal);
    // let jadwal = data2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // movie.jadwal = jadwal;

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
            {movies && movies.map((movie) => {
              return <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
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
            {movies && movies.map((movie) => {
              return <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
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
