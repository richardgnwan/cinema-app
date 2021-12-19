import React from 'react'

import Header from './templates/Header'
import Footer from './templates/Footer'

const MainLayout = (props) => {

  const { children } = props;
  return (
    <div>
      {/* header */}
      <Header />
      {/* end header */}

      { children }
      
      {/* footer */}
      <Footer />
      {/* end footer */}
    </div>
  )
}

export default MainLayout
