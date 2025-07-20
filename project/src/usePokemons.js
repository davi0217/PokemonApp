import {useState, useEffect, useRef} from 'react'



export const usePokemons=function(){
     const [pokemon, setPokemon]=useState(null)

     const localFavs=JSON.parse(localStorage.getItem("favs"))
    
     const [favourites, setFavourites]=useState(localFavs?localFavs:[])
     const [isInFav, setIsInFav]=useState(false)

     const searchs=useRef(0)

   

     useEffect(()=>{

        setIsInFav(false)

        if(pokemon){
         favourites.forEach((poke)=>{
                    if( poke?.id===pokemon.id){
                        setIsInFav(true);
                    }
                })}  

     },[pokemon, favourites])

    
      
     
    
      const searchPokemon=async function(value){
          let searchPokemon= await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`).then(
              (result)=> {
                  return  result.json()}
                ).then((data)=>{  
                    return data}
                )   
                
                searchPokemon={
                    "name": searchPokemon.name[0].toUpperCase()+searchPokemon.name.substring(1, searchPokemon.name.length),
                    "id":searchPokemon.id,
                    "img":searchPokemon?.sprites?.front_default,
                    "ability":searchPokemon.abilities[0].ability.name,
                    "types": searchPokemon.types.map((type)=>{
                        const types=type.type.name+(searchPokemon.types.length>1 && searchPokemon.types.indexOf(type)!=searchPokemon.types.length-1?" | ":" ")
                        
                        return  types})  
                        
                    }
                    if(!(pokemon?.id==searchPokemon.id) || pokemon==null){
                    searchs.current++
                    setPokemon(searchPokemon)}
            }
            
            
    
    const addToFavourites=function(){ 
        const newPokes=[...favourites, pokemon];
        setFavourites(newPokes)
        if(newPokes){
        const jsonPokes=JSON.stringify(newPokes)
        localStorage.setItem("favs", jsonPokes)}

        pokemon.types.some((p)=>{
           console.log(p.includes("water"))
        })
       
        
    }
    
    
    const removeFromFavourites=function(id){
        const newFavs=favourites.filter((fav)=>{
            return fav.id!==id
        })

        setFavourites(newFavs)

        localStorage.setItem("favs", JSON.stringify(newFavs))

    }
   
      return {"pokemon":pokemon, "isFav":isInFav, "favourites": favourites, "searchPokemon":searchPokemon, "addToFavourites":addToFavourites, "removeFav":removeFromFavourites, "searchs":searchs.current}
}