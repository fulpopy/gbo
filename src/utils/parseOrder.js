// Utility function to parse an array of orders from API
export const parseOrderFromApi = (apiOrders) => {
  return apiOrders.map((apiOrder) => ({
    id: apiOrder.order_id || "",
    client: apiOrder.order_for || "",
    karat: apiOrder.karat || "18K",
    product: apiOrder.description || "",
    weight: apiOrder.weight || "",
    images: apiOrder.order_images
      ? apiOrder.order_images.map((img) => img.images)
      : [],
    description: apiOrder.description || "",
    datePlaced: apiOrder.placed_date ? apiOrder.placed_date.split("T")[0] : "",
    endDate: apiOrder.delivery_date ? apiOrder.delivery_date.split("T")[0] : "",
    karigar: apiOrder.karigar ? apiOrder.karigar.name : "",
    status: apiOrder.active ? "Active" : "Completed",
    customKarat: apiOrder.karat === "Other" ? apiOrder.karat : "",
  }));
};

// Utility function to format order to API format
export const formatOrderToApi = (order, placedBy = "Admin123") => {
  return {
    order_id: order.id || undefined, // Undefined for new order creation
    weight: order.weight || "",
    karat: order.customKarat || order.karat,
    description: order.product || order.description,
    karigar_id: order.karigar ? order.karigar.id : null,
    placed_by: placedBy, // Use dynamic value for the user
    order_for: order.client || "",
    placed_date: order.datePlaced
      ? new Date(order.datePlaced).toISOString().split("T")[0]
      : null,
    delivery_date: order.endDate
      ? new Date(order.endDate).toISOString().split("T")[0]
      : null,
    active: order.status === "Active",
    order_images: order.images.map((image) => ({ images: image })),
  };
};
