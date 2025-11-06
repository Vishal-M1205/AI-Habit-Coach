import React, { use, useContext, useEffect, useState } from 'react'
import { Appcontext } from '../context/Appcontext';
import  {  toast } from 'react-toastify';
import axios from 'axios';

const ChatPage = () => {
    const { token, resp, setResp, prompt, setPrompt } = useContext(Appcontext);
    const [isLoading, setIsLoading] = useState(false);

    const getResponse = async () => {
        if (!prompt.trim()) {
            toast.warn("Please enter a prompt.");
            return;
        }

        const userMessage = {
            role: "user",
            content: prompt
        };

        setResp(prevResp => [...prevResp, userMessage]);
        setPrompt("");
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3500/api/coach/response', {
                prompt: userMessage.content,
                history: [...resp, userMessage]
            }, {
                headers: {
                    token: token
                }
            });
            console.log(response);
            const data = response.data;
            if (data.success) {
                const modelMessage = {
                    role: "model",
                    content: data.data
                };
                setResp(prevResp => [...prevResp, modelMessage]);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.log("Error getting response:", error);
        } finally {
            setIsLoading(false);
        }
    }
 
  return (
    <div>
      <div className='flex  items-center gap-5 bg-white shadow-2xl ml-10 mr-10 shadow-gray-400 rounded-2xl p-5'>
  <img src="chatbot.png" alt="chatbot image" className='w-12 h-12'/>
  <h1 className='text-5xl bg-gradient-to-b from-green-400 to-blue-400 bg-clip-text  text-transparent font-bold'>AI Chatbot</h1>
      </div>
      <div className='bg-white rounded-2xl shadow-grey-400 ml-10 mr-10  shadow-2xl p-5 mt-10 h-fit'>
         <div className='bg-blue-100  h-120 rounded-2xl overflow-y-auto p-4'>
           <div className='flex flex-col'>
                        {resp.map((item, index) => {
                            if (item.role === "model") {
                                return (
                                    <div key={index} className='text-blue-500 bg-white rounded-2xl max-w-md self-start px-3 py-2 my-1'>
                                        {item.content}
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div key={index} className='text-white bg-blue-500 rounded-2xl max-w-md self-end px-3 py-2 my-1'>
                                        {item.content}
                                    </div>
                                )
                            }
                        })}
                        {isLoading && (
                            <div className='text-blue-500 bg-white rounded-2xl max-w-md self-start px-3 py-2 my-1'>
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-2 h-2 rounded-full animate-pulse bg-blue-500"></div>
                                    <div className="w-2 h-2 rounded-full animate-pulse bg-blue-500 delay-75"></div>
                                    <div className="w-2 h-2 rounded-full animate-pulse bg-blue-500 delay-150"></div>
                                </div>
                            </div>
                        )}

           </div>
         </div>
         <div className=' w-full bg-green-300 mb-3 mt-2  pl-3 py-2 rounded-full h-auto    flex items-center'>
                 <input type="text" name="" id="" placeholder='Enter your prompt...' className='bg-white py-2 px-4 h-auto rounded-full w-11/12' value={prompt} disabled={isLoading} onKeyDown={(e)=>{
                    if(e.key === 'Enter' && !isLoading){
                        e.preventDefault();
                        getResponse();
                    }
                 }} onChange={(e)=>{
                    setPrompt(e.target.value);
                 }}/>
                 <button className='text-xl px-3 py-2 mx-2 bg-blue-400 rounded-full  text-white'  onClick={()=>{
                    if(!isLoading){
                        getResponse();
                    }
                 }}>
                    Send
                 </button>
         </div>
      </div>
    </div>
  )
}

export default ChatPage
