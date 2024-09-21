import React, { createContext, useEffect, useState } from "react";
import { ordersList } from "../constants/order";
import { getOrders } from "../server/api";
import { parseOrderFromApi } from "../utils";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      const res = await getOrders();
      setOrders(parseOrderFromApi(res.data));
    };
    getAllOrders();
  }, []);

  const addOrder = (newOrder) => {
    console.log("added new order: ", newOrder);
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const updateOrder = (id, updatedOrder) => {
    console.log(`Updated order#${id}: `, updatedOrder);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, ...updatedOrder } : order
      )
    );
  };

  const deleteOrder = (orderId) => {
    console.log(`Deleted order#${orderId}`);
    console.log(orderId);
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, updateOrder, deleteOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};
