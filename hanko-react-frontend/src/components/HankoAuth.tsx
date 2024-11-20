import { useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { register, Hanko } from "@teamhanko/hanko-elements";

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

export default function HankoAuth() {
  const navigate = useNavigate();
  const hanko = useMemo(() => new Hanko(hankoApi), []);


  const redirectAfterLogin = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  useEffect(
    () =>
      hanko.onSessionCreated(() => {
        redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin]
  );

  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
    });
  }, []);

  return <hanko-auth />;
}