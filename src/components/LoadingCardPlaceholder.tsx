import React from "react";

const LoadingCardPlaceholder: React.FC = () => (
  <div className="card bg-base-200 animate-pulse h-48 border-2 border-[#ff4655] flex flex-col items-center justify-center">
    <div className="w-16 h-16 bg-base-300 rounded mb-4" />
    <div className="h-4 w-2/3 bg-base-300 rounded mb-2" />
    <div className="h-3 w-1/2 bg-base-300 rounded" />
  </div>
);

export default LoadingCardPlaceholder;
