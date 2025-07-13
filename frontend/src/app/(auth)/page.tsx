"use client";

import Link from "next/link";

export default function Landingpage() {
  return (
    <div className="bg-white text-gray-800">
      
      <div className="navbar bg-white shadow p-4 flex justify-between items-center border-b border-blue-100">
        <h1 className="text-2xl font-bold text-blue-700">C O U R S E R A</h1>
        <Link href="/login" className="btn btn-outline btn-primary">
          Login
        </Link>
      </div>

    
      <div className="bg-gradient-to-r from-white to-blue-50 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-6">
          
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-blue-600">
              Achieve Your Career Goals with Us
            </h1>
            <p className="mt-3 text-md lg:text-lg text-gray-700">
              Subscribe to build job-ready skills.
            </p>
            <p className="text-sm text-gray-600">
              Starts from BDT 1000. Cancel anytime.
            </p>
            <Link href="/signup" className="btn btn-primary mt-4">
              Get Started
            </Link>
          </div>
    
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src="/heroimg.png"
              alt="Hero"
              className="w-[350px] h-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      
      <div className="py-6 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Popular Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white">
          {[
            {
              title: "Advanced Programming",
              desc: "Learn high-level coding and system design.",
            },
            {
              title: "Database Management",
              desc: "Master SQL, NoSQL, and data modeling.",
            },
            {
              title: "Advanced Programming II",
              desc: "Deep dive into APIs and backend systems.",
            },
            {
              title: "Machine Learning",
              desc: "Build models and smart systems with ML.",
            },
          ].map((course, index) => (
            <div
              key={index}
              className="card bg-white shadow-xl border-t-4 border-blue-500"
            >
              <div className="card-body">
                <h2 className="card-title">{course.title}</h2>
                <p>{course.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="text-center bg-blue-50 py-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-3">
          Invest in Your Career
        </h2>
        <p>✔ Explore New Skills</p>
        <p>✔ Earn Valuable Credentials</p>
        <p>✔ Learn from the Best</p>
      </div>

      
      <div className="bg-white py-6 text-center px-4">
        <h2 className="text-md font-semibold text-gray-700 max-w-xl mx-auto">
          <span className="text-blue-700 font-bold">77%</span> of learners
          report career benefits like landing a new job, earning a promotion, or
          gaining applicable skills.
        </h2>
      </div>

      
      

      
      <div className="py-8 px-4 bg-white text-center">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Plans for You</h2>
        <div className=" flex flex-wrap justify-center gap-4">
          {[
            {
              plan: "Starter",
              benefit: "Access to 10 courses",
              price: "BDT 1000/month",
            },
            {
              plan: "Pro",
              benefit: "Unlimited courses + certificates",
              price: "BDT 2500/month",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="card w-80 bg-white shadow-xl border border-blue-200"
            >
              <div className="card-body">
                <h2 className="card-title">{item.plan}</h2>
                <p>{item.benefit}</p>
                <p className="text-blue-600 font-bold">{item.price}</p>
                <button className="btn btn-primary mt-4">Choose Plan</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    
      <div className="bg-blue-50 py-10 px-4 text-center">
        <h2 className="text-xl font-bold text-blue-700 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl mx-auto text-left">
          <details className="mb-4 border-b pb-2">
            <summary className="font-semibold cursor-pointer">
              Can I cancel anytime?
            </summary>
            <p className="mt-2">
              Yes, you can cancel your subscription at any time from your
              profile.
            </p>
          </details>
          <details className="mb-4 border-b pb-2">
            <summary className="font-semibold cursor-pointer">
              Will I get certificates?
            </summary>
            <p className="mt-2">
              Yes, all paid plans include certificates upon completion.
            </p>
          </details>
        </div>
      </div>

     
    </div>
  );
}
