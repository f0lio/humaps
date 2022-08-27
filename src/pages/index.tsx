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
        <title>GitMaps</title>
        <meta name="description" content="GitMaps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-full">
        <Sidebar />
        <Map />
      </div>
    </div>
  );
};

export default Home;
