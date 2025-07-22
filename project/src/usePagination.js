import {useState, useEffect, useContext} from 'react'

export const usePagination=function(){

    const [numbers, setNumbers]=useState([])
    const [current, setCurrent]=useState(0)
    const [numbersFiltered, setNumbersFiltered]=useState([])

    useEffect(()=>{
        
        const newNums=numbers.filter((n)=>{
            
            if((n<current+3 && n>=current) ||n==numbers.length-1 || (n>numbers.length-6 && current>numbers.length-5)){
                return true
            }
        })

       
        
        setNumbersFiltered(newNums)
    }, [current, numbers])
    

    useEffect(()=>{


      
    if(numbers.length<=current){
     /*  setFavsLength(current-1) */
      setCurrent(current-1)
    }else{   
   /*  setFavsLength(0) */
    setCurrent(0)}
  }, [numbers.length])


    const handleChangePagination=function(ind){
    setCurrent(ind)
  }

  const handleNumbers=function(nums){
    setNumbers(nums)

  }

  console.log(numbersFiltered)


    return {"numbers":numbers, "setNumbers":handleNumbers,  "current":current, "handleChangePagination":handleChangePagination, "numbersFiltered":numbersFiltered}
}