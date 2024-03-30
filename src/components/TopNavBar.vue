<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()
const { user } = authStore
const name = computed(() => {
  return `${user?.firstName} ${user?.lastName}`
})
const openProfileHandler = () => {
  router.push('/profile')
}
</script>

<template>
  <div class="flex justify-between w-full h-14 items-center border-b px-4">
    <h1 class="text-xl font-semibold">Dashboard</h1>
    <div>
      <v-btn
        ripple
        @click="openProfileHandler"
        variant="outlined"
        rounded="lg"
        size="large"
        color="#7F56D9"
      >
        <v-avatar size="small" class="mr-2">
          <v-img v-if="user" alt="Avatar" :src="user.avatar"></v-img>
        </v-avatar>
        {{ name }}
      </v-btn>
    </div>
  </div>
</template>
