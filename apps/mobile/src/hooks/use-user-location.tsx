import * as Location from 'expo-location';
import { createContext, use, useEffect, useState, type ReactNode } from 'react';

import type { LatLng } from '@/lib/geo';

type State = {
  location: LatLng | null;
  status: 'pending' | 'granted' | 'denied';
  request: () => Promise<void>;
};

const LocationContext = createContext<State>({ location: null, status: 'pending', request: async () => {} });

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LatLng | null>(null);
  const [status, setStatus] = useState<State['status']>('pending');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let sub: Location.LocationSubscription | undefined;
    let cancelled = false;
    (async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (cancelled) return;
      setStatus(granted ? 'granted' : 'denied');
      if (!granted) return;
      const last = await Location.getLastKnownPositionAsync();
      if (last && !cancelled) setLocation(last.coords);
      sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, distanceInterval: 20 },
        (pos) => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      );
      if (cancelled) sub.remove();
    })().catch(() => !cancelled && setStatus('denied'));
    return () => {
      cancelled = true;
      sub?.remove();
    };
  }, [attempt]);

  return (
    <LocationContext value={{ location, status, request: async () => setAttempt((a) => a + 1) }}>
      {children}
    </LocationContext>
  );
}

export function useUserLocation() {
  return use(LocationContext);
}
