import React from 'react'
import { Route, Routes, Outlet } from 'react-router'

import MainLayout from '../../config/layouts/mainLayouts/MainLayout'

export default function MainTicketsPage() {
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
            

            {/* TODO: looping through the tickets */}
            {/* price */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="price">
                <div className="price__item price__item--first"><span>KODE_TIKET</span> <span>IDR 45.000</span></div>
                <div className="price__item"><span>Judul Film : </span></div>
                <div className="price__item"><span>Tanggal : </span></div>
                <div className="price__item"><span>Keterangan Lainnya :</span></div>
                <a href="#" className="price__btn">Show QR</a>
              </div>
            </div>
            {/* end price */}
            
          </div>
        </div>
      </div>
      {/* end pricing */}

    </MainLayout>

  )
}
