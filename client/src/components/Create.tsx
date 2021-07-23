import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Header } from "./Header";

export interface ContextDescription {
  userId: string;
}
export interface Response {
  from: string;
  _id: string;
  __v: number;
  to: string;
  code: string;
  date: Date;
  clicks: number;
  owner: string;
}
export const Create: React.FC = () => {
  const { userId }: ContextDescription = useContext(AuthContext);
  const [from, setFrom] = useState<string>("");
  const generateLink = async () => {
    await axios.post<Response>(
      "https://yshrt.herokuapp.com/api/link/generate",
      {
        from,
        userId,
      }
    );
  };
  return (
    <div>
      <Header />
      <div className="container login-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Ссылка
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => generateLink()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
