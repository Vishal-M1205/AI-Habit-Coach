
import { createContext, useState } from "react";


export const Appcontext = createContext()
const Appcontextprovider = (props) => {
    const [login,setLogin] = useState(false);
    const [token,setToken] = useState('');
const [newHabit, setNewHabit] = useState('');
    const [habits,setHabits] = useState([]);
const value ={
  login,setLogin,token,setToken,newHabit,setNewHabit,habits,setHabits
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
