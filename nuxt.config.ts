// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  modules: ["nuxt-microcms-module", "@nuxtjs/tailwindcss", "@nuxt/image", "@nuxtjs/sitemap", "@nuxtjs/robots", "@nuxtjs/seo"],
  css: ["~/assets/css/main.scss"],

  // 環境変数をクライアント側（ブラウザ）でも使えるように設定
  runtimeConfig: {
    public: {
      MICROCMS_SERVICE_DOMAIN: process.env.MICROCMS_SERVICE_DOMAIN,
      MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
    },
  },

  microCMS: {
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
  },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@400;700&family=Noto+Serif+JP:wght@400;700&family=Shippori+Mincho:wght@400;700&display=swap",
        },
      ],
    },
  },

  site: {
    url: "https://ousial.vercel.app/",
    name: "Ousial | 社会と技術・SNSとの付き合い方をゆっくり考えるメディア",
    description: "社会と技術・SNSとの付き合い方をゆっくり考えるメディア",
    defaultLocale: "ja",
  },
});
