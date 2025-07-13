import { useSessionCheck } from '@/components/findcookies';
import React from 'react';

export default function ABOUTUS() {
  useSessionCheck();
  return (

    <div className="min-h-screen bg-white text-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 mr-50">About Us</h1>
        <p className="text-lg text-gray-600 mb-8 mr-50">
          Welcome to <span className="font-semibold text-blue-600">C O U R S E R A</span>, your trusted platform for learning and growth.
          We believe in empowering individuals with the skills they need to thrive in the modern world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 text-left">
          <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Our Mission</h2>
            <p className="text-gray-700">
              To make quality education accessible, flexible, and impactful for everyone, everywhere.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">What We Offer</h2>
            <p className="text-gray-700">
              Expert-led courses, real-world projects, and a supportive community that helps learners succeed.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Our Vision</h2>
            <p className="text-gray-700">
              To be the most learner-focused platform that bridges the gap between education and opportunity.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Why Choose Us</h2>
            <p className="text-gray-700">
              Practical content, interactive sessions, and constant innovation in how education is delivered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
