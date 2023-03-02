"use client";
import logger from "@/lib/util/logging";
import React from "react";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    logger.error(error);
  }, [error]);
  return (
    <div>
      <div>An error occurred: {error.message}</div>
      <button className="btn-danger btn" onClick={() => reset()}>
        Retry?
      </button>
    </div>
  );
};

export default ErrorPage;
