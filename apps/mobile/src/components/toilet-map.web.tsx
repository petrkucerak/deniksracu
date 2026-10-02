import 'leaflet/dist/leaflet.css';

import { Asset } from 'expo-asset';
import type * as Leaflet from 'leaflet';
import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import type { ToiletMapProps } from '@/components/toilet-map.types';
import { PRAGUE } from '@/lib/geo';
import { TYPE_META, type Toilet } from '@/lib/toilet';

// Restricted by referrer to deniksracu.cz, same key the Next.js web used.
const MAPY_WEB_KEY = process.env.EXPO_PUBLIC_MAPY_WEB_KEY ?? '0pDMFK05UmFV-CqGrkNGlwvIIquKNNSwUaFxI2ZLXQo';

function tileLayer(L: typeof Leaflet) {
  const onProdDomain = /(^|\.)deniksracu\.cz$/.test(window.location.hostname);
  if (onProdDomain) {
    return L.tileLayer(`https://api.mapy.cz/v1/maptiles/basic/256@2x/{z}/{x}/{y}?apikey=${MAPY_WEB_KEY}`, {
      maxZoom: 19,
      attribution: '<a href="https://api.mapy.cz/copyright" target="_blank" rel="noreferrer">© Seznam.cz a.s. a další</a>',
    });
  }
  // Local development: the Mapy.cz key rejects other referrers.
  return L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  });
}

function icon(L: typeof Leaflet, t: Toilet, selected: boolean) {
  const meta = TYPE_META[t.toiletType];
  const uri = Asset.fromModule((selected ? meta.markerSelected : meta.marker)).uri;
  const size = selected ? 52 : 42;
  return L.icon({ iconUrl: uri, iconSize: [size, size], iconAnchor: [size / 2, size / 2] });
}

export function ToiletMap({ toilets, selectedId, onSelect, userLocation, focus, insets }: ToiletMapProps) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<Leaflet.Map | null>(null);
  const L = useRef<typeof Leaflet | null>(null);
  const markers = useRef<Leaflet.LayerGroup | null>(null);
  const userMarker = useRef<Leaflet.CircleMarker | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  // Leaflet touches `window` on import, so load it only in the browser.
  useEffect(() => {
    let disposed = false;
    import('leaflet').then((mod) => {
      if (disposed || !el.current) return;
      const lib = (mod.default ?? mod) as typeof Leaflet;
      L.current = lib;
      const start = userLocation ?? PRAGUE;
      map.current = lib
        .map(el.current, { zoomControl: false, attributionControl: true })
        .setView([start.latitude, start.longitude], 15);
      tileLayer(lib).addTo(map.current);
      markers.current = lib.layerGroup().addTo(map.current);
      map.current.fire('ready');
      renderMarkers();
    });
    return () => {
      disposed = true;
      map.current?.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- map is created once
  }, []);

  function renderMarkers() {
    const lib = L.current;
    if (!lib || !markers.current) return;
    markers.current.clearLayers();
    for (const t of toilets) {
      const selected = t.id === selectedId;
      lib
        .marker([t.latitude, t.longitude], {
          icon: icon(lib, t, selected),
          title: t.placeName,
          zIndexOffset: selected ? 1000 : 0,
          keyboard: true,
        })
        .on('click', () => onSelectRef.current(t))
        .addTo(markers.current);
    }
  }

  useEffect(renderMarkers, [toilets, selectedId]);

  useEffect(() => {
    const lib = L.current;
    if (!lib || !map.current || !userLocation) return;
    const ll: Leaflet.LatLngExpression = [userLocation.latitude, userLocation.longitude];
    if (userMarker.current) userMarker.current.setLatLng(ll);
    else
      userMarker.current = lib
        .circleMarker(ll, { radius: 8, color: '#fff', weight: 3, fillColor: '#0A84FF', fillOpacity: 1 })
        .addTo(map.current);
  }, [userLocation]);

  useEffect(() => {
    if (!focus || !map.current) return;
    // shift the target up so it is not hidden under the bottom overlay
    const m = map.current;
    const zoom = focus.zoom ?? 16;
    const point = m.project([focus.latitude, focus.longitude], zoom).add([0, (insets.bottom - insets.top) / 2]);
    m.flyTo(m.unproject(point, zoom), zoom, { duration: 0.5 });
  }, [focus, insets.bottom, insets.top]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <div ref={el} style={{ position: 'absolute', inset: 0, isolation: 'isolate' }} />
    </View>
  );
}
