import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
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
                    {/* <a href="movies" className="header__nav-link">Movies</a> */}
                    <Link to="/movies" className="header__nav-link">Movies</Link>
                  </li>
                  <li className="header__nav-item">
                    <Link to="/topup" className="header__nav-link">Topup</Link>
                  </li>

                </ul>
                {/* end header nav */}
                {/* header auth */}
                <div className="header__auth">
                  <button className="header__search-btn" type="button">
                    <i className="icon ion-ios-search" />
                  </button>
                  <a href="signin.html" className="header__sign-in">
                    <i className="icon ion-ios-log-in" />
                    <span>sign in</span>
                  </a>
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
