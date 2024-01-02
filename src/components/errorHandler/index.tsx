import React from 'react';

interface ErrorFallbackProps {
  error: Error;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const handleTryAgain = () => {
    // reload the page
    window.location.reload();
  };

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 w-96">
      <div>
        <h3>Something went wrong:</h3>
        <h5>{error.message}</h5>
      </div>
      <button
        className="bg-white text-red-500 border border-red-500 px-4 py-2 rounded-md mt-4 self-end cursor-pointer hover:bg-red-200"
        onClick={handleTryAgain}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback;

