import { useEffect, useState } from "react";

// This is hook only for client component
const useClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default useClient;
