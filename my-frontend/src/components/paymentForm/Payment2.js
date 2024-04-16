import React, { useState } from 'react';
import '../orderForm/Order2';
import '../paymentForm/Payment2.css';

// const Payment2 = () => {
    function Payment2(){
    const [formData, setFormData] = useState({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle form submission
  };

  return (
    <div className='flex-container3'>
    <div className="payment-form">
      <h1>Payment Details</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          placeholder='Enter Card Number'
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
        />

        <label htmlFor="cardName">Cardholder Name</label>
        <input
          type="text"
          placeholder='Enter Name on Card'
          id="cardName"
          name="cardName"
          value={formData.cardName}
          onChange={handleChange}
        />

        <label htmlFor="expiryDate">Expiry Date</label>
        <input
          type="text"
          placeholder='MM/YY'
          id="expiryDate"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
        />

        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          placeholder='Enter your CVV'
          id="cvv"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
    </div>
  );
};

export default Payment2;
