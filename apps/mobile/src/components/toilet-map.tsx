import { useEffect, useRef } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';

import type { ToiletMapProps } from '@/components/toilet-map.types';
import { PRAGUE } from '@/lib/geo';
import { TYPE_META } from '@/lib/toilet';

// The web key is restricted to deniksracu.cz; the app needs its own Mapy.cz key.
// Without one we fall back to the platform base map (Apple / Google).
const MAPY_KEY = process.env.EXPO_PUBLIC_MAPY_APP_KEY;

function zoomToDelta(zoom: number) {
  return 360 / 2 ** zoom;
}

export function ToiletMap({ toilets, selectedId, onSelect, userLocation, focus, insets }: ToiletMapProps) {
  const ref = useRef<MapView>(null);

  useEffect(() => {
    if (!focus) return;
    const delta = zoomToDelta(focus.zoom ?? 16);
    ref.current?.animateToRegion(
      { latitude: focus.latitude, longitude: focus.longitude, latitudeDelta: delta, longitudeDelta: delta },
      400,
    );
  }, [focus]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        ref={ref}
        style={StyleSheet.absoluteFill}
        initialRegion={{ ...(userLocation ?? PRAGUE), latitudeDelta: 0.02, longitudeDelta: 0.02 }}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        showsPointsOfInterests={false}
        toolbarEnabled={false}
        mapType={MAPY_KEY ? (Platform.OS === 'android' ? 'none' : 'mutedStandard') : 'standard'}
        mapPadding={{ top: insets.top, bottom: insets.bottom, left: 0, right: 0 }}>
        {MAPY_KEY && (
          <UrlTile
            urlTemplate={`https://api.mapy.cz/v1/maptiles/basic/256@2x/{z}/{x}/{y}?apikey=${MAPY_KEY}`}
            tileSize={256}
            maximumZ={19}
            shouldReplaceMapContent
          />
        )}
        {toilets.map((t) => {
          const selected = t.id === selectedId;
          const meta = TYPE_META[t.toiletType];
          return (
            <Marker
              key={t.id}
              identifier={t.id}
              coordinate={{ latitude: t.latitude, longitude: t.longitude }}
              image={selected ? meta.markerSelected : meta.marker}
              anchor={{ x: 0.5, y: 0.5 }}
              zIndex={selected ? 10 : 1}
              tracksViewChanges={false}
              onPress={(e) => {
                e.stopPropagation();
                onSelect(t);
              }}
            />
          );
        })}
      </MapView>
      {MAPY_KEY && (
        <Text style={[styles.attribution, { bottom: insets.bottom + 4 }]}>© Seznam.cz a.s. a další</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  attribution: {
    position: 'absolute',
    left: 8,
    fontSize: 10,
    color: '#333',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 4,
    borderRadius: 3,
  },
});
