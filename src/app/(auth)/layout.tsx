import React from "react";

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-wrap w-full justify-evenly">
      <div className="max-w-lg p-10 mt-6 rounded-md shadow-md font-body bg-base-100 text-base-content md:flex-1">
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
