import React from 'react'
import "./Header.css"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link} from "react-router-dom"
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';

export const Header = () => {

    const [{basket , user} , dispatch] = useStateValue();
    const handleAuthentication = () => {
        if (user){
            auth.signOut();
        }
    }

  return (
    <div className="header">
        <Link to="/">
            <img src="/images/Amazon_logo.png" alt="amazon logo" className='header__logo' />
        </Link>
        <div className="header__search">
            <input type="text" className='header__searchInput' />
            <SearchIcon className='header__searchIcon'/>
        </div>

        <div className="header__nav">
            <div className="header__option">
                <span className="header__optionLine-1">Hello Guest</span>

                {/* Only redirect to login page if there is no user */}
                <Link to={!user && '/login'} >
                    <div onClick={handleAuthentication}>
                        <span className="header__optionLine-2">{user? "Sign Out" : "Sign In"}</span>
                    </div>
                </Link>

            </div>

            <div className="header__option">
                <span className="header__optionLine-1">Returns</span>
                <span className="header__optionLine-2">& Orders</span>
            </div>

            <div className="header__option">
                <span className="header__optionLine-1">Your</span>
                <span className="header__optionLine-2"> Prime</span>
            </div>

            <Link to="/checkout">
                <div className="header__optionBasket">
                    <ShoppingCartIcon/>
                    <span className='header__optionLine-2 header__basketCount'>{basket?.length}</span>
                </div>
            </Link>
        </div>
    </div>
  )
}
