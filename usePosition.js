import { useState, useEffect } from "react";

export const useCurrentPosition = () => {
  const [position, setPosition] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onSuccessfullyAcquirePosition = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      altitude: coords.altitude,
      altitudeAccuracy: coords.altitudeAccuracy,
      heading: coords.heading,
      speed: coords.speed
    });
    setLoading(false);
  };

  const handleErrors = error => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    geo.getCurrentPosition(onSuccessfullyAcquirePosition, handleErrors);
  }, []);
  return { loading, position, error };
};

export const useWatchPosition = () => {
  const [position, setPosition] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onSuccessfullyAcquirePosition = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      altitude: coords.altitude,
      altitudeAccuracy: coords.altitudeAccuracy,
      heading: coords.heading,
      speed: coords.speed
    });
    setLoading(false);
  };

  const handleErrors = error => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
    }
    const watchPositionId = geo.watchPosition(onSuccessfullyAcquirePosition, handleErrors);
    return () => geo.clearWatch(watchPositionId);
  }, []);

  return { loading, position, error };
};
