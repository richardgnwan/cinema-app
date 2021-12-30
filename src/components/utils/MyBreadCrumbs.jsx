import React from 'react'
import { Breadcrumbs, Typography } from '@mui/material'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

function LiElement(props) {
  const navigate = useNavigate()
  const { item } = props;

  if (item.path) return (
    <Typography
      sx={{
        cursor: 'pointer',
        textDecoration: 'underline',
        "&:hover": {
          color: 'primary.main',
        }
      }}
      onClick={() => navigate(item.path)}
    >
      {item.label}
    </Typography>
  )
  else return (
    <Typography>{item.label}</Typography>
  )
}

export default function MyBreadCrumbs(props) {
  const { items } = props;

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
      { items?.map((item, idx) => (
        <LiElement key={idx} item={item} />
        // <React.Fragment key={idx}>
        //   { item.path ? (
        //     <Typography
        //       sx={{
        //         cursor: 'pointer',
        //         textDecoration: 'underline',
        //         "&:hover": {
        //           color: 'primary.main',
        //         }
        //       }}
        //       onClick={() => history.push(item.path)}
        //     >
        //       {item.label}
        //     </Typography>
        //     ) : (
        //     <Typography>{item.label}</Typography>
        //   ) }
        // </React.Fragment>
      )) }
    </Breadcrumbs>
  )
}
