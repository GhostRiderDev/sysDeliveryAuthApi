import * as fs from 'fs';
import * as path from 'path';

function getPath() {
  switch (process.env.NODE_ENV) {
    case 'test':
      return path.resolve(__dirname, '../../../../.env.test');
    default:
      return path.resolve(__dirname, '../../../../.env');
  }
}

const envPath = getPath();
const envConfig = fs
  .readFileSync(envPath, 'utf-8')
  .split('\n')
  .filter(Boolean)
  .reduce(
    (acc, line) => {
      const [key, value] = line.split('=');
      acc[key.trim()] = value.trim();
      return acc;
    },
    {} as Record<string, string>,
  );

Object.assign(process.env, envConfig);

export const {
  SERVER_PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
  API_VERSION,
} = process.env;
