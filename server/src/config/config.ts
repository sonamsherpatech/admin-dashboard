import { config } from "dotenv";
config();

// a helper function that assures the return value is a string
function getEnv(key: string): string {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
}

const envConfig = {
  portNumber: getEnv("PORT"),

  //Database Configuration
  databaseName: getEnv("DATABASE_NAME"),
  databaseUsername: getEnv("DATABASE_USERNAME"),
  databasePassword: getEnv("DATABASE_PASSWORD"),
  databaseHost: getEnv("DATABASE_HOST"),
  databasePort: getEnv("DATABASE_PORT"),
};

export default envConfig;
