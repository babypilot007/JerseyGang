import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const finishLogin = async () => {
      await supabase.auth.getSession();
      navigate("/complete-profile");
    };

    finishLogin();
  }, [navigate]);

  return <p>Signing you in...</p>;
}