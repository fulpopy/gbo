import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addOrders,
  deleteOrders,
  getOrders,
  updateOrders,
} from "../server/api";
import { parseOrderFromApi } from "../utils";
import { UserContext } from "./UserContext";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      const getAllOrders = async () => {
        const res = await getOrders();
        setOrders(res?.data);
      };
      getAllOrders();
    }
  }, [token]);

  const addOrder = async (newOrder) => {
    console.log("added new order: ", newOrder);
    const username = localStorage.getItem("username");
    const res = await addOrders(newOrder, username);
    if (res.status === 201) {
      setOrders((prevOrders) => [...prevOrders, res?.data]);
      console.log(orders);
    } else {
      console.log("failed to add Order");
    }
  };

  const updateOrder = async (updatedOrder) => {
    const res = await updateOrders(updatedOrder);
    if (res.status === 200) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === updatedOrder.order_id
            ? { ...res.data.order }
            : order
        )
      );
    } else {
      console.log("error");
    }
  };
  const deleteOrder = async (order_id) => {
    const res = await deleteOrders(order_id);
    if (res.status === 200) {
      setOrders((prevOrders) =>
        prevOrders?.filter((order) => order.order_id !== order_id)
      );
    } else {
      console.log("error");
    }
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, updateOrder, deleteOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};
