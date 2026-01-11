<script setup lang="ts">
import type { Category } from "../../types/category";
import type { Post } from "../../types/post";

const { data: CategoryList } = await useMicroCMSGetList<Category>({
  endpoint: "categories",
  queries: { limit: 10 },
});

const { data: RecentPosts } = await useMicroCMSGetList<Post>({
  endpoint: "posts",
  queries: { limit: 4, orders: "-publishedAt" },
});
</script>

<template>
  <div>
    <!-- ヘッダー -->
    <header class="bg-neutral-950 text-neutral-400 h-20 border-b border-neutral-600 flex items-center justify-center tablet:justify-between px-12 fixed top-0 w-full z-[70]">
      <div>
        <h1>
          <NuxtLink to="/" class="font-decorative text-4xl text-white">Ousial</NuxtLink>
        </h1>
      </div>
      <nav class="tablet:block hidden">
        <ul class="flex gap-4">
          <li class="text-white opacity-100">Categories:</li>
          <li><NuxtLink to="/posts/page/1">All</NuxtLink></li>
          <li v-for="category in CategoryList?.contents" :key="category.category_slug">
            <NuxtLink class="font-decorative" :to="`/posts/categories/${category.category_slug}/1`">{{ category.category_name }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <aside class="w-12 border-l border-neutral-600 bg-neutral-950 h-full fixed right-0 top-20 z-[60] overflow-hidden desktop:block hidden">
      <div class="infinite-scroll-wrapper flex flex-col">
        <ul class="infinite-scroll-list flex flex-col gap-12 items-center w-full py-12">
          <li v-for="post in RecentPosts?.contents" :key="`first-${post.id}`" class="flex flex-col items-center justify-center gap-2">
            <span class="dot block w-1 h-1 bg-purple-700 rounded-full"></span>
            <NuxtLink :to="`/posts/${post.slug}`" class="text-white opacity-80 [writing-mode:vertical-rl] text-xs tracking-widest">{{ post.title }}</NuxtLink>
          </li>
        </ul>
        <!-- 2回目のループ用（シームレスな繰り返しのため） -->
        <ul class="infinite-scroll-list flex flex-col gap-12 items-center w-full py-12">
          <li v-for="post in RecentPosts?.contents" :key="`second-${post.id}`" class="flex flex-col items-center justify-center gap-2">
            <span class="dot block w-1 h-1 bg-purple-700 rounded-full"></span>
            <NuxtLink :to="`/posts/${post.slug}`" class="text-white opacity-80 [writing-mode:vertical-rl] text-xs tracking-widest">{{ post.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </aside>

    <main class="mt-20">
      <slot />
    </main>
    <!-- フッター -->
    <footer class="relative flex flex-col tablet:flex-row items-center justify-between gap-4 bg-neutral-950 text-neutral-400 px-12 py-8 border-t border-[0.5px] border-neutral-600 z-[70]">
      <NuxtLink to="/" class="font-decorative text-4xl text-white">Ousial</NuxtLink>
      <div>
        <p class="text-white opacity-80 text-xs tracking-widest">&copy; 2026 Ousial. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>
