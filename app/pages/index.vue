<script setup lang="ts">
import type { Post } from "../../types/post";
const { data: FeaturedPost } = await useMicroCMSGetList<Post>({
  endpoint: "posts",
  queries: { limit: 1, orders: "-publishedAt", filters: "is_featured[equals]true" },
});

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
  <!-- ファーストビュー -->
  <section class="bg-cover bg-center bg-no-repeat h-[calc(100vh-80px)] desktop:h-[80vh]" :style="{ backgroundImage: `url(${FeaturedPost?.contents[0]?.thumbnail?.url})` }">
    <div class="wrapper relative flex h-full flex-col justify-end bg-black-gradient bg-cover bg-center desktop:pb-16 desktop:pl-16 tablet:px-12 tablet:pb-24 tablet:pl-12 px-5 pb-20">
      <div class="flex items-center gap-4">
        <span v-for="category in FeaturedPost?.contents[0]?.categories" :key="category.id" class="flex items-center justify-center border border-purple-700 bg-purple-100 bg-opacity-10 px-2 py-1 leading-none font-decorative text-white opacity-80">
          {{ category.category_name }}
        </span>
        <time :datetime="FeaturedPost?.contents[0]?.publishedAt" class="text-white opacity-80 text-sm tablet:text-base">
          {{ formatDate(FeaturedPost?.contents[0]?.publishedAt) }}
        </time>
      </div>
      <h2 class="tablet:w-4/5 font-heading text-[22px] tablet:text-[4vw] mt-2 tablet:mt-0 text-white">{{ FeaturedPost?.contents[0]?.title }}</h2>
      <p class="mt-4 tablet:w-3/5 font-serif text-sm tablet:text-base tablet:leading-loose leading-loose text-white opacity-80">{{ FeaturedPost?.contents[0]?.lead_text }}</p>
      <NuxtLink :to="`/posts/${FeaturedPost?.contents[0]?.slug}`" class="button tablet:mt-8 mt-4 flex w-fit items-center border-[0.5px] border-white px-6 py-4 font-decorative text-white">この記事を読む →</NuxtLink>
    </div>
  </section>

  <!-- 記事一覧 -->
  <PostList v-if="Posts" :posts="Posts.contents" :current-page="currentPage" :total-pages="totalPages" :pagination-path="`/posts/page`" />
</template>
