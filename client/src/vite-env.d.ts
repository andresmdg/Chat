/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // Otras variables de entorno personalizadas también pueden ir aquí
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}