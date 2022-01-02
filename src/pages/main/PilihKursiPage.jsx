import React, { useState } from 'react'
import { Box, FormControlLabel } from '@mui/material'
import { Button, Checkbox, Stack } from '@mui/material'

import MainLayout from '../../config/layouts/mainLayouts/MainLayout'
import { SEATS, seatsDivider, seatsMerger, seatsChoosenGetter } from '../../mock/seats'

import WeekendIcon from '@mui/icons-material/Weekend';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';

export default function PilihKursiPage() {
  const [seatList, setSeatList] = useState(seatsDivider(SEATS))
  // console.log(seatList);

  const handleChangeCheckbox = (e, y, x) => {
    if (seatList[y][x].disabled) {

    }
    else {
      let newList = [...seatList];
      newList[y][x].value = e.target.checked;
      newList[y][x].choosen = e.target.checked;
      setSeatList(newList);
    }
  }

  const handleSubmit = () => {
    console.log("Hasil All", seatsMerger(seatList))
    console.log("Hasil Kepilih Aja", seatsChoosenGetter(seatList))
  }

  return (
    <MainLayout>
      {/* page title */}
      <section className="section section--first section--bg" data-bg="img/section/section.jpg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__wrap">
                {/* section title */}
                <h2 className="section__title">{'Pilih Kursi'}</h2>
                {/* end section title */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end page title */}
      <div className="container">
        <div className="row">
          <div className="col-12" style={{ paddingTop: 20, paddingBottom: 20 }}>
            <div className="my__box">
              <Stack spacing={0.5}>
                { seatList.map((row1, idx1) => (
                  <Stack direction="row" justifyContent="space-between">
                    { row1.map((row2, idx2) => (
                      <FormControlLabel
                        key={`${idx1}-${idx2}`}
                        label={row2.label}
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            size="large"
                            color="mainPink"
                            checked={row2.value}
                            // disabled={row2.disabled}
                            icon={<WeekendOutlinedIcon sx={{ color: 'plainwhite.main' }} />}
                            checkedIcon={<WeekendIcon sx={{ color: row2.choosen?"mainPink.light":"inherit" }} />}
                            onChange={(e) => handleChangeCheckbox(e, idx1, idx2)}
                          />
                        }
                        sx={{ color: 'white' }}
                      />
                    )) }
                  </Stack>
                )) }
              </Stack>
            </div>
            <Box sx={{ mt: 2, textAlign: 'end' }}>
              <Button variant="contained" color="mainPink" onClick={handleSubmit}>{'Submit'}</Button>
            </Box>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
