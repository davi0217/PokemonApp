import { createContext, useCallback, useContext, useState, useRef, useEffect} from 'react'
import {usePokemons} from './usePokemons.js'
import { useShowFavs } from './assets/useShowFavs.js'
import './App.css'
 
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
  const typeFilter=useContext(FavouritesContext)[6]

  const [numbers, setNumbers]=useState([])
  const [current, setCurrent]=useState(0)
  

  const[favsLength, setFavsLength]=useState(0)
  
  useEffect(()=>{
      
    if(numbers.length<=current){
      setFavsLength(current-1)
      setCurrent(current-1)
    }else{   
    setFavsLength(0)
    setCurrent(0)}
  }, [typeFilter, numbers.length])


  const favsToShow=favs.filter((fav)=>{
    if(fav.types.some((p)=>{
      return p.includes(typeFilter)
    })){
      return true
    }
  })

  const handleChangePagination=function(ind){
    setFavsLength(ind)
  }



  console.log(favs)
  console.log(favsToShow)
  

  return <>
  {showFavs && ( <aside>
  <p>There are {favsToShow.length} favs to show, {favs.length} in total</p>
      {favsToShow && favsToShow.slice(favsLength*4, favsLength*4+4).map((fav)=>{      
            return (
           <div className='favContainer'>
          <h1>{fav.name}</h1>
          <div className='favContainerDisplay'>
          <img src={fav.img} alt="" />
          <button onClick={()=>{
            removeFav(fav.id)
          }}>Remove from favs</button>
          </div>
          </div>)})

      }

    
    <PaginationContext value={[numbers, setNumbers, current, setCurrent]}>

    <PaginationDisplay length={favsToShow.length} handleChangePagination={handleChangePagination}/>
    </PaginationContext>

  </aside> ) }
</>

}

function PaginationDisplay({length, handleChangePagination}){

  /* const [numbers, setNumbers]=useState([]) */

  const numbers=useContext(PaginationContext)[0]
  const setNumbers=useContext(PaginationContext)[1]
  const currentNumber=useContext(PaginationContext)[2]
  const setCurrentNumber=useContext(PaginationContext)[3]

 
  useEffect(()=>{

    let newNums=[]

     for(let i=0;i<length; i++){
    if(i%4===0){
      newNums.push(i/4)
    }}

    setNumbers(newNums)
    console.log(length)
    console.log("newnums is "+ newNums)
  


  },[length])

  const numbersFiltered=numbers.filter((n)=>{
    
    if(numbers.indexOf(n)<currentNumber+3 && numbers.indexOf(n)>=currentNumber ||numbers.indexOf(n)==numbers.length-1 || (n>numbers.length-6 && currentNumber>numbers.length-5)){
      return true
    }

  })



  return <div className="paginationDisplay">
    {(numbers.length>1)&& <><button className='paginationDisplayButton' onClick={()=>{

      if(currentNumber>0){
      handleChangePagination(0)
      setCurrentNumber(0)}
    }}>
    &lt;_
      </button>
      <button className='paginationDisplayButton' onClick={()=>{

      if(currentNumber>0){
      handleChangePagination(currentNumber-1)
      setCurrentNumber(currentNumber-1)}
    }}>
    &lt;
      </button>
      </>
      }
      {(numbers.length>=7) && numbersFiltered.map((n)=>{
          if(numbersFiltered.indexOf(n)==numbersFiltered.length-1){

            return <>
            {currentNumber<numbers.length-5 && <button className="paginationDisplayButton">...</button>}
            {currentNumber==numbers.length-5 && <button className={currentNumber==n?"paginationDisplayButton paginationDisplayButtonChecked":"paginationDisplayButton"} value={n} onClick={(e)=>{
              handleChangePagination(e.target.value)
              setCurrentNumber(n)
         }}>{n-1}</button>}
            
            <button className={currentNumber==n?"paginationDisplayButton paginationDisplayButtonChecked":"paginationDisplayButton"} value={n} onClick={(e)=>{
              handleChangePagination(e.target.value)
              setCurrentNumber(n)
         }}>{n}</button>
         </>

          }

         return <button className={currentNumber==n?"paginationDisplayButton paginationDisplayButtonChecked":"paginationDisplayButton"} value={n} onClick={(e)=>{
              handleChangePagination(e.target.value)
              setCurrentNumber(n)
         }}>{n}</button>
      })}
      {(numbers.length<7) && numbers.map((n)=>{
         return <button className={currentNumber==n?"paginationDisplayButton paginationDisplayButtonChecked":"paginationDisplayButton"} value={n} onClick={(e)=>{
              handleChangePagination(e.target.value)
              setCurrentNumber(n)
         }}>{n}</button>
      })}

       {(numbers.length>1)&& <><button className='paginationDisplayButton' onClick={()=>{

      if(currentNumber<numbers.length-1){
      handleChangePagination(currentNumber+1)
      setCurrentNumber(currentNumber+1)}
    }}>
    &gt;
      </button>
      <button className='paginationDisplayButton' onClick={()=>{

      if(currentNumber<numbers.length-1){
      handleChangePagination(numbers.length-1)
      setCurrentNumber(numbers.length-1)}
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
