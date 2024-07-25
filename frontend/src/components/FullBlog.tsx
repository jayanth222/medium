import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <div className="flex flex-col max-w-screen-md mx-auto mt-5">
        <div className="text-5xl font-bold">{blog.title}</div>
        <div className="text-slate-600 text-lg my-2">
          Random catch phrase about the title to grab the user's attention
        </div>
        <div className="mt-2 mb-4 text-slate-600">
          {Math.ceil(blog.content.length / 500)} minute read
        </div>
        <div className="flex gap-x-2 mb-5">
          <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden rounded-full bg-gray-600">
            <span className="uppercase text-sm text-white">{"J"}</span>
          </div>
          <div className="font-bold">{blog.author.name.toUpperCase()}</div>
        </div>
        <div className="text-lg ">{blog.content}</div>
      </div>
    </>
  );
};
