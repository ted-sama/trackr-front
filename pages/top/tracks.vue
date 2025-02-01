<template>
  <div class="py-24">
    <h1>Top Tracks</h1>
    <div class="content-center grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
      <div class="flex justify-center" v-for="track in topTracks" :key="track.rank">
        <RankedTrack :rank="track.rank" :cover="track.cover" :name="track.name" :artist="track.artist"></RankedTrack>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const topTracks = ref([
  { rank: 1, cover: 'https://i.scdn.co/image/ab67616d0000b2737fc4fb3453f841652d2e4814', name: 'SAFE PLACE', artist: 'Leon Thomas' },
  { rank: 2, cover: 'https://i.scdn.co/image/ab67616d0000b2737a72f153d8a822db9fb22671', name: 'Spanish Guitar', artist: 'Lancey Foux, Fimiguerrero' },
  { rank: 3, cover: 'https://i.scdn.co/image/ab67616d0000b273bd5d937814595eeb925ab03f', name: 'Room Of Fools', artist: 'FKA twigs' }
])


</script>

<style>

</style>