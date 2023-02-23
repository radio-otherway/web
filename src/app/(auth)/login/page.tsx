import { LoginPage } from "@/components/auth";
import React from "react";

const Login = async () => {
  return (
    <>
        <div className="flex flex-wrap justify-evenly w-full">
          <LoginPage />
        </div>
    </>);
};

export default Login;
