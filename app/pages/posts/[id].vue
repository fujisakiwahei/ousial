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
    <div class="w-full tablet:px-8 px-5 tablet:py-20 py-12 max-w-5xl mx-auto text-white">
      <p class="aspect-video w-full overflow-hidden">
        <img :src="`${Post.contents[0].thumbnail?.url}`" width="1920" height="1080" :alt="Post.contents[0].title" class="w-full h-full object-cover" loading="lazy" decoding="async" />
      </p>
      <NuxtLink :to="`/posts/authors/${author.author_slug}/1`" v-for="author in Post.contents[0].authors" :key="author.id" class="authorInfo mt-8 flex items-center gap-2">
        <p class="w-8 h-8 bg-purple-700 rounded-full overflow-hidden border-[0.5px] border-white">
          <img :src="`${author.author_image?.url}`" width="32" height="32" :alt="`${author.author_name}のアイコン`" class="w-full h-full object-cover" loading="lazy" decoding="async" />
        </p>
        <p class="text-white opacity-80 text-sm tracking-widest">
          {{ author.author_name }}
        </p>
      </NuxtLink>
      <div class="flex items-center gap-4 mt-4">
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
    margin-top: 80px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 8px;
    color: #7e2ece;
    background: white;
    font-family: "Shippori Mincho", serif;
    font-size: clamp(20px, 1.8vw, 28px);

    &::before {
      position: absolute;
      left: clamp(-20px, -0.6vw, -6px);
      top: clamp(-20px, -1.2vw, -11px);
      line-height: 1;
      content: "#";
      display: inline-block;
      color: #7e2ece;
      font-size: clamp(20px, 2vw, 40px);
      font-family: "Shippori Mincho", serif;
    }
  }
  :deep(h3) {
    display: flex;
    font-family: "Shippori Mincho", serif;
    color: #dbb6ff;
    align-items: center;
    margin-top: 32px;
    font-size: clamp(20px, 1.4vw, 40px);
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
    border: #a2a2a2 0.5px solid;
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
    border: #7e2ece 0.5px solid;
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
    border: #7e2ece 0.5px solid;
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
    color: #dbb6ff;
    text-decoration: underline;
    text-underline-offset: 4px;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
