<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <span v-if="artists.length > 1" class="text-sm md:text-lg cursor-default">+ {{ artists.length - 1 }}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ allArtists }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script lang="ts" setup>
import type { SimplifiedArtistObject } from "~/types/spotify";

interface Props {
  artists: SimplifiedArtistObject[];
}

const props = defineProps<Props>();

const allArtists = computed(() => {
  return props.artists.map((artist) => artist.name).join(", ");
});
</script>
