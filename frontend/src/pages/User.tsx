import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { AppBar } from "../components/AppBar";
import { BlogSkeleton } from "../components/BlogSkeleton";

type Props = {
  username: string;
  email: string;
};

export const User = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Props>();
  function handleSignOut() {
    localStorage.removeItem("token");
    navigate("/");
  }
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/details`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, []);
  if (!user) {
    return (
      <div className="mx-auto mt-16 max-w-screen-lg">
        <BlogSkeleton />
      </div>
    );
  }
  return (
    <>
      <AppBar />
      <main className="h-screen">
        <section className="mx-auto flex h-screen flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-2">
            <div className="min-w-60 rounded border border-green-400 px-4 py-2">
              {user.email}
            </div>
            <div className="min-w-60 rounded border border-green-400 px-4 py-2">
              {user.username}
            </div>
          </div>
          <button
            className="h-10 w-60 rounded bg-green-700 text-white hover:bg-green-900"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </section>
      </main>
    </>
  );
};
