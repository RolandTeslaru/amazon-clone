import './App.css';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import { Checkout } from './screens/Checkout/Checkout';
import {Header} from "./Header/Header"
import LoginScreen from './screens/LoginScreen/LoginScreen';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { PaymentScreen } from './screens/PaymentScreen/PaymentScreen';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe("pk_test_51LMZGeCfO2xrohUhwQtQ7nrwQQo1xQEFCSi2LKGk5Y4GkZEOQ5oij3KJyCOGqWV5KyePqqMJjvEpClwhmJVmgySj00WhzPk8o4");



function App() {
  const [{} , dispatch] = useStateValue();

  useEffect(() => {
    
    auth.onAuthStateChanged(authUser => {

      if(authUser) {
        // the user  just logged in  / the user logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        // user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })

  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<>  <Header/>  <HomeScreen/>  </>}/>
          <Route path="/checkout" element={<> <Header/> <Checkout/>  </>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path='/payment' element={
            <>  
              <Header/>  
              <Elements stripe={promise}>
                <PaymentScreen/>  
              </Elements>
            </>
          }/>
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
