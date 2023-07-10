import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 mb-10">
        <img src="/Not-found.png" alt="not found" className="h-80" />
        <h3>404 not found</h3>
        <p>Please try again later</p>
        <Link
          to="/"
          className="bg-teal-500 rounded-md p-2 text-white hover:bg-teal-700"
        >
          back home
        </Link>
      </div>
    </main>
  );
};

export default Error;
