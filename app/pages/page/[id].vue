<script setup lang="ts">
import type { Post } from "../../../types/post";

const route = useRoute();

// URLパラメータの 'id' を取得（なければ1ページ目とする）
const currentPage = computed(() => {
  const page = Number(route.params.id);
  return isNaN(page) || page < 1 ? 1 : page;
});

const totalPages = computed(() => {
  const total = Posts.value?.totalCount;
  return total && total > 0 ? Math.ceil(total / POSTS_LIMIT) : 0;
});

const { data: Posts } = await useMicroCMSGetList<Post>({
  endpoint: "posts",
  queries: {
    limit: POSTS_LIMIT,
    offset: (currentPage.value - 1) * POSTS_LIMIT,
    orders: "-publishedAt",
  },
});
</script>

<template>
  <!-- 記事一覧 -->
  <section class="w-full bg-neutral-950 px-16 py-20">
    <h2 class="font-decorative text-[7vw] leading-none text-white">Recent Articles</h2>
    <div class="separator my-8 h-[0.5px] w-full bg-white opacity-10"></div>
    <div class="flex flex-wrap gap-x-[40px] gap-y-[64px]">
      <NuxtLink v-for="post in Posts?.contents" :key="post.id" :to="`/posts/${post.slug}`" class="postListItem h-full w-[calc(50%-20px)]">
        <p class="aspect-video w-full overflow-hidden">
          <img :src="post.thumbnail?.url" :alt="post.title" class="size-full object-cover grayscale" />
        </p>
        <div class="mt-6 flex items-center gap-4">
          <p v-for="category in post.categories" :key="category.id" class="flex items-center justify-center border border-purple-700 bg-purple-100 bg-opacity-10 px-2 py-1 leading-none font-decorative text-white opacity-80">
            {{ category.category_name }}
          </p>
          <time :datetime="post.publishedAt" class="text-white opacity-80">
            {{ formatDate(post.publishedAt) }}
          </time>
        </div>
        <h3 class="mt-2 font-heading text-[2.4vw] text-white">{{ post.title }}</h3>
        <p class="mt-3 font-serif leading-loose text-white opacity-70">{{ post.lead_text }}</p>
      </NuxtLink>
    </div>
    <nav class="mt-12" aria-label="ページネーション">
      <ul class="text-white flex justify-center items-center gap-4">
        <!-- 前へ -->
        <li v-if="currentPage > 1" class="">
          <NuxtLink :to="`/page/${currentPage - 1}`" class="bg-purple-700 px-1"> ←PREV </NuxtLink>
        </li>

        <!-- ページ番号 -->
        <li v-for="p in totalPages" :key="p" class="">
          <NuxtLink :to="`/page/${p}`" class="" :class="{ 'is-active': p === currentPage }">
            {{ p }}
          </NuxtLink>
        </li>

        <!-- 次へ -->
        <li v-if="currentPage < totalPages" class="">
          <NuxtLink :to="`/page/${currentPage + 1}`" class="bg-purple-700 px-1"> NEXT→ </NuxtLink>
        </li>
      </ul>
    </nav>
  </section>
</template>
