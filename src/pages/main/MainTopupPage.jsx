import React from 'react'
import MainLayout from '../../config/layouts/mainLayouts/MainLayout'

const MainTopupPage = () => {
  return (
    <MainLayout>
      <div className="sign__content">
        {/* registration form */}
        <form action="#" className="sign__form" style={{width: '700px'}}>
          
          <div className="sign__group">
            <input type="text" className="sign__input" placeholder="Kode Topup" style={{width: '560px'}} />
          </div>

          <button className="sign__btn" type="button">Topup</button>
          <span className="sign__text">Berhasil topup</span>
        </form>
        {/* registration form */}
      </div>
    </MainLayout>
  )
}

export default MainTopupPage
