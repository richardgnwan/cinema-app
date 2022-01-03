import React, { useEffect, useState } from 'react'
import { Route, Routes, Outlet } from 'react-router'
import { db } from '../../config/auth/firebase'
import { query, where } from "firebase/firestore";
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'

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
  const { userNow, LoginEmail, LoginGoogle, Logout } = useAuth()

  const doLogin = async () => {
    // await LoginEmail('budi@gmail.com', '123456')
    // await Logout()
  }

  return (
    <div className="sign section--bg" data-bg="img/section/section.jpg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              {/* authorization form */}
              <form action="#" className="sign__form">
                <a href="index.html" className="sign__logo">
                  <img src="img/logo.svg" alt="" />
                </a>
                <div className="sign__group">
                  <input type="text" className="sign__input" placeholder="Email" />
                </div>
                <div className="sign__group">
                  <input type="password" className="sign__input" placeholder="Password" />
                </div>
                {/* <div className="sign__group sign__group--checkbox">
                  <input id="remember" name="remember" type="checkbox" defaultChecked="checked" />
                  <label htmlFor="remember">Remember Me</label>
                </div> */}
                <button className="sign__btn" type="button" onClick={doLogin}>Sign in</button>
                {/* <span className="sign__text">Don't have an account? <a href="signup.html">Sign up!</a></span> */}
                <br />
                <Link to="/"><span className="sign__text"><a>Back to Home</a></span></Link>
              </form>
              {/* end authorization form */}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
