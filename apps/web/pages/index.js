import Meta from "../components/meta";
import dynamic from "next/dynamic";
import MapNav from "../components/map-nav";

export default function Home() {
  const MapSSR = dynamic(() => import("../components/map"), { ssr: false });
  return (
    <>
      <Meta />
      <MapNav />
      <main>
        <div id="map">
          <MapSSR />
        </div>
      </main>
    </>
  );
}
