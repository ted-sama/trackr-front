<template>
  <div :class="`flex ${textPositionClasses[textPosition].container}`">
    <div :class="`flex relative ${imageContainer}`">
      <img :src="cover" alt="Album cover" :class="`${imageSize} rounded-lg border-solid border border-neutral-500/15`">
      <span :class="`${rankSize} font-bold absolute bottom-0 right-0 cursor-default`" style="-webkit-text-stroke: 1px rgb(115 115 115 / 0.15);">{{ rank }}</span>
    </div>
    <div :class="`${textPositionClasses[textPosition].text}`">
      <h2 class="text-sm md:text-2xl font-bold text-ellipsis overflow-hidden whitespace-nowrap">{{ name }}</h2>
      <p class="text-sm md:text-lg text-ellipsis overflow-hidden whitespace-nowrap">{{ artist }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Track } from '~/types/spotify';

interface Props {
  size?: 'm' | 'l';
  textPosition?: 'bottom' | 'right';
  rank: number;
  cover: Track['album']['images'][0]['url'];
  name: Track['name'];
  artist: Track['artists'][0]['name'];
}

const props = withDefaults(defineProps<Props>(), {
  size: 'm',
  textPosition: 'bottom'
})

const imageContainer = computed(() => {
  if (props.size === 'm') {
    return 'size-[90px] md:size-36'
  } else if (props.size === 'l') {
    return 'size-36 md:size-60'
  }
})

const imageSize = computed(() => {
  if (props.size === 'm') {
    return 'size-20 md:size-32'
  } else if (props.size === 'l') {
    return 'size-32 md:size-52'
  }
})

const rankSize = computed(() => {
  if (props.size === 'm') {
    return 'text-4xl md:text-6xl'
  } else if (props.size === 'l') {
    return 'text-6xl md:text-8xl'
  }
})

const textPositionClasses: any = {
  bottom: {
    container: 'flex-col',
    text: 'mt-4 max-w-60'
  },
  right: {
    container: 'flex-row gap-1 md:gap-2',
    text: 'flex flex-col justify-center max-w-56 md:max-w-96 lg:max-w-[800px]'
  }
}
</script>

<style>


</style>