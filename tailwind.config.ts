import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      screens: {
        // カスタムブレイクポイント 768px
        tablet: "768px",
        // カスタムブレイクポイント 1080px
        desktop: "1080px",
      },
      backgroundImage: {
        "black-gradient": "url('~/assets/images/black-gradient.svg')",
      },
      fontFamily: {
        // class="font-serif" で Noto Serif JP に
        serif: ['"Noto Serif JP"', "serif"],
        // class="font-heading" で Shippori Mincho に
        heading: ['"Shippori Mincho"', "serif"],
        // class="font-decorative" で Cormorant SC に
        decorative: ['"Cormorant SC"', "serif"],
      },
    },
  },
  content: ["./app/**/*.{vue,js,ts,jsx,tsx}", "./components/**/*.{vue,js,ts,jsx,tsx}", "./layouts/**/*.{vue,js,ts,jsx,tsx}", "./pages/**/*.{vue,js,ts,jsx,tsx}", "./plugins/**/*.{vue,js,ts,jsx,tsx}", "./app.vue"],
};
