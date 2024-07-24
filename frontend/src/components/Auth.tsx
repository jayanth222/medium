import { SignUpInput } from "@jayanth_222/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    name: "",
    password: "",
    email: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      let jwt = response.data.jwt;
      jwt="Bearer "+jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
        console.error(e);
        return;
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col">
        <div className="font-bold text-4xl text-center">Create an Account</div>
        <div className="flex gap-x-2 text-slate-500">
          <div className="text-lg text-center">
            {type === "signup"
              ? "Already have an account?"
              : "Don't have an account"}
          </div>
          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="underline underline-offset-2"
          >
            {type === "signup" ? "Sign in" : "Sign Up"}
          </Link>
        </div>
      </div>
      {type === "signup" ? (
        <LabelledInput
          label="Name"
          placeholder="Enter your name"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              name: e.target.value,
            }));
          }}
        />
      ) : null}
      <LabelledInput
        label="Email"
        placeholder="Enter your email"
        type="email"
        onChange={(e) => {
          setPostInputs((c) => ({
            ...c,
            email: e.target.value,
          }));
        }}
      />
      <LabelledInput
        label="Password"
        placeholder="Enter your password"
        type="password"
        onChange={(e) => {
          setPostInputs((c) => ({
            ...c,
            password: e.target.value,
          }));
        }}
      />
      <button
        onClick={sendRequest}
        type="button"
        className="text-white bg-gray-800 w-96 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        {type === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div className="flex flex-col gap-2 w-96">
      <label className="text-md font-bold">{label}</label>
      <input
        className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500 focus:shadow-outline"
        onChange={onChange}
        type={type || "text"}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
