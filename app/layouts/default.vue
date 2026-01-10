<script setup lang="ts">
import type { Category } from "../../types/category";
import type { Post } from "../../types/post";

const { data: CategoryList } = await useMicroCMSGetList<Category>({
  endpoint: "categories",
  queries: { limit: 10 },
});
</script>

<template>
  <div>
    <!-- ヘッダー -->
    <header class="bg-neutral-950 text-neutral-400 h-20 border-b border-neutral-600 flex items-center justify-between px-12 fixed top-0 w-full z-50">
      <div>
        <h1>
          <NuxtLink to="/" class="font-decorative text-2xl text-white">Ousial</NuxtLink>
        </h1>
      </div>
      <nav>
        <ul class="flex gap-4">
          <li v-for="category in CategoryList?.contents" :key="category.category_slug">
            <NuxtLink class="font-decorative" :to="`/categories/${category.category_slug}`">{{ category.category_name }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <main class="mt-20">
      <slot />
    </main>

    <!-- フッター -->
    <footer class="flex items-center justify-between bg-neutral-950 text-neutral-400 px-12 py-8 border-t border-[0.5px] border-neutral-600">
      <NuxtLink to="/" class="font-decorative text-2xl text-white">Ousial</NuxtLink>
      <div>
        <p>&copy; 2026 Ousial. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>
