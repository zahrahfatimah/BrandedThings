import { useState, useEffect } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import Card from "../components/Card";

export default function Home({ url }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  async function fetchData() {
    try {
      const { data } = await axios.get(
        `${url}/apis/pub/branded-things/products?q=${search}&limit=&page=${page}&sort=${sortOrder}&column=${sortColumn}`
      );
      setProducts(data.data.query);
    } catch (error) {
      console.log(error);
      Toastify({
        text: "gagal fetching data",
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
  }, [search, sortColumn, sortOrder, page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#E5DDC5", minHeight: "100vh"}}>
        <div className="flex justify-between items-center my-8 px-10 "  style={{ marginTop: "0"}}>
          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Sort By */}
          <div className="flex items-center">
            <label htmlFor="sortColumn" className="mr-2">
              Sort By:
            </label>
            <select
              id="sortColumn"
              className="p-2 border border-gray-300"
              value={sortColumn}
              onChange={(e) => setSortColumn(e.target.value)}
            >
              <option value="id">ID</option>
              <option value="date">Date</option>
            </select>

            <select
              id="sortOrder"
              className="p-2 border border-gray-300 ml-2"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
        </div>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-10">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </main>

        <div className="flex justify-center mt-4">
          <button
            className="p-2 border bg-white border-gray-300 mx-2"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="p-2">{page}</span>
          <button
            className="p-2 border bg-white border-gray-300 mx-2"
            onClick={handleNextPage}
            disabled={products.length < itemsPerPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
