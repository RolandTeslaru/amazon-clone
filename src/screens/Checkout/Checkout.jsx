import React from 'react'
import "./Checkout.css"
import { Subtotal } from './Subtotal/Subtotal'
import { CheckoutProduct } from './CheckoutProduct/CheckoutProduct'
import { useStateValue } from '../../StateProvider'
import FlipMove from 'react-flip-move'

export const Checkout = () => {

    const [{basket, user} , dispatch] = useStateValue();

    const clearBasket = () => {
        dispatch({
            type: "REMOVE_ALL"
        })
    }

  return (
    <div className="checkout">
        <div className="checkout__left">
            <div className="checkout__list">
                <h3>Hello, {user?.email}</h3>
                <h2 className="Checkout__title">Shopping basket</h2>
                <h3 className='Checkout__deselect' onClick={clearBasket}>
                    Clear basket
                </h3>
                <hr />
                <FlipMove>
                    {basket.map(item => (
                        <li key={item}>
                            <CheckoutProduct 
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

        <div className="checkout__right">
             <Subtotal/>
        </div>
    </div>
  )
}
