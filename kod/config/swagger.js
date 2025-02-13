const options = {
  title: 'Social network API',
  version: '1.0.0',
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  securityDefinitions: {
    Bearer: {
      description:
        'Example value:- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM',
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [{ Bearer: [] }],
  defaultSecurity: 'Bearer',
};

module.exports = options;
