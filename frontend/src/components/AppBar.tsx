import { Avatar } from "./BlogCard";

export const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-2 items-center">
      <div>Medium</div>
      <div>
        <div
          className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden rounded-full bg-gray-600`}
        >
          <span className="uppercase text-sm text-white">{"J"}</span>
        </div>
      </div>
    </div>
  );
};
