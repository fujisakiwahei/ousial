<script setup lang="ts">
import type { Post } from "../../../types/post";
const route = useRoute();

const { data: Post } = await useMicroCMSGetList<Post>({
  endpoint: "posts",
  queries: { filters: `slug[equals]${route.params.id}` },
});
</script>

<template>
  <div v-if="Post?.contents[0]" class="bg-neutral-950">
    <div class="w-full px-8 py-20 max-w-5xl mx-auto text-white">
      <p class="aspect-video w-full overflow-hidden">
        <img :src="Post.contents[0].thumbnail?.url" width="1920" height="1080" :alt="Post.contents[0].title" class="w-full h-full object-cover" loading="lazy" decoding="async" />
      </p>
      <div class="flex items-center gap-4 mt-8">
        <span v-for="category in Post.contents[0]?.categories" :key="category.id" class="flex items-center justify-center border border-purple-700 bg-purple-100 bg-opacity-10 px-2 py-1 leading-none font-decorative text-white opacity-80">
          {{ category.category_name }}
        </span>
        <time :datetime="Post.contents[0]?.publishedAt" class="text-white opacity-80">
          {{ formatDate(Post?.contents[0]?.publishedAt) }}
        </time>
      </div>
      <h1 class="text-white text-[clamp(20px,3vw,40px)] font-heading mt-2">{{ Post.contents[0].title }}</h1>
      <p class="text-white opacity-80 mt-4 leading-loose">{{ Post.contents[0].lead_text }}</p>
      <div v-html="Post.contents[0].main_content" class="post-content mt-8"></div>
      <NuxtLink :to="`/`" class="button mt-12 flex w-fit items-center border-[0.5px] border-white px-6 py-4 font-Serif text-white mx-auto">← 記事一覧に戻る</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.post-content {
  :deep(h2) {
    position: relative;
    margin-top: 120px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 8px;
    color: #7e2ece;
    background: white;
    font-family: "Shippori Mincho", serif;
    font-size: clamp(18px, 1.8vw, 28px);

    &::before {
      position: absolute;
      left: -0.6vw;
      top: -1.2vw;
      line-height: 1;
      content: "#";
      display: inline-block;
      color: #7e2ece;
      font-size: 2vw;
      font-family: "Shippori Mincho", serif;
    }
  }
  :deep(h3) {
    display: flex;
    font-family: "Shippori Mincho", serif;
    align-items: center;
    margin-top: 28px;
    font-size: 1.4vw;
    line-height: 2;
  }
  :deep(p) {
    margin-top: 20px;
    font-size: 16px;
    line-height: 2;
  }

  :deep(blockquote) {
    margin-top: 20px;
    padding: 20px;
    border: #a2a2a2 1px solid;
    background: #525252;
    border-radius: 24px 0 0 0;
    color: white;

    p {
      padding: 0;
      margin: 0;
    }
  }

  :deep(figure) {
    margin-top: 40px;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  :deep(ul) {
    margin-top: 20px;
    padding: 20px;
    border: #7e2ece 1px solid;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 12px;
    list-style: none; // 1. デフォルトのポッチを消す

    li {
      position: relative; // 2. 基準位置を設定
      padding-left: 16px; // 3. ポッチが入る分の余白を確保
      font-size: 16px;
      line-height: 1.6;

      &::before {
        content: "•"; // 4. 自作のポッチ（中グロなど）
        position: absolute;
        left: 0; // 左端に配置
        color: #7e2ece; // 5. ここで色を指定
        font-size: 24px;
        line-height: 1;
      }
    }
  }
  :deep(ol) {
    margin-top: 20px;
    padding: 20px;
    border: #7e2ece 1px solid;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 12px;
    list-style: decimal;
    list-style-position: inside;

    li {
      font-size: 16px;
      line-height: 1.6;

      &::marker {
        color: #7e2ece;
      }
    }
  }
  :deep(strong) {
    color: #fff95a;
    font-weight: 400;
    font-size: 20px;
  }
  :deep(a) {
    color: #7e2ece;
    text-decoration: underline;
    text-underline-offset: 4px;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
