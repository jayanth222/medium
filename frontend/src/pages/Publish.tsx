import axios from "axios";
import { AppBar } from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  return (
    <>
      <AppBar />
      <div className="max-w-screen-md mx-auto mt-10">
        <div>
          <label className="block mb-2 text-sm font-medium text-green-900">
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Write your Title here..."
            required
          />
        </div>
        <div className="mt-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your Thoughts
          </label>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
        <button
          onClick={async () => {
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/blog/post`,
              {
                title,
                content,
              },{
                headers: {
                    Authorization: localStorage.getItem("token")
                }
              }
            );
            navigate(`/blog/${response.data.id}`);
          }}
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mt-10"
        >
          Publish Post
        </button>
      </div>
    </>
  );
};
