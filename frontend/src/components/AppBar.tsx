import { Link } from "react-router-dom";

export const AppBar = () => {
  return (
    <div className="flex items-center justify-between border-b px-10 py-2">
      <Link to={"/blogs"}>Medium</Link>
      <div>
        <Link
          to={"/publish"}
          type="button"
          className="mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none"
        >
          Add Blog
        </Link>
        <Link
          to={"/user"}
          className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-600"
        >
          <div className="text-sm uppercase text-white">{"J"}</div>
        </Link>
      </div>
    </div>
  );
};
