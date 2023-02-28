import React from "react";

export default function Head() {

  return (
    <>
      <title>Radio::Otherway</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Irish based radio station , broadcasting a varied selection of shows with some of the best Irish DJ talent"
      />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      {/*need to include this here to avoid the FLUC on initial load*/}
      <script src="https://unpkg.com/theme-change@2.2.0/index.js" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </>
  );
}
