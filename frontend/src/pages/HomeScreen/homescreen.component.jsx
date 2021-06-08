import React, { useEffect } from 'react'
import Product from "../../components/product/product.component";
import LoadingBox from '../../components/loadingbox/loadingbox';
import MessageBox from '../../components/messagebox/messagebox';
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";import HeroSection from '../../components/HeroSection/HeroSection';
;

export default function HomeScreen() {

const dispatch = useDispatch();
const productList = useSelector((state) => state.productList);
const { loading, error, products } = productList;

useEffect(() => {
  const fetchData = async () =>{
     dispatch(listProducts({}));
  };
  fetchData();
}, [dispatch])

    return (
      <div className="homescreen">
      <HeroSection/>
      {loading? (<LoadingBox></LoadingBox>)
      :
      error?(<MessageBox variant="danger">{error}</MessageBox>)
      :
      (
        <>
        {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
        <div className="shop-page row center bottom">
        {
          products.map(product => (
            <Product key={product._id} product={product}></Product>
          ))}         
        </div>
       </>
        )}    
        </div>
    )
}
