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

export default function MainHomePage() {
  const jadwalCollectionRef = collection(db, "jadwal");
  const [jadwal, setJadwal] = useState([]);
  const [movie, setMovie] = useState([]);
  const [cinema, setCinema] = useState([]);

  const getMovie = async () => {
    const movieRef = collection(db, "movie");
    const q = query(movieRef, where("isActive", "==", 1),where("isDeleted", "==", 0));
    const data = await getDocs(q);
    setMovie(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getMovie();
  }, []);


  return (
    <MainLayout>
      {/* home */}
      <section className="home">
        {/* home bg */}
        {/*<div className="owl-carousel home__bg">*/}
        {/*  <div className="item home__cover" data-bg="img/home/home__bg.jpg" />*/}
        {/*  <div className="item home__cover" data-bg="img/home/home__bg2.jpg" />*/}
        {/*  <div className="item home__cover" data-bg="img/home/home__bg3.jpg" />*/}
        {/*  <div className="item home__cover" data-bg="img/home/home__bg4.jpg" />*/}
        {/*</div>*/}
        {/* end home bg */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="home__title">NOW PLAYING</h1>
              <button className="home__nav home__nav--prev" type="button">
                <i className="icon ion-ios-arrow-round-back" />
              </button>
              <button className="home__nav home__nav--next" type="button">
                <i className="icon ion-ios-arrow-round-forward" />
              </button>
            </div>
            <div className="col-12">
              <div className="owl-carousel home__carousel">
                <div className="item">
                  {/* card */}
                  <div className="card card--big">
                    <div className="card__cover">
                      <img src="img/covers/cover.jpg" alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title"><a href="#">I Dream in Another Language</a></h3>
                      <span className="card__category">
                        <a href="#">Action</a>
                        <a href="#">Triler</a>
                      </span>
                      <span className="card__rate"><i className="icon ion-ios-star" />8.4</span>
                    </div>
                  </div>
                  {/* end card */}
                </div>
                <div className="item">
                  {/* card */}
                  <div className="card card--big">
                    <div className="card__cover">
                      <img src="img/covers/cover2.jpg" alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title"><a href="#">Benched</a></h3>
                      <span className="card__category">
                        <a href="#">Comedy</a>
                      </span>
                      <span className="card__rate"><i className="icon ion-ios-star" />7.1</span>
                    </div>
                  </div>
                  {/* end card */}
                </div>
                <div className="item">
                  {/* card */}
                  <div className="card card--big">
                    <div className="card__cover">
                      <img src="img/covers/cover3.jpg" alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title"><a href="#">Whitney</a></h3>
                      <span className="card__category">
                        <a href="#">Romance</a>
                        <a href="#">Drama</a>
                      </span>
                      <span className="card__rate"><i className="icon ion-ios-star" />6.3</span>
                    </div>
                  </div>
                  {/* end card */}
                </div>
                <div className="item">
                  {/* card */}
                  <div className="card card--big">
                    <div className="card__cover">
                      <img src="img/covers/cover4.jpg" alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title"><a href="#">Blindspotting</a></h3>
                      <span className="card__category">
                        <a href="#">Comedy</a>
                        <a href="#">Drama</a>
                      </span>
                      <span className="card__rate"><i className="icon ion-ios-star" />7.9</span>
                    </div>
                  </div>
                  {/* end card */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end home */}

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
            <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
              <div className="card">
                <div className="card__cover">
                  <img src="img/covers/cover.jpg" alt="" />
                  <a href="#" className="card__play">
                    <i className="icon ion-ios-play" />
                  </a>
                </div>
                <div className="card__content">
                  <h3 className="card__title"><a href="#">I Dream in Another Language</a></h3>
                  <span className="card__category">
                    <a href="#">Action</a>
                    <a href="#">Triler</a>
                  </span>
                  <span className="card__rate"><i className="icon ion-ios-star" />8.4</span>
                </div>
              </div>
            </div>
            {/* end card */}
            {/* card */}
            <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
              <div className="card">
                <div className="card__cover">
                  <img src="img/covers/cover3.jpg" alt="" />
                  <a href="#" className="card__play">
                    <i className="icon ion-ios-play" />
                  </a>
                </div>
                <div className="card__content">
                  <h3 className="card__title"><a href="#">Benched</a></h3>
                  <span className="card__category">
                    <a href="#">Comedy</a>
                  </span>
                  <span className="card__rate"><i className="icon ion-ios-star" />7.1</span>
                </div>
              </div>
            </div>
            {/* end card */}
            {/* card */}
            <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
              <div className="card">
                <div className="card__cover">
                  <img src="img/covers/cover2.jpg" alt="" />
                  <a href="#" className="card__play">
                    <i className="icon ion-ios-play" />
                  </a>
                </div>
                <div className="card__content">
                  <h3 className="card__title"><a href="#">Whitney</a></h3>
                  <span className="card__category">
                    <a href="#">Romance</a>
                    <a href="#">Drama</a>
                    <a href="#">Music</a>
                  </span>
                  <span className="card__rate"><i className="icon ion-ios-star" />6.3</span>
                </div>
              </div>
            </div>
            {/* end card */}
            {/* card */}
            <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
              <div className="card">
                <div className="card__cover">
                  <img src="img/covers/cover6.jpg" alt="" />
                  <a href="#" className="card__play">
                    <i className="icon ion-ios-play" />
                  </a>
                </div>
                <div className="card__content">
                  <h3 className="card__title"><a href="#">Blindspotting</a></h3>
                  <span className="card__category">
                    <a href="#">Comedy</a>
                    <a href="#">Drama</a>
                  </span>
                  <span className="card__rate"><i className="icon ion-ios-star" />7.9</span>
                </div>
              </div>
            </div>
            {/* end card */}
            {/* card */}
            <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
              <div className="card">
                <div className="card__cover">
                  <img src="img/covers/cover4.jpg" alt="" />
                  <a href="#" className="card__play">
                    <i className="icon ion-ios-play" />
                  </a>
                </div>
                <div className="card__content">
                  <h3 className="card__title"><a href="#">I Dream in Another Language</a></h3>
                  <span className="card__category">
                    <a href="#">Action</a>
                    <a href="#">Triler</a>
                  </span>
                  <span className="card__rate"><i className="icon ion-ios-star" />8.4</span>
                </div>
              </div>
            </div>
            {/* end card */}
            {/* card */}
            <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
              <div className="card">
                <div className="card__cover">
                  <img src="img/covers/cover5.jpg" alt="" />
                  <a href="#" className="card__play">
                    <i className="icon ion-ios-play" />
                  </a>
                </div>
                <div className="card__content">
                  <h3 className="card__title"><a href="#">Benched</a></h3>
                  <span className="card__category">
                    <a href="#">Comedy</a>
                  </span>
                  <span className="card__rate"><i className="icon ion-ios-star" />7.1</span>
                </div>
              </div>
            </div>
            {/* end card */}
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
