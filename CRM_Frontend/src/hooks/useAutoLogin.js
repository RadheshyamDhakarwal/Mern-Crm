import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/auth-slice";
import api from "../http";

export const useAutoLogin = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (isAuth) {
      setLoading(false);
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      setLoading(false);
      return;
    }

   (async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      setLoading(false);
      return;
    }

    const res = await api.get("http://localhost:5500/api/auth/refresh", {
      headers: {
        "x-refresh-token": refreshToken,   // 👈 yaha Authorization mat bhejo
      },
    });

    console.log("Auto-login response:", res.data);

    if (res?.data?.success) {
      dispatch(
        setAuth({
          user: res.data.user,
          isAuth: true,
        })
      );

      // Token ko bina JSON.stringify ke store karo
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
    }
  } catch (err) {
    console.error("Auto-login error:", err);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } finally {
    setLoading(false);
  }
})();

  }, [dispatch, isAuth]);

  return { loading, isAuth };
};

