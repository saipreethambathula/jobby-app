import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="h-screen 
        bg-cover bg-center 
        bg-[url('https://assets.ccbp.in/frontend/react-js/home-sm-bg.png')] 
        lg:bg-[url('https://assets.ccbp.in/frontend/react-js/home-lg-bg.png')] px-15 py-20"
    >
      <h1 className="text-white text-5xl leading-relaxed font-semibold">
        Find The Job That Fits <br /> Your Life
      </h1>
      <p className="text-white text-2xl mb-8 mt-5 font-extralight">
        Millions of people are searching for jobs,salary <br />
        information, company reviews. Find the jobs that <br /> fits your
        ability and potential
      </p>
      <Link to="/jobs" className="bg-[#6366f1] text-white px-8 py-3 rounded-md">
        Find Jobs
      </Link>
    </div>
  );
};

export default Home;
