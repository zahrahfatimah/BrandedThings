import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="bg-[#E5DDC5] p-4 mt-0 shadow-sm" >
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side (Logo) */}
        <Link
          to="/home"
          className="text-xl font-bold text-gray-800 hover:text-gray-600"
        >
          Z-HomeShop
        </Link>
      </div>
    </nav>
  );
}
