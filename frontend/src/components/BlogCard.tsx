import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b pb-4 mt-5 px-10 cursor-pointer">
        <div className="flex gap-x-2 items-center">
          <div className="flex flex-col justify-center">
            <Avatar name={authorName} />
          </div>
          <h2 className="font-extralight">{authorName}</h2>
          <h2 className="text-xs text-slate-500">&#9679;</h2>
          <h2 className="font-thin text-slate-500 text-sm"> {publishedDate}</h2>
        </div>
        <h1 className="text-xl font-bold mt-5">{title}</h1>
        <h3 className="text-sm font-thin">
          {content.slice(0, 400)}
          {content.length > 100 ? "..." : ""}
        </h3>
        <h4 className="font-thin text-slate-500 text-xs mt-10">{`${Math.ceil(
          content.length / 500
        )} min read`}</h4>
      </div>
    </Link>
  );
};

export function Avatar({ name }: { name: string; size?: number }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-6 h-6 overflow-hidden rounded-full bg-gray-600`}
    >
      <span className="uppercase text-sm text-white">{name[0]}</span>
    </div>
  );
}
