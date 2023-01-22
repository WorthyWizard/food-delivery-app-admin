/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API_URL: string;
  readonly VITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
