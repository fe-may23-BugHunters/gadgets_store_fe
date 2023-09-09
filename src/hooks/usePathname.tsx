import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function usePathname() {
  const currentLocation = useLocation();
  const [pathname, setPathname] = useState(currentLocation.pathname);

  const handlePathChange = (newPath: string) => {
    setPathname(newPath);
  };

  useEffect(() => {
    handlePathChange(currentLocation.pathname);
  }, [currentLocation.pathname]);

  const onPathChange = (newPath: string) => {
    handlePathChange(newPath);
  };

  return { pathname, onPathChange };
}
