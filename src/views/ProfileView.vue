<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import UserProfileCard from '@/components/UserProfileCard.vue'

const { user } = useAuthStore()
</script>
<template>
  <div class="h-[calc(100vh-56px)]">
    <UserProfileCard :user="user" goBackRoute="/users" />
  </div>
</template>
