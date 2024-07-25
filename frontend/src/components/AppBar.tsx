import { Link } from "react-router-dom";

export const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-2 items-center">
      <Link to={"/blogs"}>Medium</Link>
      <div>
        <Link to={'/publish'}
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 "
        >
          Add Blog
        </Link>
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden rounded-full bg-gray-600">
          <span className="uppercase text-sm text-white">{"J"}</span>
        </div>
      </div>
    </div>
  );
};
