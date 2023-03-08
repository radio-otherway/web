import React from "react";
import Script from "next/script";

export default function Head() {
  return (
    <>
      <title>Radio::Otherway</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Irish based radio station , broadcasting a varied selection of shows with some of the best Irish DJ talent"
      />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      {/*need to include this here to avoid the FLUC on initial load*/}
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </>
  );
}
