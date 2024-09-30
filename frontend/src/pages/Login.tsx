import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../api/query/authQuery";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";

function Login() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mutate: login } = useLogin();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      username,
      password,
    };
    login(data, {
      onSuccess: () => {
        setIsAuthenticated(true);
        toast.success("Login successfully!");
        navigate("/home");
        setUsername("");
        setPassword("");
        setLoading(false);
      },
      onError: () => {
        toast.error("Username or Password Invalid");
        setLoading(false);
      },
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center ">
      <div className="md:w-[25%] w-[80%] flex flex-col items-start gap-2">
        <div className="flex flex-col gap-1 ">
          <div className="font-semibold text-[2rem]">Login</div>
          <div>Please enter your details to Log In</div>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <div>User Name*</div>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                className="bg-[#EFEFEF] px-4 py-2 rounded-[5px] w-full"
                required
                disabled={loading}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div>Password*</div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="bg-[#EFEFEF] px-4 py-2 rounded-[5px] w-full"
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="bg-px-4 py-2 text-white bg-blue-500 rounded"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
