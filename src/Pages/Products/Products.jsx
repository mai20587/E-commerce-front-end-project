 import React, { useEffect, useState } from "react";
import { ProductPreview } from "../../components/ProductPreview/ProductPreview";
import { API } from "../../api/apiservices";
import { Paginator } from "../../components/Paginator/Paginator";

export const Products = () => {
  const [skip, setSkip] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [products, setProducts] = useState([]);

  const limit = 15;
  const currentPage = skip / limit + 1;

  function handleCurrentPage(page) {
    setSkip((page - 1) * limit);
  }

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const response = await API.get(`/products?limit=${limit}&skip=${skip}`);
        const { products, total } = response.data;

        setProducts(products);
        setNumPages(Math.ceil(total / limit));
      } catch (error) {
        console.log(error);
      }
    }

    fetchAllProducts();
  }, [skip]);

  return (
    <>
      <h1>All Products</h1>
      <ProductPreview products={products} />
      <Paginator
        numPages={numPages}
        currentPage={currentPage}
        onPress={handleCurrentPage}
      />
    </>
  );
};