import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500" />
    </div>
  );
};

export default Loader;
