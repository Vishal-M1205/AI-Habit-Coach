import { createContext, useState } from "react";


export const Appcontext = createContext()
const Appcontextprovider = (props) => {
    const [login,setLogin] = useState(false);
    const [token,setToken] = useState('');

    
const value ={
  login,setLogin,token,setToken
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
