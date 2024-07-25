import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div className="flex flex-col max-w-screen-md mx-auto gap-10 mt-20">
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    );
  } else {
    return (
      <div>
        <AppBar />
        <div className=" flex flex-col max-w-screen-md mx-auto">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymos"}
              content={blog.content}
              title={blog.title}
              publishedDate={"1/1/1"}
              key={blog.id}
            />
          ))}
        </div>
      </div>
    );
  }
};
