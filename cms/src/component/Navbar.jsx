import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <nav className="bg-[#E5DDC5] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/home"
          className="text-xl font-bold text-gray-800 hover:text-white hover:rounded hover:bg-[#B3C8CF]"
        >
          Z-HomeShop
        </Link>
        <div className="flex space-x-4">
          <Link to="/add-user" className="text-gray-800 hover:text-white hover:rounded hover:bg-[#B3C8CF]">
            +User
          </Link>
          <Link to="/add" className="text-gray-800 hover:text-white hover:rounded hover:bg-[#B3C8CF]">
            +Product
          </Link>
          <Link to="/categories" className="text-gray-800 hover:text-white hover:rounded hover:bg-[#B3C8CF]">
            Read Categories
          </Link>
          <a
            onClick={handleLogout}
            className="text-gray-800 hover:text-white hover:rounded hover:bg-[#B3C8CF] cursor-pointer"
          >
            Log Out
          </a>
        </div>
      </div>
    </nav>
  );
}
