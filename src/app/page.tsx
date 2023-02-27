import React from "react";
import HomePageComponent from "@/components/pages/home/HomePageComponent";

const getData = async () => {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/shows/upcoming`
  // );
  const res = await fetch(
    "https://otherway.dev.fergl.ie:3000/api/shows/upcoming"
  );
  return await res.json();
};

const Home = async () => {
  const results = await getData();
  return <HomePageComponent shows={results} />;
};
export default Home;
