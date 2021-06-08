import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import LoadingBox from '../../components/loadingbox/loadingbox';
import MessageBox from '../../components/messagebox/messagebox';
import Product from '../../components/product/product.component';
import { listProducts } from '../../redux/actions/productActions';

export default function SearchScreen(props) {

    const dispatch = useDispatch();

    const {name = "all", category = 'all'} = useParams();

    const productList = useSelector((state) => state.productList);
    const {loading, error, products} = productList;

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategory, 
        error: errorCategory, 
        categories
    } = productCategoryList;

useEffect(() => {
    dispatch(listProducts({
        name: name !== "all" ? name: "",
        category: category !== "all" ? category: ""
    }));
}, [dispatch, name, category]);

const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    return `/search/category/${filterCategory}/name/${filterName}`;
}
    
    return (
      <div className="search-page">
        <div className="row">
            {loading? (<LoadingBox></LoadingBox>)
            :
            error? (<MessageBox variant="danger">{error}</MessageBox>)
            :
            (
                <div>
                    {products.length} Results
                </div>
            )}
        </div>
        <div className="row top">
            <div className="col-1">
               <h3>Department</h3>
               {loadingCategory? (<LoadingBox></LoadingBox>)
                  :
                  errorCategory? (<MessageBox variant="danger">{errorCategory}</MessageBox>)
                  :
                  (
                    <ul>
                       {categories.map((c) => (
                           <li key={c}>
                                <Link 
                                to={getFilterUrl({category: c})}
                                className={c === category? 'active' : ''}
                                >
                                    {c}
                                </Link>
                           </li>
                       ))}
                    </ul>
               )}    
            </div>
        </div>
        <div className="col-3">
           {loading? (<LoadingBox></LoadingBox>)
            :
            error? (<MessageBox variant="danger">{error}</MessageBox>)
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
      </div>
    )
}
