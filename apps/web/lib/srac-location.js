import { useState, useEffect } from "react";

export const sracLocation = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const pos = navigator.geolocation;
    if (!pos) {
      setError("Geolocation is not suppoarted!");
      return;
    }

    let watcher = pos.watchPosition(onChange, onError);

    return () => pos.clearWatch(watcher);
  }, []);

  return { ...position, error };
};
