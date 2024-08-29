import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";

export default function ProductForm({
  url,
  handleSubmit,
  products,
  nameProp,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (products) {
      setName(products.name);
      setDescription(products.description);
      setPrice(products.price);
      setStock(products.stock);
      setImgUrl(products.imgUrl);
      setCategoryId(products.categoryId);
    }
  }, [products]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${url}/apis/branded-things/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      setCategories(data.data);
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
    fetchCategories();
  }, []);
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);

    // If you want to display a preview of the image before submitting
    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-[#F1EEDC] flex items-center justify-center min-h-screen">
      <div className="bg-[#B3C8CF] p-8 rounded-lg shadow-lg max-w-4xl w-full flex">
        <div className="w-1/2 pr-4 flex items-center justify-center">
          <form
            onSubmit={(e) =>
              handleSubmit(
                e,
                name,
                description,
                price,
                stock,
                imgFile,
                categoryId
              )
            }
            className="bg-[#B3C8CF] p-8 rounded-lg w-full max-w-sm"
          >
            <div className="mb-4 text-center">
              <label htmlFor="product-name" className="block text-gray-700 font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="product-name"
                required
                className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="mb-4 text-center">
              <label htmlFor="product-description" className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                id="product-description"
                required
                className="form-textarea mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>

            <div className="mb-4 text-center">
              <label htmlFor="product-price" className="block text-gray-700 font-medium mb-2">
                Price
              </label>
              <input
                type="number"
                id="product-price"
                required
                className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div className="mb-4 text-center">
              <label htmlFor="product-stock" className="block text-gray-700 font-medium mb-2">
                Stock
              </label>
              <input
                type="number"
                id="product-stock"
                required
                className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </div>

            <div className="mb-4 text-center">
              <label htmlFor="product-imgUrl" className="block text-gray-700 font-medium mb-2">
                Image URL
              </label>
              <input
                type="text"
                id="product-imgUrl"
                required
                className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setImgUrl(e.target.value)}
                value={imgUrl}
              />
            </div>

            <div className="mb-6 text-center">
              <label htmlFor="product-category" className="block text-gray-700 font-medium mb-2">
                Categories
              </label>
              <select
                id="product-category"
                required
                className="form-select mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((c) => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E5DDC5] text-gray-700 font-bold py-2 px-4 rounded hover:bg-white hover:text-[#B3C8CF] focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              {nameProp}
            </button>
          </form>
        </div>

        <div className="w-1/2 pl-4 flex items-center justify-center">
          <img src="https://i.pinimg.com/originals/5a/8b/95/5a8b95a7cc6bdba22ccd42593d3a6602.jpg" alt="Product"/>
        </div>
      </div>
    </div>
  );
}
