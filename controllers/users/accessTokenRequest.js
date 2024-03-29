const { isAuthorized } = require('../tokenFunctions');
const { User } = require('../../models');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData)
    return res.json({ data: null, message: 'invalid access token' });
  const { userId } = accessTokenData;
  User.findOne({ where: { userId } })
    .then((data) => {
      if (!data) {
        return res.json({
          data: null,
          message: 'access token has been tempered',
        });
      }
      delete data.dataValues.password;
      return res.json({ data: { userInfo: data.dataValues }, message: 'ok' });
    })
    .catch((err) => {
      console.log(err);
    });
};
