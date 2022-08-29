import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

import Sidebar from "@components/sidebar";

const Map = dynamic(() => import("@components/map"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>HuMaps</title>
        <meta name="description" content="HuMaps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />
        <Map />
      </div>
    </div>
  );
};

export default Home;
