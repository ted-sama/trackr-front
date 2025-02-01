<template>
  <div :class="`flex ${textPositionClasses[textPosition].container}`">
    <div :class="`flex relative ${imageContainer}`">
      <img :src="cover" alt="Album cover" :class="`${imageSize} rounded-lg border-solid border border-neutral-500/15`">
      <span :class="`${rankSize} font-bold absolute bottom-0 right-0 cursor-default`" style="-webkit-text-stroke: 1px rgb(115 115 115 / 0.15);">{{ rank }}</span>
    </div>
    <div :class="`${textPositionClasses[textPosition].text}`">
      <h2 class="text-2xl font-bold">{{ name }}</h2>
      <p class="text-lg">{{ artist }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  size: {
    type: String,
    default: 'm',
    validator: (value: string) => ['m', 'l'].includes(value)
  },
  rank: {
    type: Number,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  textPosition: {
    type: String,
    default: 'bottom',
    validator: (value: string) => ['bottom', 'right'].includes(value)
  }
})

// use computed to change size of the image based on size prop
const imageContainer = computed(() => {
  if (props.size === 'm') {
    return 'w-36 h-36'
  } else if (props.size === 'l') {
    return 'w-60 h-60'
  }
})

const imageSize = computed(() => {
  if (props.size === 'm') {
    return 'w-32 h-32'
  } else if (props.size === 'l') {
    return 'w-52 h-52'
  }
})

const rankSize = computed(() => {
  if (props.size === 'm') {
    return 'text-6xl'
  } else if (props.size === 'l') {
    return 'text-8xl'
  }
})

const textPositionClasses: any = {
  bottom: {
    container: 'flex-col',
    text: 'mt-4'
  },
  right: {
    container: 'flex-row',
    text: 'ml-4 flex flex-col justify-center'
  }
}
</script>

<style>

</style>