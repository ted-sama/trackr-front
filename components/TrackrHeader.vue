<template>
  <header class="pt-6">
    <div class="flex items-center relative justify-center">
      <h1 class="text-2xl font-bold absolute left-0">Trackr</h1>
      <div class="flex gap-4 place-items-center">
        <HeaderIcon tooltip="Top Tracks" to="/top/tracks" :is-active="$route.path === '/top/tracks'">
          <LucideAudioWaveform />
        </HeaderIcon>
        <HeaderIcon tooltip="Top Artists" to="/top/artists" :is-active="$route.path === '/top/artists'">
          <LucideMicVocal />
        </HeaderIcon>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { LucideAudioWaveform, LucideMicVocal } from 'lucide-vue-next';

</script>
