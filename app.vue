<template>
  <div class="font-poppins mx-auto min-h-screen max-w-screen-2xl px-6 py-12 md:py-16 lg:py-0">
    <TrackrHeader />
    <NuxtPage></NuxtPage>
  </div>
</template>

<script lang="ts" setup>
useHead({
  bodyAttrs: {
    class: 'bg-neutral-900 text-neutral-100'
  }
})
</script>