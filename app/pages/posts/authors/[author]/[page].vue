<script setup lang="ts">
import type { Post } from "../../../../../types/post";
import type { Author } from "../../../../../types/author";

const route = useRoute();

// 著者スラッグを取得
const authorSlug = computed(() => route.params.author as string);

// 著者名を取得
const { data: Author } = await useMicroCMSGetList<Author>({
  endpoint: "authors",
  queries: { filters: `id[equals]${route.params.author}` },
});

// URLパラメータの 'page' を取得（なければ1ページ目とする）
const currentPage = computed(() => {
  const page = Number(route.params.page);
  return isNaN(page) || page < 1 ? 1 : page;
});

const { data: Posts } = await useMicroCMSGetList<Post>({
  endpoint: "posts",
  queries: {
    limit: POSTS_LIMIT,
    offset: (currentPage.value - 1) * POSTS_LIMIT,
    orders: "-publishedAt",
    filters: `authors[contains]${authorSlug.value}`,
  },
});

const totalPages = computed(() => {
  const total = Posts.value?.totalCount;
  return total && total > 0 ? Math.ceil(total / POSTS_LIMIT) : 0;
});
</script>

<template>
  <!-- 記事一覧 -->
  <PostList v-if="Posts" :posts="Posts.contents" :current-page="currentPage" :section-title="`Author: ${Author.contents[0]?.author_name}`" :total-pages="totalPages" :pagination-path="`/posts/authors/${authorSlug}`" />
</template>
