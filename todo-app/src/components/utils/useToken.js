import {  useState } from "react";

export const useToken = () => {

    
  const [token, setTokenInternal] = useState("");


  const setToken = (newToken) => {
    setTokenInternal(newToken);
  };

  return [token, setToken];
};
