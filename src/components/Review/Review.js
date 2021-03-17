import React, {useState, useEffect} from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import HappyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })

        setCart(cartProducts);
    }, []);

    const removeProduct = (key) => {
        const newCart = cart.filter(pd => pd.key !== key);
        setCart(newCart);
        removeFromDatabaseCart(key);
    }

    const handleProceedToCheckout = () => {
        history.push('/shipment');
    }

    let thankYou;
    if(orderPlaced) thankYou = <img src={HappyImage} alt=""/>

    return (
        <div className="shop-container">
            <div className="product-container">
                {cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)}
                { thankYou }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedToCheckout} className="main-button">Proceed to checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;