export const e2eEnvConfigService = {
  get: (key: string) => {
    if (key === 'API_VERSION') {
      return 1;
    }

    return null;
  },
};
