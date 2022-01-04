import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = (props) => {
  const [seats, setSeats] = useState([]);
  const [idJadwal, setIdJadwal] = useState("");

  const setCurrentSeats = (seats, idJadwal) => {
    setSeats(seats ?? []);
    setIdJadwal(idJadwal ?? "");
    return { seats: seats, idJadwal: idJadwal };
  };

  const resetCurrentSeats = () => {
    setSeats([]);
    setIdJadwal("");
    return { seats: seats, idJadwal: idJadwal };
  };

  const value = { seats, idJadwal, setCurrentSeats, resetCurrentSeats };
  return (
    <CartContext.Provider value={value} {...props} />
  )
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
