import { createContext,useMemo, useCallback, useContext, useState, useRef, useEffect} from 'react'
import {usePokemons} from './usePokemons.js'
import { useShowFavs } from './assets/useShowFavs.js'
import './App.css'
import { usePagination } from './usePagination.js'
 
const FavouritesContext=createContext()
const PaginationContext=createContext()

function App() {
  
  const {pokemon, isFav, favourites, searchPokemon, addToFavourites, removeFav, searchs, error, loading}=usePokemons()

  const {showFavs, changeDisplayFavs, typeFilter, changeTypeFilter}=useShowFavs()

  const [clearMode, setClearMode]=useState(false)

  const handleClearMode=function(){
        setClearMode(!clearMode)
  }

  return <main className={clearMode?"clearMode":""}>
  <FavouritesContext value={[isFav,favourites, addToFavourites, removeFav, showFavs, changeDisplayFavs, typeFilter, changeTypeFilter]}>
 
 <form className="clearModeForm" action="">
 <label htmlFor="setClearMode">Change to {clearMode?"dark mode":"clear mode"}</label>
 <input type="checkbox" name="setClearMode" checked={clearMode} onChange={()=>{
handleClearMode()
 }} />
 </form>
 
  <SearchBar handleClick={searchPokemon} searchs={searchs}/>
  <Display pok={pokemon} error={error} loading={loading}/>
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
          <option value="fighting">Fighting</option>
        </select>

      </div>)}

  </div>
}






function DisplayFavourites(){

  const favs=useContext(FavouritesContext)[1]
  const removeFav=useContext(FavouritesContext)[3]
  const showFavs=useContext(FavouritesContext)[4]
  const[favsToShow, setFavsToShow]=useState([])
  const {numbers, setNumbers, current, handleChangePagination, numbersFiltered}=usePagination()
  const typeFilter=useContext(FavouritesContext)[6]


useEffect(()=>{
  
  setFavsToShow(favs.filter((fav)=>{
      if(fav.types.some((p)=>{
        return p.includes(typeFilter)
      })){
        return true
      }
    }))
  }, [favs, typeFilter])

useEffect(()=>{
  
  let newNums=[]
  
  for(let i=0;i<favsToShow.length; i++){
    if(i%4===0){
      newNums.push(i/4)
    }}
    
    setNumbers(newNums)
    
  },[favsToShow])


  return <>
  {showFavs && ( <aside>
  <p>There are {favsToShow.length} favs to show, {favs.length} in total</p>
      {favsToShow && favsToShow.slice(current*4, current*4+4).map((fav)=>{      
            return (
           <div className='favContainer'>
          <h1>{fav.name}</h1>
          <div className='favContainerDisplay'>
          <img src={fav.img} alt="" />
          <button onClick={()=>{
            removeFav(fav.id)
          }}>Remove from favs</button>
          <button onClick={()=>{
            return null
          }}>Add to team</button>
          </div>
          </div>)})

      }

    <PaginationDisplay length={favsToShow.length} handleChangePagination={handleChangePagination} numbersFiltered={numbersFiltered} numbers={numbers} setNumbers={setNumbers} currentNumber={current}/>

  </aside> ) }
</>

}





function PaginationDisplay({handleChangePagination, numbersFiltered, numbers, currentNumber}){

 

  return <div className="paginationDisplay">
    {(numbers.length>1)&& <><button className='paginationDisplayButton' onClick={()=>{

      if(currentNumber>0){
      handleChangePagination(0)
      }
    }}>
    &lt;_
      </button>
      <button className='paginationDisplayButton' onClick={()=>{

      if(currentNumber>0){
      handleChangePagination(currentNumber-1)
     }
    }}>
    &lt;
      </button>
      </>
      }
      {(numbers.length>=7) && numbersFiltered?.map((n)=>{
          if(n==numbers.length-1){

            return <>
            {currentNumber<numbers.length-5 && <button className="paginationDisplayButton">...</button>}
            {currentNumber==numbers.length-5 && <button className={currentNumber==n-1?"paginationDisplayButton paginationDisplayButtonChecked":"paginationDisplayButton"} value={n-1} onClick={(e)=>{
              handleChangePagination(e.target.value)
            
         }}>{n-1}</button>}
            
            <button className={currentNumber==n?"paginationDisplayButton paginationDisplayButtonChecked":"paginationDisplayButton"} value={n} onClick={(e)=>{
              handleChangePagination(e.target.value)
             
         }}>{n}</button>
         </>

          }

         return <button className={currentNumber==n?"paginationDisplayButton paginationDisplayButtonChecked":"paginationDisplayButton"} value={n} onClick={()=>{
              handleChangePagination(n)
             
         }}>{n}</button>
      })}
      {(numbers.length<7) && numbers.map((n)=>{
         return <button className={currentNumber==n?"paginationDisplayButton paginationDisplayButtonChecked":"paginationDisplayButton"} value={n} onClick={(e)=>{
              handleChangePagination(e.target.value)
             
         }}>{n}</button>
      })}

       {(numbers.length>1)&& <><button className='paginationDisplayButton' onClick={()=>{

      if(currentNumber<numbers.length-1){
      handleChangePagination(currentNumber+1)
      }
    }}>
    &gt;
      </button>
      <button className='paginationDisplayButton' onClick={()=>{

      if(currentNumber<numbers.length-1){
      handleChangePagination(numbers.length-1)
   }
    }}>
    _&gt;
      </button>
      </>
      }
  </div>
}

function Footer(){

  const favs=useContext(FavouritesContext)[1]

  return <footer>FAVS: 
    [
    {favs && favs.map((fav)=>{
      return <span>
        {fav.name+" "}
      </span>
    })}
    ]
  </footer>
}

function Display({pok, error, loading}){

  const clickFav=useContext(FavouritesContext)[2]
  const isFav=useContext(FavouritesContext)[0]
  
if(loading){
  return <h1 style={{color:"red"}}>LOADING</h1>
}else if(error){
    return <h1>Your pokemons does not exist...</h1>
  }else if(pok){
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
