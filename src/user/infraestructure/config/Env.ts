process.loadEnvFile();

export const { SERVER_PORT, DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD, API_VERSION } =
  process.env;
