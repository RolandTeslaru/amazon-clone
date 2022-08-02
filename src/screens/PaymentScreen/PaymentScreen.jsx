import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../StateProvider'
import { CheckoutProduct } from '../Checkout/CheckoutProduct/CheckoutProduct';
import "./PaymentScreen.css"
import FlipMove from 'react-flip-move';
import { Link } from 'react-router-dom';
import { useElements, useStripe , CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../../reducer';
import axios from 'axios';
import { Navigate , useNavigate } from 'react-router-dom';

export const PaymentScreen = () => {

    const navigate = useNavigate();
    const [{basket , user} , disptach] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [error , setError] = useState(null);
    const [disabled , setDisabled] = useState(true);
    const [succeeded , setSucceeded] = useState(false);
    const [processing , setProcessing] = useState("");
    const [clientSecret , setClientSecret] = useState(true);

    useEffect(() => {
        //  Generate the special stripe secret that allows us to charge a customer

        const getClientSecret = async () => {
            const response = await axios({
                method: postMessage,
                // Stripe expect the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //  paymentIntent = payment confirmation 

            setSucceeded(true);
            setError(null);
            setProcessing(false); 

            navigate("/orders", {replace:true})
        })

        // const payload = await stripe

    }

    const handleChange = event => {
        // Listen for changes in card element
        //  display errors as the customer types their card number

        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

  return (
    <div className="payment">
        <div className="payment__container">

            <h1>Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                )</h1>

            {/* Delivery adress */}
            <div className="payment__sectionContainer">
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Adress</h3>
                    </div>
                    <div className="payment__adress">
                        <p>{user?.email}</p>
                        <p>This is the street name</p>
                        <p>Berlin , Germany</p>
                    </div>
                </div>
                
                {/* Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery </h3>
                    </div>
                    <div className="payment__items">
                        <FlipMove>
                            {basket.map(item => (
                                <li key={item}>
                                    <CheckoutProduct className="payment__product"
                                        id = {item.id}
                                        title = {item.title}
                                        image = {item.image}
                                        price = {item.price}
                                        rating = {item.rating}
                                    />
                                </li>
                            ))}
                        </FlipMove> 
                    </div>
                </div>

                {/* Payment info */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className='payment__priceContianer'>
                                <CurrencyFormat 
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale = {2}
                                    value = {getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"€"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy now"}</span>
                                </button>

                                {/* Errors */}

                                {error && <div>{error}</div>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
  