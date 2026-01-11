<script setup lang="ts">
import type { Post } from "../../types/post";

// Propsの定義
const props = defineProps<{
  posts: Post[];
  currentPage: number;
  totalPages: number;
  sectionTitle?: string;
  paginationPath?: string;
}>();
</script>

<template>
  <section class="postList w-full bg-neutral-950 desktop:px-16 px-5 desktop:py-20 py-8">
    <div class="postListInner">
      <h2 class="font-decorative desktop:text-[7vw] text-[40px] leading-none text-white">{{ sectionTitle || "Recent Articles" }}</h2>
      <div class="separator my-4 tablet:my-8 h-[0.5px] w-full bg-white opacity-10"></div>

      <!-- 記事一覧 -->
      <div class="flex flex-wrap gap-x-[40px] gap-y-[64px]">
        <NuxtLink v-for="post in posts" :key="post.id" :to="`/posts/${post.slug}`" class="postListItem h-full tablet:w-[calc(50%-20px)] w-full">
          <p class="aspect-video w-full overflow-hidden">
            <img :src="post.thumbnail?.url" :alt="post.title" width="1920" height="1080" loading="lazy" decoding="async" class="size-full object-cover grayscale" />
          </p>
          <div class="mt-6 flex items-center gap-4">
            <span v-for="category in post.categories" :key="category.id" class="flex items-center justify-center border border-purple-700 bg-purple-100 bg-opacity-10 px-2 py-1 leading-none font-decorative text-white opacity-80">
              {{ category.category_name }}
            </span>
            <time :datetime="post.publishedAt" class="text-white opacity-80 text-sm tablet:text-base">
              {{ formatDate(post.publishedAt) }}
            </time>
          </div>
          <h3 class="mt-2 font-heading tablet:text-[2.4vw] text-[20px] text-white">{{ post.title }}</h3>
          <p class="mt-3 font-serif leading-loose text-white opacity-70 text-sm tablet:text-base">{{ post.lead_text }}</p>
          <div v-for="author in post.authors" :key="author.id" class="mt-4 flex items-center gap-2">
            <p class="w-8 h-8 bg-purple-700 rounded-full overflow-hidden border-[0.5px] border-white">
              <img :src="`${author.author_image?.url}`" width="32" height="32" :alt="`${author.author_name}のアイコン`" class="w-full h-full object-cover" loading="lazy" decoding="async" />
            </p>
            <p class="text-white opacity-80 text-sm tracking-widest">
              {{ author.author_name }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <!-- ページネーション -->
      <nav v-if="totalPages > 0" class="mt-12 pagination" aria-label="ページネーション">
        <ul class="text-white flex justify-center items-center gap-4">
          <!-- 前へ -->
          <li v-if="currentPage > 1" class="prev">
            <NuxtLink :to="`${paginationPath}/${currentPage - 1}`" class="bg-purple-700 px-1"> ←PREV </NuxtLink>
          </li>

          <!-- ページ番号 -->
          <li v-for="p in totalPages" :key="p" class="pageNumber">
            <NuxtLink :to="`${paginationPath}/${p}`" :class="{ 'is-active': p === currentPage }">
              {{ p }}
            </NuxtLink>
          </li>

          <!-- 次へ -->
          <li v-if="currentPage < totalPages" class="next">
            <NuxtLink :to="`${paginationPath}/${currentPage + 1}`" class="bg-purple-700 px-1"> NEXT→ </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>
