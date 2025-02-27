<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <NuxtLink :to="to" class="header-icon" :class="{ active: isActive }">
          <slot></slot>
        </NuxtLink>
      </TooltipTrigger>
      <TooltipContent class="font-medium">
        {{ tooltip }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script setup lang="ts">
defineProps<{
  tooltip: string;
  to: string;
  isActive?: boolean;
}>();
</script>

<style scoped>
.header-icon {
  @apply flex items-center justify-center p-2 rounded-md transition-colors;
  @apply text-white hover:text-gray-900 hover:bg-gray-100;
}

.header-icon.active {
  @apply text-gray-900 bg-gray-100;
}
</style>