import Meta from "../components/meta";
import dynamic from "next/dynamic";

export default function Home() {
  const MapSSR = dynamic(() => import("../components/map"), { ssr: false });
  return (
    <div>
      <Meta />
      <main>
        <div id="map">
          <MapSSR />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
