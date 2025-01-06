import { useState } from 'react';

import { useRouter } from 'next/router';

export default function Create() {
  const [panjang, setpanjang] = useState('');
  const [tinggi, settinggi] = useState('');
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newData = { panjang, tinggi };
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matrix`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
  
      const data = await res.json();
      console.log('Data created:', data);
  
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating data:', error);
    }
    router.push('/matrix');
  };

  return (
    <div>
      <h1>Create New Item</h1>
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
        <br></br>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
