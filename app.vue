<template>
  <div class="font-poppins mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-0">
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