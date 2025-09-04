// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setAuth } from "../store/auth-slice";
// import api from "../http";

// export const useAutoLogin = () => {
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const { isAuth } = useSelector((state) => state.authSlice);

//   console.log(isAuth, "isAuth");
//   useEffect(() => {
//     // If already authenticated, no need to auto-login
//     if (isAuth) {
//       setLoading(false);
//       return;
//     }

//     const accessToken = localStorage.getItem("accessToken");
//     const refreshToken = localStorage.getItem("refreshToken");

//     // const accessToken = localStorage.getItem("accessToken");
//     // const refreshToken = localStorage.getItem("refreshToken");

//     if (!accessToken || !refreshToken) {
//       setLoading(false);
//       return;
//     }

//     (async () => {
//       try {
//         const res = await api.get("http://localhost:5500/api/auth/refresh", {
//           headers: {
//             Authorization: `Bearer ${refreshToken}`,
//           },
//         });

//         console.log("Auto-login response:", res);

//         if (res?.success) {
//           dispatch(
//             setAuth({
//               user: res.user,
//               isAuth: true,
//             })
//           );

//           localStorage.setItem("accessToken", JSON.stringify(res.accessToken));
//           localStorage.setItem(
//             "refreshToken",
//             JSON.stringify(res.refreshToken)
//           );
//         }
//       } catch (err) {
//         console.error("Auto-login error:", err);
//         // Clear invalid tokens
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [dispatch, isAuth]);

//   return { loading, isAuth };
// };

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
        const res = await api.get("http://localhost:5500/api/auth/refresh", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        console.log("Auto-login response:", res.data);

        if (res.data?.success) {
          dispatch(
            setAuth({
              user: res.data.user,
              isAuth: true,
            })
          );

          // ✅ Store tokens as plain strings
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

