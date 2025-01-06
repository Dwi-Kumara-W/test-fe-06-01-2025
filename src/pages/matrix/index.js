import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../../components/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/matrix`);
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleCreateClick = () => {
    router.push('/matrix/create');
  };

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (!confirmed) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matrix/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete item');
      }
      router.reload();
      alert('Item deleted successfully');
    } catch (error) {
      alert('Failed to delete item');
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Matrix List</h1>
      <button onClick={handleCreateClick}>Create</button>
      <ProductList 
        products={products}
        handleDelete={handleDelete}
      ></ProductList>
    </div>
  );
}
