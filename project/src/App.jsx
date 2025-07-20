import { createContext, useCallback, useContext, useState} from 'react'
import {usePokemons} from './usePokemons.js'
import { useShowFavs } from './assets/useShowFavs.js'
import './App.css'
 
const FavouritesContext=createContext()

function App() {
  
  const {pokemon, isFav, favourites, searchPokemon, addToFavourites, removeFav, searchs}=usePokemons()

  const {showFavs, changeDisplayFavs, typeFilter, changeTypeFilter}=useShowFavs()

  return <main>
  <FavouritesContext value={[isFav,favourites, addToFavourites, removeFav, showFavs, changeDisplayFavs, typeFilter, changeTypeFilter]}>
  <SearchBar handleClick={searchPokemon} searchs={searchs}/>

  <Display pok={pokemon} clickFav={addToFavourites} favourites={favourites}/>
  <DisplayFavourites favs={favourites}/>
  <Footer/>
  
  </FavouritesContext>
 </main>
}

function FilterFavs(){

  const showFavs=useContext(FavouritesContext)[4]
  const setShowFavs=useContext(FavouritesContext)[5]
  const typeFilter=useContext(FavouritesContext)[6]
  const changeTypeFilter=useContext(FavouritesContext)[7]

  return <div className='filterContainer'>  

      <label htmlFor="favsFilter">Show your favourites</label>
      <input type="checkbox" name="favsFilter" checked={showFavs} onChange={()=>{
        setShowFavs()
      }}/>

      {showFavs && (<div>
        <label htmlFor="typeFilter">Filter by type</label>
        <select name="typeFilter" id="typeFilter" value={typeFilter} onChange={(e)=>{
          changeTypeFilter(e.target.value)
        }}>
          <option value="" defaultValue>Any</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="ghost">Ghost</option>
          <option value="fairy">Fairy</option>
          <option value="steel">Steel</option>
          <option value="ground">Ground</option>
          <option value="electric">Electric</option>
          <option value="rock">Rock</option>
          <option value="normal">Normal</option>
          <option value="poison">Poison</option>
          <option value="flying">Flying</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="bug">Bug</option>
          <option value="psychic">Psychic</option>
          <option value="dark">Dark</option>
          <option value="fight">Fight</option>
        </select>

      </div>)}

  </div>
}

function DisplayFavourites(){

  const favs=useContext(FavouritesContext)[1]
  const removeFav=useContext(FavouritesContext)[3]
  const showFavs=useContext(FavouritesContext)[4]
  const typeFilter=useContext(FavouritesContext)[6]
  

  return <>
  {showFavs && ( <aside>
      {favs && favs.map((fav)=>{
          if (fav.types.some((p)=>{
          return p.includes(typeFilter)
        })){
            return (
           <div className='favContainer'>
          <h1>{fav.name}</h1>
          <div className='favContainerDisplay'>
          <img src={fav.img} alt="" />
          <button onClick={()=>{
            removeFav(fav.id)
          }}>Remove from favs</button>
          </div>
          </div>)}})

      }

  </aside> ) }
</>

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
  
  if(pok){
  return <div className="pokeContainer">
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
          
  </div>}
}

function SearchBar({handleClick, searchs}){
  const [value, setValue]=useState()

  const handleChange=function(e){
    setValue(e)
  }

  return <>
  <label htmlFor="search">Look for a pokemon</label> <br />
    <FilterFavs/>
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
