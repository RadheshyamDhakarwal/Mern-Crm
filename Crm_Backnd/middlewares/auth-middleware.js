// const tokenService = require("../services/token-service");
// const userService = require("../services/user-service");
// const ErrorHandler = require("../utils/error-handler");
// const { TokenExpiredError } = require("jsonwebtoken");
// const jwt = require("jsonwebtoken");

// const auth = async (req, res, next) => {
//   // try {
//   //   const authHeader = req.headers["authorization"];
//   //   const refreshTokenFromHeader = req.headers["x-refresh-token"];

//   //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//   //     return next(ErrorHandler.unAuthorized());
//   //   }

//   //   const accessTokenFromHeader = authHeader.split(" ")[1];

//   //   let userData;
//   //   try {
//   //     userData = await tokenService.verifyAccessToken(accessTokenFromHeader);
//   //     if (!userData) throw new Error();
//   //     req.user = userData;
//   //     return next();
//   //   } catch (e) {
//   //     // Token is expired or invalid
//   //     if (e instanceof TokenExpiredError) {
//   //       console.log("Access token expired, trying to refresh...");
//   //       if (!refreshTokenFromHeader) return next(ErrorHandler.unAuthorized());

//   //       const userData = await tokenService.verifyRefreshToken(
//   //         refreshTokenFromHeader
//   //       );
//   //       const { _id, email, username, type } = userData;
//   //       const token = await tokenService.findRefreshToken(
//   //         _id,
//   //         refreshTokenFromHeader
//   //       );
//   //       if (!token) return next(ErrorHandler.unAuthorized());

//   //       const payload = { _id, email, username, type };
//   //       const { accessToken, refreshToken } =
//   //         tokenService.generateToken(payload);

//   //       await tokenService.updateRefreshToken(
//   //         _id,
//   //         refreshTokenFromHeader,
//   //         refreshToken
//   //       );

//   //       const user = await userService.findUser({ email });
//   //       if (user.status !== "active") {
//   //         return next(
//   //           ErrorHandler.unAuthorized(
//   //             "There is a problem with your account, please contact the admin."
//   //           )
//   //         );
//   //       }

//   //       req.user = user;

//   //       // Set tokens in cookies or headers (depends on frontend strategy)
//   //       res.cookie("accessToken", accessToken, {
//   //         maxAge: 1000 * 60 * 60 * 24 * 30,
//   //         // httpOnly: true
//   //       });
//   //       res.cookie("refreshToken", refreshToken, {
//   //         maxAge: 1000 * 60 * 60 * 24 * 30,
//   //         // httpOnly: true
//   //       });

//   //       console.log("New tokens generated successfully");
//   //       return next();
//   //     } else {
//   //       console.log("Token Error:", e);
//   //       return next(ErrorHandler.unAuthorized());
//   //     }
//   //   }
//   // } catch (err) {
//   //   console.error("Unexpected error in auth middleware:", err);
//   //   return next(ErrorHandler.unAuthorized());
//   // }

//   try {
//     const authHeader = req.headers["authorization"];
//     console.log(authHeader,"authHeader")
//     if (!authHeader)
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized Access" });

//     const token = authHeader.split(" ")[1]; // Bearer <token>
//     if (!token)
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized Access" });

//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = user;
//     next();
//   } 
//   catch (err) {
//     return res
//       .status(403)
//       .json({ success: false, message: "Unauthorized Access" });
//   }

// };

// const authRole = (role) => {
//   return (req, res, next) => {
//     if (!role.includes(req.user.type)) return next(ErrorHandler.notAllowed());
//     next();
//   };
// };

// module.exports = {
//   auth,
//   authRole,
// };


const jwt = require("jsonwebtoken");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");
const ErrorHandler = require("../utils/error-handler");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ success: false, message: "Access token missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = tokenService.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid access token" });
  }
};


// ✅ Role-based middleware
const authRole = (roles) => {
  return (req, res, next) => {
    console.log(req.user.type,"user type",roles.includes(req.user.type),roles,"roles")
    if (!roles.includes(req.user.type)) {
      return res.status(403).json({ success: false, message: "Not allowed" });
    }
    next();
  };
};

module.exports = { auth, authRole };
