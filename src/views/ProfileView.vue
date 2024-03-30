<script setup>
import SideBarNavigation from '@/components/SideBarNavigation.vue'
import TopNavBar from '@/components/TopNavBar.vue'
import { useAuthStore } from '@/store/auth'
import UserProfileCard from '@/components/UserProfileCard.vue'

const { user } = useAuthStore()
</script>
<template>
  <v-layout>
    <SideBarNavigation />
    <div class="w-full">
      <TopNavBar />
      <main class="p-4 flex justify-center bg-[#0000001c] h-[calc(100vh-56px)]">
        <UserProfileCard :user="user" goBackRoute="/users" />
      </main>
    </div>
  </v-layout>
</template>
