

import { useEffect, useState } from "react";

const useAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken =
      localStorage.getItem("psg_auth_token") || sessionStorage.getItem("psk_auth_token");
    setToken(storedToken);
    console.log("useAuth",storedToken)
  }, []);

  return token;
};

export default useAuth;
