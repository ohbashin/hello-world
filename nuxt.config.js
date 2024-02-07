import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["animate.css"],
  runtimeConfig: {
    region: "ap-northeast-1",
    bucketName: "km-sd06-2",
    public: {
      backendOrigin: undefined,
    },
  },
});
