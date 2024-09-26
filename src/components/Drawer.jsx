import { useEffect, useState } from "react";
import Card from "./Card";
import axios from 'axios';

export default function Drawer( { onClose } ){
    const [item, setItem] = useState([]); 
    const [price, setPrice] = useState(0);
    const [offer, setOffer] = useState(false);
    const [offerCount, setOfferCount] = useState(0);

    const offerComplete = () => {
        setOffer(true);
        setOfferCount((prev) => prev + 1);
        item.map((obj) => {
            axios.post('https://66d73727006bfbe2e650356f.mockapi.io/UserProfile', obj);
        })
        item.map((obj) => {
            axios.delete(`https://66c840068a477f50dc2d4e32.mockapi.io/Cart-json/${obj.id}`); 
        })
    }

    const OnFetch = () => { 
        axios.get('https://66c840068a477f50dc2d4e32.mockapi.io/Cart-json').then((res) => {
            setItem(res.data);
        }) 
    }

   useEffect(() => {
        setPrice(0);
        item.forEach((obj) => {
            setPrice((prev) => prev + obj.price);
       })
    }, [item])

    useEffect(() => {
        axios.get('https://66c840068a477f50dc2d4e32.mockapi.io/Cart-json').then((res) => {
            setItem(res.data);
        }) 
    },[offer])

    return (
        <>

            <div className="overlay cards-drawweer"></div>
            {offer ? <div></div> : <div className={"drawwer-cart"} style={{display: item.length ? 'block' : 'none'}}  >
                <h1>Корзина</h1>
                <img src="/img/delete.png" alt="Close" className="close" onClick={onClose}/>

                 <div>
                    {item
                    .map((item, index) => (
                        <>
                            <Card  
                                key={index}
                                title={item.title}
                                price={item.price}
                                imageUrl={item.imageUrl}
                                InCart={true}   
                                CardId={item.id}                                            
                                onDelete={() => OnFetch()}
                            />
                        </>
                    ))
                    }
                </div>

                <div className="check-summ" style={{marginTop: item.length === 1 && '310px'}}>
                    <p>Итого:</p>
                    <div></div>
                    <h5>{price} руб.</h5>
                </div>

                <div className="check-nalog">
                    <p>Налог 5%:</p>
                    <div></div>
                    <h5>{price / 100} руб.</h5>
                </div>

                <div className="green-btn" style={{marginBottom: '10px'}} onClick={offerComplete}>
                    <p onClick={() => {setOffer(true)}}>Оформить заказ</p>
                    <img onClick={() => setOffer(true)} src="/img/arrow.svg" alt="arrow" className="arrow"/>
                </div>
            </div>}

            {!item.length && 
            <div className="drawwer-cart" style={{display: offer ? 'none' : 'block'}}>
                 <h1 className="title-empty-cart">Корзина</h1>
                 
                 <img width={134} height={134} src="/img/emptyCart.png" alt="" className="empty-cart" />
                
                 <h2 className="empty-cart-name">Корзина пустая</h2>
                 <p className="empty-cart-content">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                <div className="green-button-back" onClick={onClose}>
                    <img src="/img/arrow.svg" alt="arrow" className="empty-cart-arrow"/>
                    <p className="grn-p">Вернуться назад</p>
                </div>
            </div>
            }

            {offer && 
                <div className="offer drawwer-cart">
                    <h1>Корзина</h1>
                    <img src="/img/orderComplete.png" alt="offer-complete" />
                    <h2 className="offer-h1">Заказ оформлен!</h2>
                    <p>Ваш заказ #{offerCount} скоро будет передан курьерской доставке</p>
                    <div className="green-button-back-offer" onClick={() => {setOffer(false); onClose()}} >
                        <p>Вернуться назад</p>
                        <img src="/img/arrow.svg" alt="arrow" className="arrow"/>
                    </div>
                </div>
            }
        </>
    );
}