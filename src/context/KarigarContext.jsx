import React, { createContext, useEffect, useState } from "react";
import { tempKarigars } from "../constants/karigars";

export const KarigarContext = createContext();

export const KarigarProvider = ({ children }) => {
  const [karigars, setKarigars] = useState([]);

  useEffect(() => {
    setKarigars(tempKarigars);
  }, []);

  const addKarigar = (newKarigar) => {
    console.log("added new karigar: ", newKarigar);
    setKarigars((prevKarigars) => [...prevKarigars, newKarigar]);
  };

  const updateKarigar = (id, updatedKarigar) => {
    console.log(`updated karigar#${id}: `, updatedKarigar);
    setKarigars((prevKarigars) =>
      prevKarigars.map((karigar) =>
        karigar.id === id ? { ...karigar, ...updatedKarigar } : karigar
      )
    );
  };

  const deleteKarigar = (karigarId) => {
    console.log("deleted karigar: ", deleteKarigar);
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
