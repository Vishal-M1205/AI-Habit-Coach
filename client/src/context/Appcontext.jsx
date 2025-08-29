import { createContext, useState } from "react";


export const Appcontext = createContext()
const Appcontextprovider = (props) => {
    const [login,setLogin] = useState(true);
const value ={
  login,setLogin
}
    
  return (
    <Appcontext.Provider value={value}>
{
    props.children
} 

    </Appcontext.Provider>
  )
}

export default Appcontextprovider
