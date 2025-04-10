// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  runtimeConfig: {
    // 서버에서만 사용 가능한 키
    kakaoApiKey: "카카오 api 키",
    // 클라이언트에서도 사용 가능한 키
    openWeatherApiKey: "오픈웨더 api 키",
  },
  _modules: ["@nuxt/eslint", "@nuxthub/core"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  build: {
    transpile: ["vuetify", "@xenova/transformers"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
  ],
  vite: {
    optimizeDeps: {
      exclude: ["@xenova/transformers"],
    },
    build: {
      target: "esnext", // 최신 자바스크립트 기능 사용
    },
    // 웹 워커 설정
    worker: {
      format: "es",
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
