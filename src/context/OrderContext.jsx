import React, { createContext, useContext, useEffect, useState } from "react";
import { ordersList } from "../constants/order";
import { addOrders, getOrders } from "../server/api";
import { parseOrderFromApi } from "../utils";
import { UserContext } from "./UserContext";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { token, user } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      const getAllOrders = async () => {
        const res = await getOrders();
        setOrders(parseOrderFromApi(res?.data));
      };
      getAllOrders();
    }
  }, [token]);

  const addOrder = async (newOrder) => {
    console.log("added new order: ", newOrder);
    const res = await addOrders(newOrder);
    if (res.status === 201) {
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    } else {
      console.log("failed to add Order");
    }
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
