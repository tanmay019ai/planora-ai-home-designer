import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "@google/model-viewer";

const Result = () => {
  const location = useLocation();
  const { modelUrl } = location.state || {};
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const viewerRef = useRef();

  useEffect(() => {
    if (!viewerRef.current) return;

    const modelViewer = viewerRef.current;

    const handleLoad = () => {
      setIsLoading(false);
      setLoadError(false);
      console.log("✅ Model loaded");
    };

    const handleError = () => {
      setIsLoading(false);
      setLoadError(true);
      console.log("❌ Failed to load model");
    };

    modelViewer.addEventListener("load", handleLoad);
    modelViewer.addEventListener("error", handleError);

    return () => {
      modelViewer.removeEventListener("load", handleLoad);
      modelViewer.removeEventListener("error", handleError);
    };
  }, [modelUrl]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = modelUrl;
    link.download = "planora-model.glb";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex items-center justify-center px-4">
      {modelUrl ? (
        <div className="text-center w-full max-w-4xl">
          <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Your 3D Model
          </h2>

          {isLoading && (
            <div className="mb-4 animate-pulse text-gray-400">⏳ Loading 3D model...</div>
          )}

          {loadError ? (
            <div className="text-red-500">❌ Failed to load the model. Try again.</div>
          ) : (
            <>
              <model-viewer
                ref={viewerRef}
                src={modelUrl}
                alt="3D model"
                auto-rotate
                camera-controls
                ar
                style={{ width: "100%", height: "500px" }}
                shadow-intensity="1"
                exposure="1"
              />

              <button
                onClick={handleDownload}
                className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition duration-300"
              >
                ⬇️ Download Model
              </button>
            </>
          )}
        </div>
      ) : (
        <p>No model found</p>
      )}
    </div>
  );
};

export default Result;
