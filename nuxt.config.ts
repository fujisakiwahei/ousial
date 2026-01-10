// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  modules: ["nuxt-microcms-module", "@nuxtjs/tailwindcss", "@nuxt/image", "@nuxtjs/sitemap", "@nuxtjs/robots"],
  css: ["~/assets/css/main.scss"],
  microCMS: {
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
  },
  site: { url: "https://example.com" }, // サイトマップ用

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
});
