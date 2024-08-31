import React, { createContext, useEffect, useState } from "react";
import { tempOrders } from "../constants/order";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState({});
  useEffect(() => {
    setOrders(tempOrders);
  }, []);

  const addOrder = (id, newOrder) => {
    setOrders((prevOrders) => ({
      ...prevOrders,
      [id]: newOrder,
    }));
  };

  const updateOrder = (id, updatedOrder) => {
    setOrders((prevOrders) => ({
      ...prevOrders,
      [id]: updatedOrder,
    }));
  };

  const deleteOrder = (orderId) => {
    const newOrders = { ...orders };
    delete newOrders[orderId];
    setOrders(newOrders);
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, updateOrder, deleteOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};
