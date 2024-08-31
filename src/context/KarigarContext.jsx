import React, { createContext, useEffect, useState } from "react";
import { tempKarigars } from "../constants/karigars";

export const KarigarContext = createContext();

export const KarigarProvider = ({ children }) => {
  const [karigars, setKarigars] = useState({});
  useEffect(() => {
    setKarigars(tempKarigars);
  }, []);

  // const addKarigar = (id, newKarigar) => {
  //   setKarigars((prevKarigars) => ({
  //     ...prevKarigars,
  //     [id]: newKarigar,
  //   }));
  // };

  // const updateKarigar = (id, updatedKarigar) => {
  //   setKarigars((prevKarigars) => ({
  //     ...prevKarigars,
  //     [id]: updatedKarigar,
  //   }));
  // };

  const deleteKarigar = (karigarId) => {
    const newKarigars = { ...karigars };
    delete newKarigars[karigarId];
    setKarigars(newKarigars);
  };

  return (
    <KarigarContext.Provider value={{ karigars, setKarigars, deleteKarigar }}>
      {children}
    </KarigarContext.Provider>
  );
};
