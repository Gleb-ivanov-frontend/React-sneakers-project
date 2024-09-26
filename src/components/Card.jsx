import axios from "axios";
import { useEffect, useState } from "react";

export default function Card( {title, price, imageUrl, onPlus, InCart, CardId, onDelete, onFavorite, inFavorite, onRemove, inUserPage} ){
    const [favorite, setFavorite] = useState(false);
    const [addToCart, setAddToCart] = useState(false);
    const [load, setLoad] = useState(false);

    const RemoveFavorite = () => {
        axios.get('https://66d73727006bfbe2e650356f.mockapi.io/Favorite-json').then((res) => {
            res.data.map((obj) => {
                obj.imageUrl === imageUrl && axios.delete(`https://66d73727006bfbe2e650356f.mockapi.io/Favorite-json/${obj.id}`)
            })
        })
    }
    
    const DeleteItem = async () => {
        setLoad(true);
        
        await axios.delete(`https://66c840068a477f50dc2d4e32.mockapi.io/Cart-json/${CardId}`);
        await onDelete();

        setLoad(false);
    }
    
    const AddItemToCart = async () => {
        setAddToCart(!addToCart);
        !addToCart && onPlus( {title, price, imageUrl} )
        addToCart && onRemove( {imageUrl} )
    }


    const AddFavorite = async () => {
        setFavorite(!favorite);
        !favorite && onFavorite( {title, price, imageUrl } );
        favorite && RemoveFavorite()
    }

    useEffect(() => {
        axios.get('https://66c840068a477f50dc2d4e32.mockapi.io/Cart-json').then((res) => {
            res.data.map((obj) => {
                obj.imageUrl === imageUrl && setAddToCart(true);
            })
        })

        axios.get('https://66d73727006bfbe2e650356f.mockapi.io/Favorite-json').then((res) => {
            res.data.map((obj) => {
                obj.imageUrl === imageUrl && setFavorite(true);
            })
        })
    }, [load])
    
    
    return (
        <>
        {/* loaders */}
        {load && 
            <img width={200} height={200} src="/img/loading-buffering.gif" alt="loding" style={{position: 'absolute', left: '76px', zIndex: '100 '}} />
         }

        <div className="card" >
            <img width={120} height={120} className="Sneakers-Img" src={imageUrl} alt="Sneakers-img" />
            <h4>{title}</h4>
            <p>Цена:</p>
            <h3>{price} руб.</h3>

            {!inFavorite && !InCart && <img src={!favorite ? "/img/unlike.svg" : "/img/like.png"} alt="favorite" className="add-favorite" onClick={AddFavorite} style={{cursor: 'pointer', display: inUserPage ? 'none' : 'block'}}/>}
            {!inFavorite && !InCart && <img src={!addToCart ? "/img/unadded.svg" : "/img/added.svg"} alt="add-to-cart" className="add-to-cart" onClick={AddItemToCart} style={{cursor: 'pointer', display: inUserPage ? 'none' : 'block'}}/>}
            {!inFavorite && InCart && <img src="/img/delete.png" alt="delelete" style={{marginTop: '30px', marginLeft: '25px', position: 'absolute', cursor: 'pointer', display: inUserPage ? 'none' : 'block'}} onClick={DeleteItem}/>}
            {inFavorite && <img src={"/img/like.png"} alt="favorite" className="add-favorite" />}
        </div>
        </>
    );
};