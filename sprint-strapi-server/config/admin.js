module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c42f1d27df54f0d6bfd52af2bee967e5'),
  },
});
