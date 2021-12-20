import React from 'react'
import { Route, Routes, Outlet } from 'react-router'

import MainLayout from '../../config/layouts/mainLayouts/MainLayout'

export default function MoviesDetailPage() {
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
                            <h1 className="details__title">I Dream in Another Language</h1>
                        </div>
                        {/* end title */}
                        {/* content */}
                        <div className="col-12 col-xl-6">
                            <div className="card card--details">
                                <div className="row">
                                    {/* card cover */}
                                    <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-5">
                                        <div className="card__cover">
                                            <img src="img/covers/cover.jpg" alt="" />
                                        </div>
                                    </div>
                                    {/* end card cover */}
                                    {/* card content */}
                                    <div className="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7">
                                        <div className="card__content">
                                            <div className="card__wrap">
                                                <span className="card__rate"><i className="icon ion-ios-star" />8.4</span>
                                                <ul className="card__list">
                                                    <li>HD</li>
                                                    <li>16+</li>
                                                </ul>
                                            </div>
                                            <ul className="card__meta">
                                                <li><span>Genre:</span> <a href="#">Action</a>
                                                    <a href="#">Triler</a></li>
                                                <li><span>Release year:</span> 2017</li>
                                                <li><span>Running time:</span> 120 min</li>
                                                <li><span>Country:</span> <a href="#">USA</a> </li>
                                            </ul>
                                            <div className="card__description card__description--details">
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                                            </div>
                                        </div>
                                    </div>
                                    {/* end card content */}
                                </div>
                            </div>
                        </div>
                        {/* end content */}
                        {/* player */}
                        <div className="col-12 col-xl-6">
                            <video controls crossOrigin playsInline poster="../../../cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg" id="player">
                                {/* Video files */}
                                <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4" size={576} />
                                <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4" type="video/mp4" size={720} />
                                <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4" type="video/mp4" size={1080} />
                                <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4" type="video/mp4" size={1440} />
                                {/* Caption files */}
                                <track kind="captions" label="English" srcLang="en" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt" default />
                                <track kind="captions" label="Français" srcLang="fr" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt" />
                                {/* Fallback for browsers that don't support the <video> element */}
                                <a href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" download>Download</a>
                            </video>
                        </div>
                        {/* end player */}
                    </div>
                </div>
                {/* end details content */}
            </section>

            <section className="content">
            <div className="content__head">
            <div className="container">
            <div className="row">
            <div className="col-12">
        {/* content title */}
            <h2 className="content__title">Tickets Available</h2>
        {/* end content title */}
        {/* content tabs nav */}
            <ul className="nav nav-tabs content__tabs" id="content__tabs" role="tablist">
            <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">Monday</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">Tuesday</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">Wednesday</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4" aria-selected="false">Thursday</a>
            </li>
            </ul>
        {/* end content tabs nav */}
        {/* content mobile tabs nav */}
            <div className="content__mobile-tabs" id="content__mobile-tabs">
            <div className="content__mobile-tabs-btn dropdown-toggle" role="navigation" id="mobile-tabs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <input type="button" defaultValue="New items" />
            <span />
            </div>
            <div className="content__mobile-tabs-menu dropdown-menu" aria-labelledby="mobile-tabs">
            <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item"><a className="nav-link active" id="1-tab" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">NEW RELEASES</a></li>
            <li className="nav-item"><a className="nav-link" id="2-tab" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">MOVIES</a></li>
            <li className="nav-item"><a className="nav-link" id="3-tab" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">TV SERIES</a></li>
            <li className="nav-item"><a className="nav-link" id="4-tab" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4" aria-selected="false">CARTOONS</a></li>
            </ul>
            </div>
            </div>
        {/* end content mobile tabs nav */}
            </div>
            </div>
            </div>
            </div>
            <div className="container">
        {/* content tabs */}
            <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
            <div className="row">
        {/* card */}
            <div className="col-sm-12">
            <div className="card card--list">
            <div className="row">

            <div className="col-sm-12 ">
            <div className="card__content">
            {/*<h3 className="card__title"><a href="#">I Dream in Another Language</a></h3>*/}

            <div className="card__wrap">

                <ul className="card__list">
                        <li className="card__cover">10:00</li>
                        <li className="card__cover">10:30</li>
                        <li className="card__cover">11:00</li>
                        <li className="card__cover">11:30</li>
                        <li className="card__cover">12:00</li>
                        <li className="card__cover">12:30</li>

                </ul>

            </div>
            <div className="card__wrap">
                <ul className="card__list">
                    <li className="card__cover">10:00</li>
                    <li className="card__cover">10:30</li>
                    <li className="card__cover">11:00</li>
                    <li className="card__cover">11:30</li>
                    <li className="card__cover">12:00</li>
                    <li className="card__cover">12:30</li>
                </ul>
            </div>

            </div>
            </div>
            </div>
            </div>
            </div>
        {/* end card */}
            </div>
            </div>
            </div>
        {/* end content tabs */}
            </div>
            </section>

        </MainLayout>

    )
}
