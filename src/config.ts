interface Config {
  PORT: string;
  MONGODB_URI: string;
}

const config: Config = {
  PORT: process.env.PORT ?? "2000",
  MONGODB_URI:
    process.env.MONGODB_URI ?? "mongodb://localhost:27017/mydatabase",
};

export default config;
