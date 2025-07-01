import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-green-700">About Marathon Project</h1>
      
      <p className="mb-4 text-gray-700">
        🏃 Marathon Management System is a web application built to help runners and organizers 
        manage marathons efficiently. It provides a user-friendly platform to register for events, 
        manage personal profiles, and track marathon details.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2 text-green-600">Features</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Browse upcoming marathons and view details</li>
        <li>Register and apply for marathon events</li>
        <li>User dashboard for managing profile and applications</li>
        <li>Admin panel to add and manage marathons and participants</li>
        <li>Responsive design for desktop and mobile devices</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2 text-green-600">Our Team</h2>
      <p className="mb-4 text-gray-700">
        This project is developed by Sabba Niloy and team as part of a web development portfolio.
      </p>

      <h2 className="text-2xl font-semibold mb-2 text-green-600">Contact</h2>
      <p className="text-gray-700">
        Email: <a href="mailto:sabbahossain@gmail.com" className="text-green-600 underline">sabbahossain@gmail.com</a><br />
        Phone: +880 1869 678455
      </p>
    </div>
  );
};

export default About;
