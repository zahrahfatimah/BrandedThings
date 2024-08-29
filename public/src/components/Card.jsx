import { useNavigate } from "react-router-dom";

export default function Card({ product }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/detail/${id}`);
  }

  return (
    <div className="bg-[#B3C8CF] rounded-lg shadow-lg overflow-hidden flex flex-col">
      <figure className="flex-grow">
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-700">
          {product.name}
        </h3>
        <p className="text-gray-600"> Harga: Rp{product.price}</p>
        <div className="mt-auto">
          <button
            className="w-full mt-4 bg-[#E5DDC5] text-gray-700 px-4 py-2 rounded"
            onClick={() => handleClick(product.id)}
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}
