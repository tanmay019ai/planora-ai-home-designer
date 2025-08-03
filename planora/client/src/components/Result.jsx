import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { modelUrl } = location.state || {};

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
      {modelUrl ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your 3D Model</h2>
          <p className="mb-2">Model URL:</p>
          <a href={modelUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            {modelUrl}
          </a>
        </div>
      ) : (
        <p>No model found</p>
      )}
    </div>
  );
};

export default Result;
