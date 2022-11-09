module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: "192.168.0.18",
  app: {
    keys: env.array('APP_KEYS'),
  },
});
