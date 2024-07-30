import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  return (
    <main className="mx-auto flex h-screen flex-col justify-center gap-y-6 text-center xl:max-w-screen-xl">
      <section className="flex flex-col gap-y-4">
        <h1 className="text-4xl font-bold lg:text-6xl xl:text-7xl">
          Unlock Your Creative Potencial With Medium
        </h1>
        <h3 className="mx-auto max-w-[700px] text-sm text-gray-500 md:text-base xl:text-xl">
          Discover a world of inspiring stories, insightful perspectives, and a
          vibrant community that will ignite your passion and help you grow as a
          writer, thinker, and individual.
        </h3>
      </section>
      <section className="flex flex-col gap-y-2">
        <form className="flex justify-center gap-x-2">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            type="text"
            placeholder="Enter your email"
            className="rounded border border-gray-200 pl-2 pr-32 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            onClick={() => {
              email.length > 0 ? navigate("/signup") : navigate("/");
            }}
          >
            <span>Join Medium</span>
          </button>
        </form>
        <p className="text-sm text-gray-500">
          Join a community of thoughful readers and writers
        </p>
      </section>
    </main>
  );
};
