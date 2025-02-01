<template>
  <div>
    <a :href="`${config.authEndpoint}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&response_type=${config.responseType}`">Login to Spotify</a>
  </div>
</template>

<script lang="ts" setup>
// config runtime variables
const config = useRuntimeConfig()

</script>

<style>

</style>