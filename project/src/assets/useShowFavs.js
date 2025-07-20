import {useState} from 'react'

export const useShowFavs= function(){


    const [showFavs, setShowFavs]=useState(false)
    const [typeFilter, setTypeFilter]=useState("")

    const handleChangeDisplayFavs=function(){
        console.log("change showfavs clicked")
        setShowFavs(!showFavs)
    }

    const handleChangeType=function(type){
        setTypeFilter(type)
        console.log(type)
    }
    console.log(typeFilter)

    return {"showFavs":showFavs, "changeDisplayFavs":handleChangeDisplayFavs, "typeFilter":typeFilter, "changeTypeFilter":handleChangeType}
}