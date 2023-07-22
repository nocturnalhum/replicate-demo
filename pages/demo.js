import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed'
    ) {
      await sleep(1000);
      const response = await fetch('/api/predictions/' + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
    }
  };

  return (
    <div className='p-8 text-xl max-w-3xl mx-auto'>
      <form className='flex mb-8' onSubmit={handleSubmit}>
        <input
          type='text'
          name='prompt'
          placeholder='Enter a prompt to display an image'
          className='w-full p-4 border rounded-md text-xl mr-4'
        />
        <button
          type='submit'
          className='p-4 border-0 rounded-md box-border cursor-pointer text-xl'
        >
          Go!
        </button>
      </form>

      {error && <div>{error}</div>}

      {prediction && (
        <div>
          {prediction.output && (
            <div className='w-full aspect-square relative'>
              <Image
                fill
                src={prediction.output[prediction.output.length - 1]}
                alt='output'
                sizes='100vw'
              />
            </div>
          )}
          <p>status: {prediction.status}</p>
        </div>
      )}
    </div>
  );
}
