<template>
  <div v-if="trackResponse" class="py-24">
    <h1>Top Tracks</h1>
    <div class="content-center grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="(track, index) in trackResponse?.items.slice(0, 3)" :key="index" class="hidden justify-center md:flex">
        <RankedTrack size="l" :rank="index + 1" :cover="track.album.images[0].url" :name="track.name" :artist="track.artists[0].name"></RankedTrack>
      </div>
    </div>
    <div class="mt-28 space-y-5">
      <RankedTrack v-for="(track, index) in trackResponse?.items" size="m" text-position="right" :rank="index + 1" :cover="track.album.images[0].url" :name="track.name" :artist="track.artists[0].name" class="flex md:hidden"></RankedTrack>
      <RankedTrack v-for="(track, index) in trackResponse?.items.slice(3)" size="m" text-position="right" :rank="index + 4" :cover="track.album.images[0].url" :name="track.name" :artist="track.artists[0].name" class="hidden md:flex"></RankedTrack>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FastAverageColor } from 'fast-average-color';
import type { TrackResponse } from '@/types/spotify';

const headers = useRequestHeaders(['cookie']) 
const { data: trackResponse } = await useFetch<TrackResponse>("http://localhost:3001/top-tracks", { headers, credentials: "include" });

const podiumTracks = computed(() => {
  // return the first 3 tracks organized like a podium (2nd, 1st, 3rd)
  return [
    trackResponse.value?.items[1],
    trackResponse.value?.items[0],
    trackResponse.value?.items[2]
  ]
})
const podiumTracksMobile = computed(() => {
  return [
    trackResponse.value?.items[0],
    trackResponse.value?.items[1],
    trackResponse.value?.items[2]
  ]
})
const otherTracks = computed(() => trackResponse.value?.items.slice(3))

const firstTrackAvgColor = ref<string | null>(null)

useHead({
    bodyAttrs: {
      style: () => (`background: linear-gradient(to bottom left, #171717, ${firstTrackAvgColor.value});`)
    }
})

onMounted(async () => {
  const rank1 = trackResponse.value?.items[0]
  if (rank1) {
    const fac = new FastAverageColor();

    fac.getColorAsync(rank1.album.images[0].url)
        .then(color => {
            firstTrackAvgColor.value = color.hex;
            console.log('Average color', color);
        })
        .catch(e => {
            console.log(e);
        });
  }
})
</script>

<style>

</style>