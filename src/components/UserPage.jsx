import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import Card from "./Card";

export default function UserPage({ opened, onFavoriteOpened, onUserPageOpen, onUserPageClose}){
    const [item, setItem] = useState([]);

    useEffect(() => {
      axios.get('https://66d73727006bfbe2e650356f.mockapi.io/UserProfile').then((res) => {
          setItem(res.data);
      })
    },[])

    return (
        <>
          <div className="wrapper UserPage" style={{ marginTop: '-37px'}}>
            <Header opened={() => opened()} onFavoriteOpened={() => onFavoriteOpened()} onUserPageOpen={() => onUserPageOpen()}/>

            <svg style={{display: !item.length ? 'none' : 'block'}} width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="UserPageBack"
            onClick={() => onUserPageClose()}
            >
                <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="#CBCBCB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                transform="translate(-3)"/>
            </svg>
            
            <h1 className="my-offers" style={{display: !item.length ? 'none' : 'block'}} >Мои покупки</h1>

            <div className="cards-userpage" style={{display: 'flex', flexWrap: 'wrap'}}>
              {item.map((obj, index) => (
                      <>
                          <Card 
                        key={index}
                        title={obj.title}
                        price={obj.price}
                        imageUrl={obj.imageUrl}
                        inUserPage={true}
                    />
                      </>
                    ))}
              </div>

              {!item.length && 
                <div className="empty-user-page">
                    <img src="/img/noOrder.png" alt="empty-user-page" className="empty-user-page-img" />
                    <h1 className="empty-offers">У вас нет заказов</h1>
                    <p className="empty-user-page-p">Вы нищеброд? <p className="p2">Оформите хотя бы один заказ</p></p>

                    <div className="green-button-user-page" onClick={() => onUserPageClose()}>
                      <p>Вернуться назад</p>
                      <img src="/img/arrow.svg" alt="arrow" className="arrow"/>
                    </div>
                </div>
              }
            </div>
        </>
    );
}