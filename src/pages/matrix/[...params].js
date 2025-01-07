import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [panjang, setPanjang] = useState('');
  const [tinggi, setTinggi] = useState('');
  const [matrix, setMatrix] = useState([]); // State for storing the matrix
  const router = useRouter();
  const { params } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    async function fetchProduct() {
      try {
        if (params && params[0]) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/matrix/${params[0]}`);
          const data = response.data.data;

          setProduct(data);
          setTinggi(data.tinggi);
          setPanjang(data.panjang);

          // Generate matrix dynamically
          generateMatrix(data.panjang, data.tinggi);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [router.isReady, params]);

  const generateMatrix = (panjang, tinggi) => {
    const tempMatrix = [];
    for (let i = 1; i <= panjang; i++) {
      const row = [];
      for (let j = 1; j <= tinggi; j++) {
        row.push({
          x: i,
          y: j,
          value: Math.floor(Math.random() * 10) + 1, // Random values between 1 and 10
        });
      }
      tempMatrix.push(row);
    }
    setMatrix(tempMatrix); // Set the matrix state
  };

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
      console.log('Data updated:', data);

      // Regenerate matrix with new dimensions
      generateMatrix(newData.panjang, newData.tinggi);
    } catch (error) {
      console.error('Error updating data:', error);
    }
    router.push('/matrix');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Matrix Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="panjang">Panjang:</label>
          <input
            type="number"
            id="panjang"
            value={panjang}
            onChange={(e) => setPanjang(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tinggi">Tinggi:</label>
          <input
            type="number"
            id="tinggi"
            value={tinggi}
            onChange={(e) => setTinggi(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>

      <h2>Generated Matrix:</h2>
      {matrix.length > 0 ? (
        <table border="1" style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      padding: '10px',
                      textAlign: 'center',
                      width: '50px',
                      height: '50px',
                    }}
                  >
                    {cell.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No matrix to display.</p>
      )}
    </div>
  );
}
