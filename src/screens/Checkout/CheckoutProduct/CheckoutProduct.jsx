import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../../StateProvider'
import "./CheckoutProduct.css"

export const CheckoutProduct = ({id , image , price , title , rating }) => {
    // basket for pull info and dispatch to change info
    const [{basket} , dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    return (
    <div className="CheckoutProduct">
        <img className='CheckoutProduct__img' src={image} alt="product" />

        <div className="CheckoutProduct__info">
            <p className="CheckoutProduct__title">{title}</p>
            <p className="CheckoutProduct__price">
                <small>€</small>
                <strong>{price}</strong>
            </p>
            {
                console.log(basket)
            }
            <button className='CheckoutProduct__remove-BTN' onClick={removeFromBasket}>Remove</button>
        </div>
    </div>
  )
}
