import { useEffect, useState } from 'react'
import Header from './components/Header'
import './App.scss'
import Card from './components/Card';
import axios from 'axios';
import Drawer from './components/Drawer';
import FavoritePage from './Pages/FavoritePage';
import UserPage from './components/UserPage';

// cd gamesWebDev - game web dev; cd Desktop\Python\index-reat-vite - snekaers

export default function App(){
  const [value, setValue] = useState('');
  const [snekaersData, setSneakersData] = useState([]);
  const [CartOpened,setCartOpened] = useState(false);
  const [FavoriteOpened,setFavoriteOpened] = useState(false);
  const [OnAdd, setOnAdd] = useState(false);
  const [load, setLoad] = useState(false);
  const [userPage, setUserPageOpen] = useState(false);

  
  const OnFavoriteClose = () => {
    setFavoriteOpened(false);
  }

  useEffect(() => {
    axios.get('https://66c840068a477f50dc2d4e32.mockapi.io/Sneakers-json').then((res) => {
      setSneakersData(res.data)
    });
  }, [])

  const onPluSFunc = async (item) => {
    setLoad(true);
    await axios.post('https://66c840068a477f50dc2d4e32.mockapi.io/Cart-json', item);
    setOnAdd(!OnAdd);
    setLoad(false);
  }

  const OnFavoriteOpened = () => {
    setFavoriteOpened(!FavoriteOpened)
  }

  const OnAddFavorite = async (item) => {
    setLoad(true);
    await axios.post('https://66d73727006bfbe2e650356f.mockapi.io/Favorite-json', item);
    setLoad(false);
  };

  const OnUserPageOpen = () => {
    setUserPageOpen(!userPage);
  }


  const Remove = async (imageUrl) => {  
    setLoad(true)
    setOnAdd(!OnAdd);
    try{
      await axios.get('https://66c840068a477f50dc2d4e32.mockapi.io/Cart-json').then((res) => {
        res.data.map((obj) => {
            obj.imageUrl === imageUrl.imageUrl && axios.delete(`https://66c840068a477f50dc2d4e32.mockapi.io/Cart-json/${obj.id}`)
        })
    })
    } catch (e) {
      console.log();
      
    }
    setOnAdd(!OnAdd);
    setLoad(false);
  }

  return (
    <>
    <div className="wrapper" style={{display: FavoriteOpened ? 'none' : 'block', top: value && '63%'}}>
     <div style={{display: userPage ? 'none' : 'block'}}>
      <Header opened={() => setCartOpened(true)} onFavoriteOpened={OnFavoriteOpened} onAddToCart={onPluSFunc} remove={OnAdd ? Remove() : () => null} 
          onUserPageOpen={OnUserPageOpen} 
        />
     </div>

      {load && 
          <img width={200} height={200} className='loading' src="/img/loading-buffering.gif" alt="loding" style={{position: 'absolute', left: '76px', zIndex: '100 '}} />
      }

      <div className="sneakers-section" style={{display: userPage ? 'none' : 'block'}}>
        <div className="header-section">
          <h1 className='search-value' >{value ? `Выполняется поиск по запросу: "${value}"` : 'Все кросовки'}</h1>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
          {!value && <p className="placeholder" >Поиск...</p>}
          {!value && <img src="/img/search.svg" alt="Search"  className='search-img' />}
          {value && <img src='/img/delete.png' alt='clear' className='clear' onClick={() => setValue('')} />}

        </div>

        
      
        <div className="cards" style={{display: 'flex', flexWrap: 'wrap'}}>
          {snekaersData
          .filter((item) => item?.title.toLowerCase().includes(value.toLowerCase()))
          .map((obj, index) => (
              <Card 
              key={index}
              title={obj.title}
              imageUrl={obj.ImageUrl}
              price={obj.price}
              onPlus={(item) => onPluSFunc(item)} 
              onFavorite={OnAddFavorite}
              onRemove={(imageUrl) => Remove(imageUrl)}
            />
          ))
          }
        </div>
      </div>
    </div>

    {userPage && 
      <div>
        <UserPage opened={() => setCartOpened(true)} onFavoriteOpened={OnFavoriteOpened} onCloseFavorite={OnFavoriteClose}
     onUserPageOpen={OnUserPageOpen}  onUserPageClose={() => setUserPageOpen(false)} />
      </div>
    }

    {FavoriteOpened &&
      !userPage && <div>
           <FavoritePage opened={() => setCartOpened(true)} onFavoriteOpened={OnFavoriteOpened} onCloseFavorite={OnFavoriteClose}
     onUserPageOpen={OnUserPageOpen} />
      </div>
    }


    {CartOpened && <Drawer onClose={() => setCartOpened(false)} />}
      
    {CartOpened && document.querySelector('body').setAttribute('style', 'overflow: hidden')}
    {!CartOpened && document.querySelector('body').setAttribute('style', '')}
    </>
  )
}