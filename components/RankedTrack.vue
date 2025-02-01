<template>
  <div :class="`flex ${textPositionClasses[textPosition].container}`">
    <div class="flex relative w-60 h-60">
      <img :src="cover" alt="Album cover" class="w-52 h-52 rounded-lg border-solid border border-neutral-500/15">
      <span class="text-8xl font-bold absolute bottom-0 right-0 cursor-default">{{ rank }}</span>
    </div>
    <div :class="`${textPositionClasses[textPosition].text}`">
      <h2 class="text-2xl font-bold">{{ name }}</h2>
      <p class="text-lg">{{ artist }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
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

const emit = defineEmits(['updateBgColor'])

const textPositionClasses: any = {
  bottom: {
    container: 'flex-col',
    text: 'mt-4'
  },
  right: {
    container: 'flex-row',
    text: 'ml-4'
  }
}

onMounted(() => {
  if (props.rank === 1) {
    emit('updateBgColor', props.cover)
  }
})
</script>

<style>

</style>