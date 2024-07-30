import { AppBar } from "../components/AppBar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || " ",
  });
  if (loading) {
    return (
      <div className="mx-auto mt-20 flex max-w-screen-md flex-col">
        <BlogSkeleton />
      </div>
    );
  }
  if (blog === undefined) {
    return <div>Error Try Again</div>;
  }
  return (
    <div>
      <AppBar />
      <FullBlog blog={blog} />
    </div>
  );
};
