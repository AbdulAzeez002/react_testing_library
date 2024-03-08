import React, { useState } from "react";
import { getUser } from "../services/services";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await getUser();
      if (data) {
        setUser(data);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <span>{user.name}</span>
        <form
          onSubmit={handleSubmit}
          className="border border-slate-500 p-2 rounded h-fit"
        >
          <h1 className="text-center font-bold text-xl">Login</h1>
          <div>
            <input
              className="border m-2 p-2 h-20 rounded w-72"
              type="text"
              placeholder="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="border m-2 p-2 h-20 rounded w-72"
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div className="text-center">
              <button
                disabled={!email || !password}
                className="button bg-rose-800 p-2 rounded text-white"
                type="submit"
              >
                {loading ? "please wait " : "Login"}
              </button>
            </div>
          </div>

          <p
            data-testid="error"
            style={{ visibility: error ? "visible" : "hidden" }}
            className="p-2 text-rose-300 text-center"
          >
            Some thing went wrong
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
