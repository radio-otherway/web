import { LoginPage } from "@/components/pages/auth";
import React from "react";

const Login = async () => {
  return (
    <>
        <div className="flex flex-wrap w-full justify-evenly">
          <LoginPage />
        </div>
    </>);
};

export default Login;
