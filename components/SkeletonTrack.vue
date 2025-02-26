<template>
  <div :class="`flex ${textPositionClasses[textPosition].container}`">
    <div :class="`flex relative ${imageContainer}`">
      <div :class="`${imageSize} rounded-[6px] bg-neutral-800/50 animate-pulse`"></div>
      <span :class="`${rankSize} font-bold absolute bottom-0 right-0 text-neutral-800/50 animate-pulse`">{{ rank }}</span>
    </div>
    <div :class="`${textPositionClasses[textPosition].text}`">
      <div class="h-6 md:h-8 w-32 md:w-48 bg-neutral-800/50 rounded animate-pulse mb-2"></div>
      <div class="h-4 md:h-6 w-24 md:w-36 bg-neutral-800/50 rounded animate-pulse"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  size?: 'm' | 'l';
  textPosition?: 'bottom' | 'right';
  rank: number;
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