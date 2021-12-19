import React from 'react'
import MainLayout from '../../config/layouts/mainLayouts/MainLayout'

const MainTicketsQrPage = () => {
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
              <h1 className="details__title">JUDUL FILM - QR Code</h1>
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
              <div className="card card--details">
                <div className="row justify-content-center">
                  {/* card cover */}
                  <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-5">
                    <div className="card__cover">
                      <img src="img/qr.png" alt="" />
                    </div>
                  </div>
                  {/* end card cover */}
                </div>
              </div>
            </div>
            {/* end player */}
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
