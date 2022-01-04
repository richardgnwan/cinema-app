import React, { useEffect, useState, useRef } from 'react'
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

export default function MainRegisterPage() {
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const confirmRef = useRef("")


  const { userNow, LoginEmail, LoginGoogle, Logout, RegisterEmail } = useAuth()

  const usersRef = collection(db, "users");

  const clearInput = () => {
    emailRef.current.value = ''
    passwordRef.current.value = ''
    confirmRef.current.value = ''
  }

  const doRegister = async () => {

    const email = emailRef.current.value
    const password = passwordRef.current.value
    const confirm = confirmRef.current.value

    if (email == '' || password == '' || confirm == '') {
      alert('Semua field harus diisi')
      return
    } else if (password != confirm) {
      confirmRef.current.value = ''
      alert('Password dan konfirmasi password harus sama')
      return
    }

    const response = await RegisterEmail(email, password)

    if (response.error == 'auth/weak-password') {
      clearInput()
      alert('Minimal 6 karakter')
      return
    }

    if (response.user == null) {
      clearInput()
      alert('Email sudah terdaftar')
      return
    }

    const data = {
      balance: 0,
      email: email,
    }

    const responseFirestore = await addDoc(usersRef, data);

    // console.log(responseFirestore);
    alert('Sukses register')
    clearInput()
  }

  return (
    <div className="sign section--bg" data-bg="img/section/section.jpg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              {/* registration form */}
              <form action="#" className="sign__form">
                <a href="index.html" className="sign__logo">
                  <img src="img/logo.svg" alt="" />
                </a>
                <div className="sign__group">
                  <input ref={emailRef} type="text" className="sign__input" placeholder="Email" />
                </div>
                <div className="sign__group">
                  <input ref={passwordRef} type="password" className="sign__input" placeholder="Password" />
                </div>
                <div className="sign__group">
                  <input ref={confirmRef} type="password" className="sign__input" placeholder="Confirm Password" />
                </div>
                <button className="sign__btn" type="button" onClick={doRegister}>Sign up</button>
                <span className="sign__text">Already have an account? <Link to="/login">Sign in!</Link></span>
              </form>
              {/* registration form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
