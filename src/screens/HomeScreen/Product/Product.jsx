import { Key } from '@mui/icons-material';
import React from 'react'
import { useStateValue } from '../../../StateProvider'
import "./Product.css"

export const Product = ({title , image , price , rating , id}) => {
  
  const [{basket} , dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      }
    })
  }
  return (
    <div className="product">
        <div className="product__info">
            <p>{title}</p>
             <p className='product__price'>
                <small>€</small>
                <strong>{price}</strong>
             </p>
             <div className="product__rating">
                {/* {Array(rating).fill().map((i) => (
                    <div key={i}>
                      {console.log(i)}
                      <p>⭐</p>
                    </div>
                    
                ))} */}
                <p >⭐</p>
                <p >⭐</p>
                <p >⭐</p>
                <p >⭐</p>
                <p >⭐</p>
             </div>
        </div>
        
        <img src={image} alt="" />
        <button onClick={addToBasket}>Add to basket</button>
    </div>
  )
}
