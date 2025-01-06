import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [panjang, setpanjang] = useState('');
  const [tinggi, settinggi] = useState('');
  const router = useRouter();
  const { params } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    async function fetchProduct() {
      try {
        if (params && params[0]) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/matrix/${params[0]}`);
          setProduct(response.data.data);
          settinggi(response.data.data.tinggi);
          setpanjang(response.data.data.panjang);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [router.isReady, params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newData = { panjang, tinggi };
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matrix/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
  
      const data = await res.json();
      console.log('Data created:', data);
  
    } catch (error) {
      console.error('Error creating data:', error);
    }
    router.push('/matrix');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Matrix Details</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="panjang">panjang:</label>
          <input
            type="text"
            id="panjang"
            value={panjang}
            onChange={(e) => setpanjang(e.target.value)}
            required
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="tinggi">tinggi:</label>
          <input
            type="text"
            id="tinggi"
            value={tinggi}
            onChange={(e) => settinggi(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
