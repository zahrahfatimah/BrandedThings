import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function Detail({ url }) {
  const [products, setProducts] = useState("");
  const { id } = useParams();

  async function fetchData() {
    try {
      const { data } = await axios.get(
        `${url}/apis/pub/branded-things/products/${id}`
      );
      setProducts(data.data);
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        style: {
          background: "#B3C8CF",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
        position: "right",
      }).showToast();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#B3C8CF] rounded-lg shadow-lg overflow-hidden flex">
      <figure className="w-1/2">
        <img
          src={products.imgUrl}
          alt={products.name}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="p-4 w-1/2 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          {products.name}
        </h3>
        <p className="text-gray-600 mb-2">{products.description}</p>
        <h3 className="text-lg font-semibold text-gray-700"> Price:</h3>
        <p className="text-gray-600  mb-4">{products.price}</p>
        <h3 className="text-lg font-semibold text-gray-700 "> Stock:</h3>
        <p className="text-gray-600 mb-4">{products.stock}</p>
      </div>
    </div>
  );
}
