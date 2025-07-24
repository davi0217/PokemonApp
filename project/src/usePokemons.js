import {useState, useEffect, useRef} from 'react'



export const usePokemons=function(){
     const [pokemon, setPokemon]=useState(null)

    const localFavs=JSON.parse(localStorage.getItem("favs"))  
    
     const [favourites, setFavourites]=useState(localFavs?localFavs:[])
     const [isInFav, setIsInFav]=useState(false)

     const [team, setTeam]=useState([])

     const [error, setError]=useState(false)

     const [loading, setLoading]=useState(false)

     

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

     useEffect(()=>{

         let newTeam=[]
       


         favourites?.forEach((poke)=>{
                    if( poke?.isInTeam===true){
                        newTeam.push(poke)
                    }
                }) 
            
            
            setTeam(newTeam)
            console.log("my team is "+ team)
            console.log("my new team is "+ newTeam)
     }, [favourites])

    
      
     
    
      const searchPokemon=async function(value){

          setLoading(true)
          let searchPokemon= await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`).then(
              (result)=>{
                  setError(false)
                  return result.json()
                }    
        
        ).then((data)=>{ 
                    setLoading(false) 
                    return data}
                ).catch((err)=>{
                    setError(true)
                    setLoading(false)
                })

            
              
            const randomNum=Math.floor(Math.random()*20)
                searchPokemon={
                    "name": searchPokemon.name[0].toUpperCase()+searchPokemon.name.substring(1, searchPokemon.name.length),
                    "id":searchPokemon.id,
                    "img": randomNum===2?searchPokemon?.sprites?.front_shiny:searchPokemon?.sprites.front_default,
                    "ability":searchPokemon.abilities[0].ability.name,
                    "isInTeam":false,
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
  
    }

    const markFavourite=function(id){ 

        let counter=0
        let add=true

        favourites.forEach((p)=>{
            if(p.isInTeam){
                counter++
            }
        })

        if(counter==6) {
            add=false
        }
       
        let newFavs=favourites.map((p)=>{
            
            if(p.id==id){

                p.isInTeam=p.isInTeam==false&&add?true:false
                return  p
            }else{
                return p
            }
        })
        ;
        console.log(newFavs)
        
        setFavourites(newFavs)
       if(newFavs){
        const jsonPokes=JSON.stringify(newFavs)
        localStorage.setItem("favs", jsonPokes)}  
    }
   
    
    
    const removeFromFavourites=function(id){
        const newFavs=favourites.filter((fav)=>{
            return fav.id!==id
        })

        setFavourites(newFavs)

        localStorage.setItem("favs", JSON.stringify(newFavs))

    }
   
      return {"pokemon":pokemon, "isFav":isInFav, "favourites": favourites, "searchPokemon":searchPokemon, "addToFavourites":addToFavourites, "removeFav":removeFromFavourites, "markFavourite":markFavourite, "team":team, "searchs":searchs.current, "error":error, "loading":loading}
}