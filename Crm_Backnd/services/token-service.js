// const jwt = require('jsonwebtoken');
// const TokenModel = require('../models/token-model');
// const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
// const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
// class TokenService {

//     generateToken = (payload) =>
//     {
//         const accessToken = jwt.sign(payload,accessTokenSecretKey,{
//             expiresIn:'1h'
//         });
//         const refreshToken = jwt.sign(payload,refreshTokenSecretKey,{
//             expiresIn:'1y'
//         });
//         return {accessToken,refreshToken};
//     }

//     storeRefreshToken = async (userId,token) =>
//     {
//         const tokens = {token}
//         const isExist = await TokenModel.exists({userId})
//         if(!isExist)
//             return await TokenModel.create({userId,tokens})
//         else
//             return await TokenModel.findOneAndUpdate({userId},{$push:{tokens}});
//     }

//     removeRefreshToken = async (userId,token) =>
//     {
//         const tokens = {token}
//         return await TokenModel.updateOne({userId,'tokens.token':token},{$pull:{tokens}});
//     }

//     verifyRefreshToken =  refreshToken => jwt.verify(refreshToken,refreshTokenSecretKey);

//     verifyAccessToken = accessToken => jwt.verify(accessToken,accessTokenSecretKey);

//     findRefreshToken = async (userId,token) => await TokenModel.findOne({userId,'tokens.token':token}).select({tokens:{$elemMatch:{token}}});

//     updateRefreshToken = async (userId,oldToken,token) => await TokenModel.findOneAndUpdate({userId,'tokens.token':oldToken},{$set:{'tokens.$.token':token}});

// }

// module.exports = new TokenService();


const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;

if (!accessTokenSecretKey || !refreshTokenSecretKey) {
  throw new Error('JWT secret keys are not defined in environment variables');
}

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecretKey, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, refreshTokenSecretKey, { expiresIn: '1y' });
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(userId, token) {
    const isExist = await TokenModel.exists({ userId });
    if (!isExist) {
      return await TokenModel.create({ userId, tokens: [{ token }] });
    } else {
      return await TokenModel.findOneAndUpdate(
        { userId },
        { $push: { tokens: { token } } },
        { new: true }
      );
    }
  }

  async removeRefreshToken(userId, token) {
    return await TokenModel.updateOne(
      { userId, 'tokens.token': token },
      { $pull: { tokens: { token } } }
    );
  }

  verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenSecretKey);
  }

  verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, accessTokenSecretKey);
  }

  async findRefreshToken(userId, token) {
    return await TokenModel.findOne(
      { userId, 'tokens.token': token },
      { 'tokens.$': 1 }
    );
  }

  async updateRefreshToken(userId, oldToken, token) {
    return await TokenModel.findOneAndUpdate(
      { userId, 'tokens.token': oldToken },
      { $set: { 'tokens.$.token': token } },
      { new: true }
    );
  }
}

module.exports = new TokenService();
