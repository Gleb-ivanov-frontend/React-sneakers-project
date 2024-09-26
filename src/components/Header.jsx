import axios from 'axios';
import '../App.scss';
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';

export default function Header( { opened, onFavoriteOpened ,onAddToCart, remove, onUserPageOpen} ){ 
    const [price, setPrice] = useState(0);

    useEffect(() => {
        axios.get('https://66c840068a477f50dc2d4e32.mockapi.io/Cart-json').then((res) => {
            setPrice(0);
            res.data.forEach((obj) => {
                setPrice((prev) => prev + obj.price);
            })
        })
    }, [opened, onAddToCart, remove])
    
    

    return (
        <>
       <nav className='Header'>
        <img className='logo' src="/img/logo.png" alt="Logo" />
        <h3>REACT SNEAKERS</h3>
        <p className='logo-p'>Магазин лучших кроссовок</p>

        <div className="cart">
            <img className='cart' src="/img/cart.svg" alt="Cart" style={{cursor: 'pointer'}} onClick={opened} />
            <p>{price} руб.</p>
        </div>

        <div className="favorite">
            <img src="/img/favorite.svg" alt="Favorite" className='favorite'  onClick={() => onFavoriteOpened()} />
        </div>

        <div className="user">
            <img src="/img/user.svg" alt="User" className='user' style={{cursor: 'pointer'}} onClick={() => onUserPageOpen()} />
        </div>
        
       </nav>
        </>
    ); 
};
