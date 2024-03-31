<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-layout>
    <RouterView name="sideNav" />
    <div class="w-full">
      <RouterView name="topNav" />
      <main class="flex justify-center bg-[#0000001c]">
        <RouterView name="default" />
      </main>
    </div>
  </v-layout>
</template>
