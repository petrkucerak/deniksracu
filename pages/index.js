import Head from "next/head";
import dynamic from "next/dynamic";

export default function Home() {
  const MapSSR = dynamic(() => import("../components/map"), { ssr: false });
  return (
    <div>
      <Head>
        <title>Deník sráčů</title>
        
      </Head>
      <main>
        <div id="map">
          <MapSSR />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
