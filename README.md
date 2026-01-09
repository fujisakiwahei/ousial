# 社会科学系ウェブメディア：技術設計・実装ドキュメント

ご提示いただいたデザインコンセプトおよび要件に基づき、Nuxt 3 × MicroCMS を活用したモダンで没頭感のあるメディアサイトの実装プランをまとめました。

---

## 1. 開発環境・技術スタック
- **Framework**: Nuxt 3 (SSR/SSG併用)
- **Language**: TypeScript
- **CSS**: Tailwind CSS (JITモード)
- **CMS**: MicroCMS (Headless CMS)
- **Deployment**: Vercel

---

## 2. 実装のハイライト

### デザインの実装 (Tailwind & CSS Custom)
「没頭型」を実現するため、フォントの細部までこだわります。

```typescript
// tailwind.config.ts の設定例
export default {
  theme: {
    extend: {
      colors: {
        background: '#000000',
        accent: '#A855F7',
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', 'serif'],
        heading: ['"Shippori Mincho"', 'serif'],
        decorative: ['"Cinzel Decorative"', 'cursive'],
      },
    },
  },
}
```

### 縦書きティッカー (VerticalTicker.vue)
デスクトップ専用の縦書きスクロールは、CSSの `writing-mode` を利用して実装します。

```vue
<template>
  <aside class="hidden lg:block fixed right-4 top-0 h-full w-12 border-l border-white/10 z-50">
    <div class="writing-vertical-rl animate-scroll text-accent font-serif tracking-widest py-8">
      {{ latestPostTitle }} — Latest Update
    </div>
  </aside>
</template>

<style scoped>
.writing-vertical-rl {
  writing-mode: vertical-rl;
}
@keyframes scroll {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
.animate-scroll {
  animation: scroll 20s linear infinite;
}
</style>
```

---

## 3. MicroCMS 連携フロー



### 1. APIクライアントの設定
`nuxt-microcms-module` を導入し、環境変数を設定します。

### 2. データ取得 (Pages/index.vue)
`useMicroCMSGetList` を用いて、トップページに必要な記事一覧を取得します。

```typescript
// pages/index.vue
const { data: posts } = await useMicroCMSGetList({
  endpoint: "posts",
  queries: { limit: 10, orders: "-date" },
});
```

---

## 4. コンポーネント構成案

| コンポーネント名 | 役割 |
| :--- | :--- |
| `FeaturedPost` | 画面いっぱいに広がるメインビジュアルと、大きな Cinzel Decorative の見出し。 |
| `PostList` | 記事を整然と並べるグリッド。ホバー時に紫のボーダーが発光するエフェクトを付与。 |
| `TheHeader` | 最小限のリンク。スクロールで背景が透過するデザイン。 |
| `MobileDrawer` | ハンバーガーメニュー。`v-if` と CSS Transition で滑らかに開閉。 |

---

## 5. デプロイと運用フロー

1. **GitHub Push**: コードを変更してリポジトリに反映。
2. **Vercel Build**: 自動検知してビルド開始。環境変数が注入される。
3. **Webhook連携**: MicroCMSで記事を更新した際、Vercelの再ビルドを走らせる設定を推奨。

---

## 6. 次のステップ

この設計書に基づき、まずは以下の作業を進めることを提案します。

- **モックアップ構築**: Tailwind CSS を用いて `FeaturedPost` のレイアウトを確認。
- **MicroCMS 枠組み作成**: 推奨データスキーマに従い API 構造を定義。

これらの工程のうち、まずは **MicroCMSのAPI設定の詳細** または **Tailwindの詳細な設定コード** のどちらを具体化しましょうか？
```
