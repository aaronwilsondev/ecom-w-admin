import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/checkoutSteps/checkoutSteps'
import { saveShippingAddress } from '../../redux/actions/cartActions';

export default function ShippingAddressScreen(props) {

const userSignin = useSelector((state) => state.userSignin);
const { userInfo } = userSignin;
const cart = useSelector((state) => state.cart);
const {shippingAddress} = cart;
if(!userInfo) {
    props.history.push("/signin");
}

const [ fullName, setFullName ] = useState(shippingAddress.fullName);
const [ address, setAddress ] = useState(shippingAddress.address);
const [ city, setCity ] = useState(shippingAddress.city);
const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode);
const [ country, setCountry ] = useState(shippingAddress.country);
const [ shipping, setShipping ] = useState(shippingAddress.shipping);
const [ email, setEmail ] = useState(shippingAddress.email);

const dispatch = useDispatch();

const submitHandler = (e) => {
    if(shipping === "ireland"){
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country, shipping, email}));
        props.history.push('/placeorder');
      
    } else if (shipping === "international"){
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country, shipping, email}));
        props.history.push('/placeorder');
       
    } else {
        alert("please specify shipping");
    }
    
}

    return (
        <div className="screen">
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form 
            className="form"
            onSubmit={submitHandler}
            >
            <div>
             <h1>Shipping Address</h1> 
            </div>     
            <div>
                <label html="fullName">Full Name</label>
                <input
                type="text"
                id="fullName"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                ></input>
            </div>
            <div>
                <label html="email">Full Email</label>
                <input
                type="email"
                id="email"
                placeholder="Enter contact email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                ></input>
            </div>
            <div>
                <label html="address">Address</label>
                <input
                type="text"
                id="address"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                ></input>
            </div>
            <div>
                <label html="city">City</label>
                <input
                type="text"
                id="city"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                ></input>
            </div>
            <div>
                <label html="postalCode">Postal Code</label>
                <input
                type="text"
                id="postalCode"
                placeholder="Enter Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                ></input>
            </div>
            <div>
                <label html="fullName">Country</label>
                <input
                type="text"
                id="country"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                ></input>
            </div>
            <div>
            <label html="shipping">Enter Shipping</label>
                <select 
                value={shipping} 
                onChange={(e)=> setShipping(e.target.value)
                }>
                    <option
                    id="shipping"
                    selected="selected"
                    >
                      -- Please Enter Shipping --
                    </option>
                    <option
                    id="shipping"
                    value="ireland"
                    >
                       within Ireland
                    </option>
                    <option
                    id="shipping"
                    value="international"
                    >
                       International
                    </option>
                </select>
            </div>
            <div>
                <label></label>
                <button 
                className="primary"
                type="submit"
                >Continue</button>
            </div>
            </form>
        </div>
    )
}
