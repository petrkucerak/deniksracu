import Head from "next/head";

export default function Meta() {
  return (
    <Head>
      <title>Deník sráčů</title>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.76.0/dist/L.Control.Locate.min.css"
      />
    </Head>
  );
}
