import React, { createContext, useEffect, useState } from "react";
import { tempKarigars } from "../constants/karigars";
import {
  addKarigars,
  deleteKarigars,
  getKarigars,
  updateKarigars,
} from "../server/api";

export const KarigarContext = createContext();

export const KarigarProvider = ({ children }) => {
  const [karigars, setKarigars] = useState([]);

  useEffect(() => {
    const getAllKarigars = async () => {
      let res = await getKarigars();
      setKarigars(res);
    };
    getAllKarigars();
    setKarigars(tempKarigars);
  }, []);

  const addKarigar = async (newKarigar) => {
    console.log("added new karigar: ", newKarigar);
    const res = await addKarigars(newKarigar);
    setKarigars((prevKarigars) => [...prevKarigars, res]);
  };

  const updateKarigar = async (updatedKarigar) => {
    const res = await updateKarigars(updatedKarigar);
    setKarigars((prevKarigars) =>
      prevKarigars.map((karigar) =>
        karigar.id === updatedKarigar.id
          ? { ...karigar, ...updatedKarigar }
          : karigar
      )
    );
    console.log(res);
  };

  const deleteKarigar = async (karigarId) => {
    await deleteKarigars(karigarId);
    setKarigars((prevKarigars) =>
      prevKarigars.filter((karigar) => karigar.id !== karigarId)
    );
  };

  const addTaskToKarigar = (karigarId, taskId) => {
    console.log("added task#", taskId);
    setKarigars((prevKarigars) =>
      prevKarigars.map((karigar) =>
        karigar.id === karigarId
          ? { ...karigar, tasks: [...karigar.tasks, taskId] }
          : karigar
      )
    );
    console.log(karigars);
  };
  const removeTaskFromKarigar = (karigarId, taskId) => {
    setKarigars((prevKarigars) =>
      prevKarigars.map((karigar) =>
        karigar.id === karigarId
          ? {
              ...karigar,
              tasks: karigar.tasks.filter((task) => task !== taskId),
            }
          : karigar
      )
    );
  };
  return (
    <KarigarContext.Provider
      value={{
        karigars,
        addKarigar,
        updateKarigar,
        deleteKarigar,
        addTaskToKarigar,
        removeTaskFromKarigar,
      }}
    >
      {children}
    </KarigarContext.Provider>
  );
};
