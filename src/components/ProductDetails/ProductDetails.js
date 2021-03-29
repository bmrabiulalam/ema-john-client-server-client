import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const {productKey} = useParams();
    useEffect(() => {
        fetch('https://radiant-peak-25073.herokuapp.com/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey]);

    return (
        <div>
            <h1>Product Details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;