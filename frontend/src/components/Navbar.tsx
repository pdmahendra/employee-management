import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const userName = localStorage.getItem("user");

  const handleLogoutButton = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
    toast.success("Logout successfully");
  };

  const handleEmployeeListTab = () => {
    navigate("/employee-list");
  };
  return (
    <div className="flex justify-between w-full p-4 border-2 border-gray-500">
      <div className="flex justify-around w-[40%]">
        <Link to={"/home"}>Home</Link>
        <div
          className="cursor-pointer hover:text-blue-600"
          onClick={handleEmployeeListTab}
        >
          Employee List
        </div>
      </div>
      <div className="flex items-center gap-2 pr-10">
        <div>{userName}</div>
        <div
          className="cursor-pointer  hover:text-blue-600" 
          onClick={handleLogoutButton}
        >
          - Logout
        </div>
      </div>
    </div>
  );
};

export default Navbar;
