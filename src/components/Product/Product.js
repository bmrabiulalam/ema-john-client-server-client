import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    const {img, name, seller, price, stock} = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} />
            </div>
            <div>
                <h4>{name}</h4>
                <br />
                <p><small>by: {seller}</small></p>
                <br />
                <p>${price}</p>
                <br />
                <p><small>Only {stock} left in stock - Order soom</small></p>
                <button onClick={() => props.handleAddProduct(props.product)} className='main-button'> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;