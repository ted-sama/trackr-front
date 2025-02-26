<template>
  <div class="py-24">
    <h1 class="text-5xl font-bold">Top Tracks</h1>
    <div class="flex gap-4 mt-8">
      <Button v-for ="option in timeRangeOptions" :key="option.value" @click="fetchTracks(option.value)" :disabled="option.value === timeRange" :class="{ 'bg-green-500': timeRange === option.value }">
        {{ option.label }}
      </Button>
    </div>
    
    <!-- Skeleton loading state -->
    <div v-if="isLoading">
      <div class="content-center hidden md:grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="index in 3"
          :key="`skeleton-top-${index}`"
          class="flex justify-center fade-in-track"
          :style="`animation-delay: ${index * 100}ms`"
        >
          <SkeletonTrack
            size="l"
            :rank="index"
          ></SkeletonTrack>
        </div>
      </div>
      <div class="mt-28 space-y-5">
        <SkeletonTrack
          v-for="index in 5"
          :key="`skeleton-mobile-${index}`"
          size="m"
          text-position="right"
          :rank="index"
          class="flex md:hidden fade-in-track"
          :style="`animation-delay: ${index * 100}ms`"
        ></SkeletonTrack>
        <SkeletonTrack
          v-for="index in 5"
          :key="`skeleton-rest-${index}`"
          size="m"
          text-position="right"
          :rank="index + 3"
          class="hidden md:flex fade-in-track"
          :style="`animation-delay: ${(index + 3) * 100}ms`"
        ></SkeletonTrack>
      </div>
    </div>
    
    <!-- Actual tracks display -->
    <div v-else>
      <div
        class="content-center hidden md:grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="(track, index) in trackResponse?.items.slice(0, 3)"
          :key="index"
          class="flex justify-center fade-in-track"
          :style="`animation-delay: ${index * 100}ms`"
        >
          <RankedTrack
            size="l"
            :rank="index + 1"
            :cover="track.album.images[0].url"
            :spotify-url="track.external_urls.spotify"
            :name="track.name"
            :artists="track.artists"
          ></RankedTrack>
        </div>
      </div>
      <div class="mt-28 space-y-5">
        <RankedTrack
          v-for="(track, index) in trackResponse?.items"
          size="m"
          text-position="right"
          :rank="index + 1"
          :cover="track.album.images[0].url"
          :spotify-url="track.external_urls.spotify"
          :name="track.name"
          :artists="track.artists"
          class="flex md:hidden fade-in-track"
          :style="`animation-delay: ${index * 100}ms`"
        ></RankedTrack>
        <RankedTrack
          v-for="(track, index) in trackResponse?.items.slice(3)"
          size="m"
          text-position="right"
          :rank="index + 4"
          :cover="track.album.images[0].url"
          :spotify-url="track.external_urls.spotify"
          :name="track.name"
          :artists="track.artists"
          class="hidden md:flex fade-in-track"
          :style="`animation-delay: ${(index + 3) * 100}ms`"
        ></RankedTrack>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FastAverageColor } from "fast-average-color";
import type { TrackResponse } from "@/types/spotify";

const route = useRoute();
const timeRange = ref(route.query.time_range || "short_term");
const isLoading = ref(false);

const timeRangeOptions = [
  { value: "short_term", label: "Last 4 weeks" },
  { value: "medium_term", label: "Last 6 months" },
  { value: "long_term", label: "All time" },
];

const headers = useRequestHeaders(["cookie"]);
const trackResponse = ref<TrackResponse | null>(null);

const firstTrackAvgColor = ref<string | null>(null);

const updateBackgroundColor = async () => {
  const rank1 = trackResponse.value?.items[0];
  if (rank1) {
    const fac = new FastAverageColor();

    fac
      .getColorAsync(rank1.album.images[0].url)
      .then((color) => {
        firstTrackAvgColor.value = color.hex;
        console.log("Average color", color);
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

const fetchTracks = async (range: string) => {
  timeRange.value = range;
  isLoading.value = true;
  try {
    const { data } = await useFetch<TrackResponse>(
      `http://localhost:3001/top-tracks?time_range=${range}`,
      { headers, credentials: "include" }
    );
    trackResponse.value = data.value;
    updateBackgroundColor();
  } catch (error) {
    console.error("Error fetching tracks:", error);
  } finally {
    isLoading.value = false;
  }
};

// Fetch initial data
await fetchTracks(timeRange.value as string);

useHead({
  bodyAttrs: {
    style: () =>
      `background: linear-gradient(to bottom left, ${firstTrackAvgColor.value}, #171717);`,
  },
});
</script>

<style>
.fade-in-track {
  opacity: 0;
  animation: fadeIn 0.6s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
