<template>
  <div class="py-24">
    <h1>Top Tracks</h1>
    <div class="content-center grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
      <div class="flex justify-center" v-for="track in podiumTracks" :key="track.rank">
        <RankedTrack size="l" :rank="track.rank" :cover="track.cover" :name="track.name" :artist="track.artist"></RankedTrack>
      </div>
    </div>
    <div class="mt-28 space-y-8">
        <RankedTrack v-for="track in otherTracks" size="m" text-position="right" :rank="track.rank" :cover="track.cover" :name="track.name" :artist="track.artist"></RankedTrack>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FastAverageColor } from 'fast-average-color';

const topTracks = ref([
  { rank: 1, cover: 'https://i.scdn.co/image/ab67616d0000b273914a47c2fae7a4b4893eb34d', name: '243 km/h', artist: 'Theodora' },
  { rank: 2, cover: 'https://i.scdn.co/image/ab67616d0000b2737fc4fb3453f841652d2e4814', name: 'SAFE PLACE', artist: 'Leon Thomas' },
  { rank: 3, cover: 'https://i.scdn.co/image/ab67616d0000b273bd5d937814595eeb925ab03f', name: 'Room Of Fools', artist: 'FKA twigs' },
  { rank: 4, cover: 'https://i.scdn.co/image/ab67616d0000b273154ca84963daafb7ecacafd0', name: 'LES SNITCH ET LES BITCH', artist: 'La Fève' },
  { rank: 5, cover: 'https://i.scdn.co/image/ab67616d0000b273124e9249fada4ff3c3a0739c', name: 'St. Chroma (feat. Daniel Caesar)', artist: 'Tyler, The Creator' },
  { rank: 6, cover: 'https://i.scdn.co/image/ab67616d0000b273ed9de13afd41c3377cf330b9', name: 'F U 2x', artist: 'Lil Baby' },
  { rank: 7, cover: 'https://i.scdn.co/image/ab67616d0000b273c800e1a4a237cf8f085183c5', name: 'BROTHER STONE', artist: 'Don Toliver' },
  { rank: 8, cover: 'https://i.scdn.co/image/ab67616d0000b273eec86e7486c62cfe7816423c', name: '17 TEUDY', artist: 'J9ueve' },
])

const podiumTracks = computed(() => {
  // return the first 3 tracks organized like a podium (2nd, 1st, 3rd)
  return [
    topTracks.value[1],
    topTracks.value[0],
    topTracks.value[2]
  ]
})
const otherTracks = computed(() => topTracks.value.slice(3))

const firstTrackAvgColor = ref<string | null>(null)

useHead({
    bodyAttrs: {
      style: () => (`background: linear-gradient(to bottom left, #171717, ${firstTrackAvgColor.value});`)
    }
})

onMounted(async () => {
  const rank1 = topTracks.value.find(track => track.rank === 1)
  if (rank1) {
    const fac = new FastAverageColor();

    fac.getColorAsync(rank1.cover)
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