import React from 'react';

const AboutPage = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold'>About HabitCoach AI</h1>
      <p className='text-xl text-gray-400 mb-8'>Your personal guide to building better habits.</p>
      
      <div className="bg-white p-8 rounded-2xl shadow-md space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At HabitCoach AI, our mission is to empower individuals to build positive, life-changing habits through the power of artificial intelligence. We believe that consistency is key to personal growth, and our intelligent coach is designed to provide the support, motivation, and personalized guidance you need to stay on track and achieve your goals.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Key Features</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              <strong>Intelligent Habit Tracking:</strong> Easily add, manage, and track your daily habits. Our smart system learns your patterns to provide better insights.
            </li>
            <li>
              <strong>AI-Powered Coaching:</strong> Chat with your personal AI coach for motivation, advice, and answers to your questions about habit formation. The coach has context of your progress to give tailored support.
            </li>
            <li>
              <strong>Progress Visualization:</strong> See your journey unfold with our beautiful progress heatmap and insightful statistics, helping you understand your consistency over time.
            </li>
            <li>
              <strong>Dashboard Overview:</strong> Get a quick snapshot of your daily and weekly progress to stay motivated and informed.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Built With</h2>
          <p className="text-gray-600">
            This application is powered by modern technologies including React for the frontend, Node.js with Express for the backend, and Google's Gemini API for the intelligent coaching features.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">About the Developer</h2>
          <p className="text-gray-600 leading-relaxed">
            HabitCoach AI was created by Vishal Manivannan. You can connect with him and see more of his work on:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
            <li><a href="https://www.linkedin.com/in/vishal-manivannan-ab93b8377/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn</a></li>
            <li><a href="https://github.com/Vishal-M1205" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a></li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;