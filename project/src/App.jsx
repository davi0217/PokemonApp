import { createContext, useCallback, useContext, useState} from 'react'
import {usePokemons} from './usePokemons.js'
 
const FavouritesContext=createContext()

function App() {
  
  const {pokemon, isFav, favourites, searchPokemon, addToFavourites, removeFav, searchs}=usePokemons()

  return <>
  <FavouritesContext value={[isFav,favourites, addToFavourites, removeFav]}>
  <SearchBar handleClick={searchPokemon} searchs={searchs}/>
 
  <Display pok={pokemon} clickFav={addToFavourites} favourites={favourites}/>
  <DisplayFavourites favs={favourites}/>
  
  </FavouritesContext>
 </>
}

function DisplayFavourites(){

  const favs=useContext(FavouritesContext)[1]
  const removeFav=useContext(FavouritesContext)[3]
  

  return <aside>
      {favs && favs.map((fav)=>{

          return <>
          <h1>{fav.name}</h1>
          <img src={fav.img} alt="" />
          <button onClick={()=>{
            removeFav(fav.id)
          }}>Remove from favs</button>
          </>

      })}

  </aside>


}

function Footer(){

  const favs=useContext(FavouritesContext)[1]

  return <footer>
    [
    {favs && favs.map((fav)=>{
      return <span>
        {fav.name+" "}
      </span>
    })}
    ]
  </footer>
}

function Display({pok}){

  const clickFav=useContext(FavouritesContext)[2]
  const isFav=useContext(FavouritesContext)[0]
  

  return <>
        {pok && <div>
          <h1>{pok.name}</h1>
          <img src={pok.img} alt="" />
          <h3>Ability: {pok.ability}</h3>
          <h3>Type: {pok.types} </h3>
          <h3>Id: {pok.id}</h3>
          <button disabled={isFav} onClick={()=>{
            clickFav()
          }}>Add to favourites</button>
          </div>}
          <Footer/>
  </>
}

function SearchBar({handleClick, searchs}){
  const [value, setValue]=useState()

  const handleChange=function(e){
    setValue(e)
  }

  return <>
  <label htmlFor="search">Look for a pokemon</label> <br />
  <input type="text" placeholder='Pikachu, charmander...' onChange={(e)=>{
handleChange(e.target.value)
  }} />
  <button onClick={()=>{
    handleClick(value)
  }}>Search</button>
  <h5>You've made a total of {searchs} searchs</h5>
  </>
}

export default App
