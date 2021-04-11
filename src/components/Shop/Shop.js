import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/products?search='+search)
        .then(res => res.json())
        .then(data => setProducts(data));
    }, [search])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://radiant-peak-25073.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data));
    }, []);

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        let newCart;
        let count = 1;

        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const otherProducts = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...otherProducts, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    const handleSearch = event => {
        setSearch(event.target.value);
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                <input type="text" onBlur={handleSearch} placeholder="search product"/>
                {
                    products.map(product => <Product key={product.key} 
                                                     showAddToCart={true} 
                                                     handleAddProduct={handleAddProduct} 
                                                     product={product}
                                            ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;