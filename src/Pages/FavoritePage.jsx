import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Card from "../components/Card";

export default function FavoritePage({ opened, onFavoriteOpened, onCloseFavorite, onUserPageOpen }){
    const [item, setItem] = useState([]);

    useEffect(() => {
        axios.get('https://66d73727006bfbe2e650356f.mockapi.io/Favorite-json').then((res) => {
            setItem(res.data)
        })
    },[])

    return (
        <>
        <div className="wrapper Favorite" style={{display: 'block', marginTop: '-69px'}}>
            <Header opened={() => opened()} onFavoriteOpened={() => onFavoriteOpened()} onUserPageOpen={() => onUserPageOpen()}/>

            <svg style={{display: item.length ? 'block' : 'none'}} className="back" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"
            onClick={() => onCloseFavorite()}
            >
                <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="#CBCBCB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                transform="translate(-3)"/>
            </svg>
            <h1 style={{marginLeft: '110px', display: item.length ? 'block' : 'none'}} className="h1-favorite" >Мои Закладки</h1>   

            <div className="Favorite-cards">
           {     item.map((item, index) => (
                        <Card style={{display: 'flex'}} 
                            key={index}
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            inFavorite={true}  
                            CardId={item.id}  
                        />
                    ))    }
           </div>  

           {!item.length && 
            <>
                <div className="empty-favorite">
                    <img src="/img/noFavorite.png" alt="Empty-favorite" className="empty-favorite-img" />
                    <h2 className="title-favorite-empty">Закладок нет :(</h2>  
                    <p className="favorite-empty-p">Вы ничего не добавляли в закладки</p>

                    <div className="green-button-back-favorite" onClick={() => onCloseFavorite()}>
                        <p>Вернуться назад</p>
                        <img src="/img/arrow.svg" alt="Back" />
                    </div>
                </div>
            </>
           }
        </div>


        </>
    );
}