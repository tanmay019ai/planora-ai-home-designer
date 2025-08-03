import React from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const { modelUrl } = location.state || {};

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
      {modelUrl ? (
        <div className="text-center w-full max-w-4xl px-4">
          <h2 className="text-2xl font-bold mb-4">Your 3D Model</h2>
          <model-viewer
            src={modelUrl}
            alt="A 3D model"
            auto-rotate
            camera-controls
            style={{ width: "100%", height: "500px" }}
            shadow-intensity="1"
            exposure="1"
            ar
          ></model-viewer>
        </div>
      ) : (
        <p>No model found</p>
      )}
    </div>
  );
};

export default Result;
