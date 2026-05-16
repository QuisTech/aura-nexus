"use client";

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleDown = () => setClicked(true);
    const handleUp = () => setClicked(false);

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '32px',
        height: '32px',
        pointerEvents: 'none',
        zIndex: 999999,
        transform: clicked ? 'scale(0.8) translate(-2px, -2px)' : 'translate(0, 0)',
        transition: 'transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))'
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.65376 26.3673H5.46026L5.31717 26.4976L0.500002 30.8829L0.500002 1.19841L23.7841 24.3673H11.6538L5.65376 26.3673Z" fill="black" stroke="white" strokeWidth="2"/>
      </svg>
      {clicked && (
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '-10px',
          width: '52px',
          height: '52px',
          border: '4px solid #38bdf8',
          borderRadius: '50%',
          animation: 'cursor-ping 0.4s cubic-bezier(0, 0, 0.2, 1) infinite'
        }} />
      )}
      <style jsx global>{`
        @keyframes cursor-ping {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
