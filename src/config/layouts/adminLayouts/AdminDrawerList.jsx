import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router';
import { ADMIN_ROUTES as ROUTES } from '../../routes/AllRoutes';
import { List } from '@mui/material'

import AdminDrawerListLi from './AdminDrawerListLi';


export default function AdminDrawerList(props) {
  const navigate = useNavigate()
  const activeListRef = useRef(null)
  const { setOpenDrawer } = props;

  useEffect(() => {
    // console.log(activeListRef)
    if (activeListRef.current)
    activeListRef.current.scrollIntoView({ top: activeListRef.current.offsetTop + 600, behavior: 'smooth', block: 'center' })
  }, [activeListRef])

  const changePage = (path) => {
    // setOpenDrawer(false)
    navigate(path)
  }

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      { ROUTES.map((route, idx) => (
        <AdminDrawerListLi key={idx} data={route} changePage={changePage} refference={activeListRef} />
      )) }
    </List>
  )
}
