import React,{useEffect} from "react"

const Anasayfa=()=>{
    useEffect(()=>{
        const id=localStorage.getItem('id')
        const role=localStorage.getItem('role')
        
        console.log(id)
        console.log(role)
       
     },[])
  
    return (
       
                <div style={{width:'100%',height:'100%',backgroundColor:'black'}}>
                    <h1 style={{color:'white',width:'100%',textAlign:'center'}}>Burası benim sayfam</h1>
                   
                </div>
                
    )
}

export default Anasayfa