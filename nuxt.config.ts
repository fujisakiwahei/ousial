// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  modules: ["nuxt-microcms-module", "@nuxtjs/tailwindcss", "@nuxt/image", "@nuxtjs/sitemap", "@nuxtjs/robots", "@nuxtjs/seo", "nuxt-gtag"],
  css: ["~/assets/css/main.scss"],

  microCMS: {
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
    target: "all",
  },

  gtag: {
    id: "G-GYQ2GTCKLT",
  },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@400;700&family=Noto+Serif+JP:wght@400;700&family=Shippori+Mincho:wght@400;700&display=swap",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        // Apple Touch Icon (iOSホーム画面用)
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        // (任意) 高解像度用PNG
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
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
