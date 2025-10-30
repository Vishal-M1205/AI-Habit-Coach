import React, { use, useContext, useState } from 'react'
import { Appcontext } from '../context/Appcontext';
import  {  toast } from 'react-toastify';
import axios from 'axios';

const ChatPage = () => {
    const {token} = useContext(Appcontext);
    const [resp,setResp] = useState([]);
    const [prompt,setPrompt] = useState("");

    const getResponse = async()=>{
        try {
            const response = await axios.post('http://localhost:3500/api/coach/response',{
               prompt : prompt
            },{
                headers :{
                    token : token
                }
            });
            const data = response.data;
            if(data.success){
                setResp([...resp,{
                    role:"model",
                    content:data.data
                },{
                    role:"user",
                    content:prompt
                }]);
                setPrompt("");
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    }
  return (
    <div>
      
    </div>
  )
}

export default ChatPage
