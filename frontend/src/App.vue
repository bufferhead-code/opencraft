<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header class="border-b border-gray-300 py-4 px-4 fixed z-20 w-full bg-white shadow-sm">
    <div class="flex w-full px-4 mx-auto justify-between items-center">
      <div class="flex items-center space-x-3">
        <div class="border-2 border-gray-200 shadow-sm px-2.5 rounded-lg py-1 text-gray-500 text-xl font-semibold">
          <span
              class="text-sky-400">Open</span>Craft
        </div>
      </div>
      <nav class="flex space-x-5">
        <RouterLink class="text-gray-500 transition hover:text-gray-600 font-semibold" to="/">Home</RouterLink>
        <RouterLink class="text-gray-500 transition hover:text-gray-600 font-semibold" to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <div class="bg-gray-50 min-h-screen pt-24 px-4">
    <div class="">
      <RouterView/>
    </div>
  </div>

</template>

<style scoped>

</style>
