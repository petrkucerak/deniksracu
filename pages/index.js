import Head from "next/head";
import Map from "../components/map";
import dynamic from "next/dynamic";

export default function Home() {
  // const MapSSR = dynamic(() => import("../components/map"), { ssr: false });
  return (
    <div className="">
      <Head>
        <title>Deník sráčů</title>
      </Head>
      <main>
        {/* <MapSSR /> */}
      </main>
      <footer></footer>
    </div>
  );
}
