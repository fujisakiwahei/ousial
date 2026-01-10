<template>
  <div>
    <!-- ページ遷移時のアナウンス（アクセシビリティ用。消さずに残しましょう） -->
    <NuxtRouteAnnouncer />

    <!-- URLに合わせて pages/ 内の中身がここに入れ替わります -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
