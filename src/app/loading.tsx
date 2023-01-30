import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="inline-block w-8 h-8 border-4 rounded-full spinner-border animate-spin"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
