import React from "react";
import HomePageComponent from "@/components/pages/home";

export const metadata = {
  title: "Radio Otherway",
};

const getData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/shows/upcoming`,
    { cache: "no-store" }
  );

  return await res.json();
};

const Home = async () => {
  const results = await getData();
  return <HomePageComponent shows={results} />;
};
export default Home;
