import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../../StateProvider'
import { getBasketTotal } from '../../../reducer'
import { Navigate, useNavigate } from 'react-router-dom'

export const Subtotal = () => {

    const [{basket} , dispatch] = useStateValue();
    const navigate = useNavigate();

  return (
    <div className="subtotal">
        <CurrencyFormat
            renderText={(value) => (
                <>
                    <p>
                        Subtotal ({basket?.length} items): <strong>{value}</strong>
                    </p>
                    {
                        console.log("this is the basket" , getBasketTotal(basket))
                    }
                    <small className="subtotal__gift">
                        <input type="checkbox" />
                        This order contains a gift
                    </small>
                </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"€"}
        />

        <button onClick={e => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  )
}
