import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";

export default function Categories({ url }) {
  const [categories, setCategories] = useState([]);

  async function fetcCategories() {
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
        text: "Error fetching categories",
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

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/apis/branded-things/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      // Update state setelah penghapusan
      setCategories(categories.filter((category) => category.id !== id));

      // Opsional: Menampilkan notifikasi bahwa kategori berhasil dihapus
      Toastify({
        text: "Category deleted successfully",
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
    } catch (error) {
      console.log(error);
      Toastify({
        text: "Error deleting category",
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
    fetcCategories();
  }, []);

  return (
    <div
      className="m-0"
      style={{
        backgroundColor: "#F1EEDC",
        minHeight: "100vh",
        marginTop: "0",
        padding: "0",
      }}
    >
      <main
        className="mt-10 bg-[#B3C8CF] px-10 py-8 rounded-lg shadow-lg"
        style={{
          backgroundColor: "#F1EEDC",
          minHeight: "100vh",
          marginTop: "0",
        }}
      >
        <table className="min-w-full bg-[#B3C8CF] rounded-lg overflow-hidden">
          <thead className="bg-[#B3C8CF]">
            <tr>
              <th className="py-3 px-4 text-center border border-gray-300 text-gray-800">
                No
              </th>
              <th className="py-3 px-4 text-center border border-gray-300 text-gray-800">
                Category Name
              </th>
              <th className="py-3 px-4 text-center border border-gray-300 text-gray-800">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-gray-300">
                <td className="py-3 px-4 border border-gray-300 text-gray-800 text-center">
                  {category.id}
                </td>
                <td className="py-3 px-4 border border-gray-300 text-gray-800">
                  {category.name}
                </td>
                <td className="py-3 px-4 border border-gray-300 text-gray-800 text-center">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="w-full bg-[#E5DDC5] text-gray-700 py-2 px-4 rounded hover:bg-white hover:text-[#B3C8CF] focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
