import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../hooks/auth'
import { useNavigate } from 'react-router-dom';
import {collection, documentId, getDocs, query, where} from "firebase/firestore";
import {db} from "../../../auth/firebase";
import MyNumberFormat from "../../../../utils/numberFormater";
const Header = () => {
  const navigate = useNavigate()
  const { userNow, Logout } = useAuth()
  const [saldo, setSaldo] = useState()

  // console.log(userNow)

  const getSaldo = async () =>{
    const userRef = collection(db, "users");
    const queryUser = query(userRef, where("email", "==", userNow.email));
    const data = await getDocs(queryUser);
    let loggedUser = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
    console.log(loggedUser);
    setSaldo(loggedUser.balance);
    //
    // const jadwalRef= collection(db, "jadwal");
    // const queryJadwal = query(jadwalRef, where("idMovie", "==", id));
    // const data2 = await getDocs(queryJadwal);
    // let jadwal = data2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // movie.jadwal = jadwal;
    // setMovies(movie);
    // setJadwal(jadwal);
  }

  useEffect(() => {
    if(userNow != null){
      getSaldo();
    }
  }, [userNow]);


  // if userNow is null then redirect to login
  if (!userNow) {
    navigate('/login')
  }


  const doLogout = async () => {
    await Logout()
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header__wrap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="header__content">
                {/* header logo */}
                <a href="index.html" className="header__logo">
                  <img src="img/logo.svg" alt="" />
                </a>
                {/* end header logo */}
                {/* header nav */}
                <ul className="header__nav">

                  <li className="header__nav-item">
                    {/* <a className="dropdown-toggle header__nav-link" href="#" role="button" id="dropdownMenuHome" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Home</a> */}
                    <Link to="/" className="dropdown-toggle header__nav-link" role="button" id="dropdownMenuHome" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Home</Link>
                  </li>
                  <li className="header__nav-item">
                    {/* <a href="tickets" className="header__nav-link">My Tickets</a> */}
                    <Link to="/tickets" className="header__nav-link">My Tickets</Link>
                  </li>
                  <li className="header__nav-item">
                    <Link to="/topup" className="header__nav-link">Topup</Link>
                  </li>

                </ul>
                {/* end header nav */}
                {/* header auth */}
                <div className="header__auth">
                  <p style={{color:"white", marginTop:10}}>Saldo:  <MyNumberFormat value={saldo}/></p>
                  {userNow && <button onClick={doLogout} className="header__sign-in">
                    <i className="icon ios-ion-md-log-out" />
                    <span>sign out</span>
                  </button>}

                  {userNow == null && <Link to="/login" className="header__sign-in">
                    <i className="icon ion-ios-log-in" />
                    <span>sign in</span>
                  </Link>}


                </div>
                {/* end header auth */}
                {/* header menu btn */}
                <button className="header__btn" type="button">
                  <span />
                  <span />
                  <span />
                </button>
                {/* end header menu btn */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* header search */}
      <form action="#" className="header__search">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="header__search-content">
                <input type="text" placeholder="Search for a movie, TV Series that you are looking for" />
                <button type="button">search</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* end header search */}
    </header>
  )
}

export default Header
