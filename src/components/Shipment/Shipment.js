import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const [shippingData, setShippingData] = useState(null);
    const onSubmit = data => {
        setShippingData(data);
    }

    const handlePaymentSuccess = paymentId => {
        const savedCart = getDatabaseCart();
        const orderDetails = { 
            ...loggedInUser, 
            products: savedCart, 
            paymentId,
            shipment: shippingData, 
            orderTime: new Date() 
        };

        fetch('https://radiant-peak-25073.herokuapp.com/addOrder', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                processOrder();
                alert(data ? "Order Placed Successfully!" : "Failed to Place Order!");
            })
    }

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div class="container">
            <div className="row">
                <div className="col col-md-6">
                    <form style={{display: shippingData ? 'none' : 'block'}} className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder='Full Name' />
                        {errors.name && <span className='error'>Name is required</span>}

                        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Email' />
                        {errors.email && <span className='error'>Email is required</span>}

                        <input name="address" ref={register({ required: true })} placeholder='Address' />
                        {errors.address && <span className='error'>Address is required</span>}

                        <input name="phone" ref={register({ required: true })} placeholder='Phone Number' />
                        {errors.phone && <span className='error'>Phone Number is required</span>}

                        <input type="submit" />
                    </form>
                </div>
                <div style={{display: shippingData ? 'block' : 'none'}} className="col col-md-6">
                    <ProcessPayment handlePayment={handlePaymentSuccess} />
                </div>
            </div>
        </div>
    );
};

export default Shipment;