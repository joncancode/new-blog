const devConfig = {
  MONGO_URL: 'mongodb://localhost/blog-w-react-dev',
  JWT_SECRET: 'this is a secret'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/blog-w-react-test',
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/blog-w-react-prod',
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
    }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
