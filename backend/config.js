require('@dotenvx/dotenvx').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
};

