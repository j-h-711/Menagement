import React from "react";

export const Customer = ({ customer }) => {
  return (
    <>
      <div>
        <img src={customer.image} alt="profile"></img>
        <h2>
          {customer.name}({customer.id})
        </h2>
        <p>{customer.birthday}</p>
        <p>{customer.gender}</p>
        <p>{customer.job}</p>
      </div>
    </>
  );
};

export default Customer;
