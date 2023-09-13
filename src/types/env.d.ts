export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_AUTH_CLIENTID: string;
      REACT_APP_AUTH_DOMAIN: string;
    }
  }
}
