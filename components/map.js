import { Map, MarkerLayer, Marker } from "react-mapycz";

export default function Map() {
  return (
    <Map center={{ lat: 55.604890000000005, lng: 8.97171 }}>
      <MarkerLayer>
        <Marker coords={{ lat: 55.60501000000001, lng: 8.97171 }} />
        <Marker coords={{ lat: 55.547290000000004, lng: 8.897590000000001 }} />
      </MarkerLayer>
    </Map>
  );
}
