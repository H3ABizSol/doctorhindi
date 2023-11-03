import React from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
export const Private = () => {
  const [ok, setOk] = React.useState(false);
  const navigate = useNavigate();
  const isAuthenticate = async () => {
    if (localStorage.getItem("user_token")) {
      const { data } = await axios.get("/api/auth/isadmin", {
        headers: {
          token: localStorage.getItem("user_token"),
        },
      });
      if (data.success) {
        setOk(true);
      }
    } else {
      navigate("/signin");
    }
  };

  React.useEffect(() => {
    isAuthenticate();
  }, []);

  return ok && <Outlet />;
};
