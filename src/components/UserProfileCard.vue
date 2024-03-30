<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { User } from '@/types'
const router = useRouter()
const { user, goBackRoute } = defineProps({
  user: {
    type: Object as () => User,
    required: true
  },
  goBackRoute: {
    type: String,
    required: true
  }
})
const goBack = () => {
  router.push(goBackRoute)
}
</script>
<template>
  <v-card class="!bg-[#ffffff40] !backdrop-blur-2xl !rounded-xl w-[480px] mt-10 !p-4" elevation="0">
    <v-card-title class="!justify-center !flex">
      <v-avatar size="200">
        <v-img :src="user.avatar" alt="avatar" />
      </v-avatar>
    </v-card-title>
    <v-card-text class="flex items-center py-3 flex-col gap-4">
      <div
        class="bg-[#a9cfff61] text-center text-black p-1 w-20 rounded-lg text-sm font-medium uppercase"
      >
        User
      </div>
      <h1 class="text-xl font-medium">{{ user.firstName }} {{ user.lastName }}</h1>
      <p class="text-sm">{{ user.email }}</p>
    </v-card-text>
    <v-card-actions class="flex justify-center">
      <v-btn
        class="!w-full"
        @click="goBack"
        color="#7F56D9"
        elevation="0"
        density="default"
        rounded="lg"
        >Back</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
