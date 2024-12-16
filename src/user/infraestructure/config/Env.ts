process.loadEnvFile(getPath());

function getPath() {
  switch (process.env.NODE_ENV) {
    case 'test':
      return '.env.test';
    default:
      return '.env';
  }
}

export const {
  SERVER_PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
  API_VERSION,
} = process.env;
