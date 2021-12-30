import React from 'react'
import { Route, Routes, Outlet } from 'react-router'

import MainLayout from '../../config/layouts/mainLayouts/MainLayout'

export default function MoviesDetailPage() {
    const masuk = {
        justifyContent:"center"
    };

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
                            <h1 className="details__title" style={{textAlign:"center"}}>KONFIRMASI PEMESANAN</h1>
                        </div>
                        {/* end title */}
                        {/* content */}
                        <div className="col-sm-12">
                            <div className="card card--details">
                                <div className="row" >
                                    {/* card cover */}
                                    <div className="col-sm-12" >
                                        <div className="card__cover">
                                            <img src="img/covers/cover.jpg" alt="" className= "center" style={{width:200, height:"auto"}}/>
                                        </div>
                                    </div>
                                    {/* end card cover */}
                                    {/* card content */}
                                    <div className="col-sm-12" >
                                        <div className="card__content" >
                                            <h3 className="card__title" style={{fontSize:30, textAlign:"center"}}><a href="#">I Dream in Another Language</a></h3>
                                            <ul className="card__meta" style={{fontSize:20, textAlign:"center", display:"flex" ,justifyContent:"center"}}>
                                                <li ><span>Studio:</span>
                                                    <a href="#" style={{fontSize:20}}>Studio 1</a>
                                                </li>
                                                <li><span>Date & Time:</span> Mon 20 December 20:30</li>
                                                <li><span>Duration:</span> 120 minutes </li>
                                                <li><span>Quantity:</span> 1 </li>
                                            </ul>
                                            <div style={{marginLeft: 450, marginTop: 20}}>
                                                <a href="signin.html" className="header__sign-in">
                                                    <i className="icon ion-ios-log-in" />
                                                    <span>Konfirmasi</span>
                                                </a>
                                            </div>
                                            {/*<div className="card__description card__description--details">*/}
                                            {/*    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.*/}
                                            {/*</div>*/}
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
