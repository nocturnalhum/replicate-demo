import { useRef } from 'react';
import Canvas from '@/components/Canvas';
import ControlNet from '@/components/ControlNet';

export default function Home() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  return (
    <main
      className={`flex flex-col items-center min-h-screen bg-slate-300 touch-none overflow-y-auto`}
    >
      <div className='shadow-lg p-3 rounded-lg bg-amber-100/30 drop-shadow-md'>
        <Canvas canvasRef={canvasRef} contextRef={contextRef} />
      </div>
      <ControlNet canvasRef={canvasRef} contextRef={contextRef} />
    </main>
  );
}
