const MONGO_URL = process.env.MONGO_URL || undefined;
const REDIS_URL = process.env.REDIS_URL || undefined;
const REDIS_HOST = process.env.REDIS_HOST || undefined;
const REDIS_PORT = process.env.REDIS_PORT || undefined;
module.exports = {
  MONGO_URL, //: 'mongodb://the_username:the_password@localhost:3456/the_database',
  REDIS_URL, //: '//localhost:6378'
  REDIS_PORT,
  REDIS_HOST,
};
