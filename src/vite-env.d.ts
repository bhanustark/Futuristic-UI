/// <reference types="vite/client" />

// CSS modules support
declare module "*.css" {
  const content: string;
  export default content;
}
