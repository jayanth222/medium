import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  console.log(blogs);
  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div>
        <AppBar />
        <div className=" flex flex-col max-w-screen-lg mx-auto">
          {blogs.map((blog) => (
            <BlogCard
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
