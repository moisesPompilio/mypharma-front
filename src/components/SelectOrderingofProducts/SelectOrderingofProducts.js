import "./SelectOrderingofProducts.scss"

import React, { useState } from "react";

const SelectOrderingofProducts = ({ onOrderChange, currentOption }) => {
  const [selectedOrder, setSelectedOrder] = useState(currentOption);

  const handleOrderChange = (event) => {
    const order = event.target.value;
    setSelectedOrder(order);
    onOrderChange(order);
  };

  return (
    <div className="select-ordering ">
      <label htmlFor="order-select">Order by:</label>
      <select id="order-select" value={selectedOrder} onChange={handleOrderChange}>
        <option value="A-Z">A - Z</option>
        <option value="Z-A">Z - A</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SelectOrderingofProducts;
