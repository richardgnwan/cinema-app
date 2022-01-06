import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, FormControlLabel } from '@mui/material'
import { Button, Checkbox, Stack } from '@mui/material'
import { useCart } from '../../hooks/cart'

import MainLayout from '../../config/layouts/mainLayouts/MainLayout'
import { resetSeats, SEATS, seatsDivider, seatsMerger, seatsChoosenGetter } from '../../mock/seats'

import WeekendIcon from '@mui/icons-material/Weekend';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';

import { query, where } from "firebase/firestore";
import { db } from '../../config/auth/firebase'

import { useNavigate } from "react-router-dom";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  documentId
} from "firebase/firestore";

export default function PilihKursiPage() {
  let navigate = useNavigate();
  const { id_jadwal } = useParams()
  const [seatList, setSeatList] = useState([...seatsDivider(resetSeats())])

  const { setCurrentSeats } = useCart()


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

    // send data to new page

    let list_choosen = seatsChoosenGetter(seatList);
    let list_choosen_label = list_choosen.map(item => item.label)


    setCurrentSeats(list_choosen_label, id_jadwal);
    navigate("/order", { replace: true });
  }

  function convertCharToNumber(char) {
    return char.charCodeAt(0) - 65
  }

  const initChair = async () => {
    // Get list of chairs that already choosen
    const dorderRef = collection(db, "dorder");
    const queryDorder = query(dorderRef, where('idJadwal', "==", id_jadwal));
    const dataDorder = await getDocs(queryDorder);
    let list_dorder = dataDorder.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    let list_nomorKursi = list_dorder.map((dorder) => dorder.nomorKursi)

    console.log("list_nomorKursi", list_nomorKursi);
    
    // Set disabled for choosen chairs
    let newList = [...seatList];
    list_nomorKursi.forEach(kursi => {
      let y = convertCharToNumber(kursi[0])
      let x = parseInt(kursi.slice(1))-1
      newList[y][x].value = true;
      newList[y][x].disabled = true;
    });
    setSeatList(newList);
  }

  useEffect(() => {
    initChair()
  }, [])


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
