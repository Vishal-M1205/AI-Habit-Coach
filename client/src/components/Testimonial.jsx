const Testimonial = ()=>{

    return (
        <>
        <div className="mt-10 p-4">
            <div className="flex flex-row justify-center items-center gap-1">
                <img src="star.png" alt="" className="w-7 h-7" />
                <img src="star.png" alt="" className="w-7 h-7" />
                <img src="star.png" alt="" className="w-7 h-7" />
                <img src="star.png" alt="" className="w-7 h-7" />
                <img src="star.png" alt="" className="w-7 h-7" />
            </div>
              <p className="text-center mt-4">"HabitCoach AI has completely transformed my daily routine. The AI insights are incredibly helpful!"</p>
              
        </div>
        <div className="pb-10">
            <div className="max-w-3xl flex flex-col m-auto px-10 py-10  items-center justify-center mt-5 bg-gradient-to-r from-blue-500 to-green-500 rounded-4xl">
                <h1 className="text-white  text-4xl font-bold leading-relaxed">Ready to Transform Your Life?</h1>
                <h1 className="text-white text-lg leading-relaxed">Join thousands of users who are building better habits with AI-powered coaching.</h1>
                <button className="mt-4 px-6 py-2 bg-white text-blue-500 font-semibold rounded-lg">Start Now!</button>

              </div>
        </div>
        
    </>
    )
}

export default Testimonial;