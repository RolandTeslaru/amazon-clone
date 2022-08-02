import React from 'react'
import "./Home.css"
import {Product} from "../Product/Product"
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import "../../../products.json"


export const Home = () => {

    const ProductsArrays = require(`../../../products.json`)

  return (
    <div className="home">
        <div className="home__container">
            <img className='home__image'  alt="We deliver to over 35 destinations and regions" src="https://images-eu.ssl-images-amazon.com/images/G/03/AISExports_GW/Desktop_Graphics/AIS_GW_Freeway_Desktop-Tall-Hero_3000X1200_EN_v4_guetzli._CB639618908_.jpg" height="600px" width="1500px" data-a-hires="https://images-eu.ssl-images-amazon.com/images/G/03/AISExports_GW/Desktop_Graphics/AIS_GW_Freeway_Desktop-Tall-Hero_3000X1200_EN_v4_guetzli._CB639618908_.jpg"/>
            {ProductsArrays.map((items , index) => (
                <div className={`home__row ${React.Children.count() >= 2 &&  "home_rowLarge"}`} key={index} >
                    {items.map((subItems , subIndex) => (
                        <>
                            <Product 
                                title={subItems.title} 
                                id={subItems.id}
                                rating={subItems.rating}
                                price={subItems.price}
                                image={subItems.image}

                                key={subItems.id}
                            />
                        </>
                    ))}
                </div>
            ))}
            
        </div>
    </div>
  )
}
