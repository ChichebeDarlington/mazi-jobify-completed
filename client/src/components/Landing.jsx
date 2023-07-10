import styled from "styled-components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="w-[90%] mx-auto mt-10">
      <nav className="flex gap-3">
        <div className="">
          <img
            src="/android-chrome-192x192.png"
            alt="mazify"
            className="w-12"
          />
        </div>
        <h4 className="text-2xl">Mazify</h4>
      </nav>
      <div className="md:flex">
        <div className="flex-1">
          <h1 className="text-5xl m-5">
            Job<span> tracking</span> app
          </h1>
          <p className="my-5 mx-auto max-w-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            fugit! Qui sed, a dolorum maxime exercitationem esse reiciendis
            mollitia inventore sint at tenetur, quas asperiores, nihil alias nam
            atque? Autem.
          </p>
          <Link
            to="/signup"
            className="bg-teal-500 rounded-md p-2 text-white hover:bg-teal-700"
          >
            Sign up/Sign in
          </Link>
        </div>
        <img
          src="/Mindfulness.png"
          alt=""
          className="hidden md:block w-72 flex-1 h-72 translate-y-48 rounded-md"
        />
      </div>
    </main>
  );
};

export default Landing;
