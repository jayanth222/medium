export const BlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse flex flex-col gap-5">
      <div className="h-10 bg-gray-200 rounded-full w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded-full w-2/3 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full "></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-2xl "></div>
      <div className="h-2 bg-gray-200 rounded-full "></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[300px] "></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[300px] "></div>
      <div className="h-2 bg-gray-200 rounded-full "></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-3xl "></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-[300px] "></div>
      <div className="h-2 bg-gray-200 rounded-full max-w-3xl"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
