import { useEffect, useState } from "react";
import axios from "axios";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });

        if (isMounted) {
          setProducts(response.data);
        }
      } catch (err) {
        const isCanceled =
          err.name === "CanceledError" ||
          err.name === "AbortError" ||
          axios.isCancel?.(err);

        if (!isCanceled && isMounted) {
          setError("Failed to fetch products. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted && isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { products, loading, error };
};

export default useProducts;
