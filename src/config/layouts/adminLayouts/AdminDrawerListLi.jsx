import React, { useState, useEffect } from 'react'
import { Collapse, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

export default function AdminDrawerListLi(props) {
  const location = useLocation();
  const { label, path, icon, children } = props.data;
  const { changePage, OpenChild, padding = 0 } = props
  const { refference } = props

  const [Open, setOpen] = useState(OpenChild??true)

  useEffect(() => {
    if (location.pathname === path) setOpen(true)
  }, [location.pathname])

  return (
    <>
      {/* <ListItemButton sx={{ pl: padding + 2, color: 'primary.contrastText', bgcolor: 'primary.main' }} */}
      <ListItemButton sx={{ pl: padding + 2, }}
        selected={location.pathname === path}
        onClick={() => {
          if (path) changePage(path)
          else setOpen(!Open)
        }}
        ref={location.pathname === path?refference:null}
      >

        { icon ? (
          <ListItemIcon>{icon}</ListItemIcon>
        ) : null }

        { children ? (
          <ListItemText primary={<Typography fontWeight="bold">{label}</Typography>} />
          ) : (
          <ListItemText primary={label} />
        ) }

        { children ? (
          <>
            {Open ? <ExpandLess /> : <ExpandMore />}
          </>
        ) : null}

      </ListItemButton>
      { children ? (
        <Collapse in={Open} timeout="auto" unmountOnExit>
          { children?.map((chd, idx) => (
            <AdminDrawerListLi key={idx} data={chd} changePage={changePage} padding={padding+2} refference={refference} />
          )) }
        </Collapse>
      ) : null }
    </>
  )
}
