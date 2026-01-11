<script setup lang="ts">
import type { Post } from "../../../../types/post";

const route = useRoute();

// URLパラメータの 'page' を取得（なければ1ページ目とする）
const currentPage = computed(() => {
  const page = Number(route.params.page);
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
  <PostList v-if="Posts" :posts="Posts.contents" :current-page="currentPage" :total-pages="totalPages" :pagination-path="`/posts/page`" />
</template>
