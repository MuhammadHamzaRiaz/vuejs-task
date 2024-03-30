<script setup lang="ts">
import IconUser from '@/components/icons/IconUser.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const logoutHandler = () => {
  router.push('/login')
}
</script>

<template>
  <v-navigation-drawer class="!min-w-80 !relative h-screen" permanent>
    <v-list class="px-2">
      <v-list-item class="mb-10">
        <img src="@/assets/images/logo.webp" alt="logo" class="invert" />
      </v-list-item>
      <v-list-item ripple link rounded="lg" title="Users" active>
        <template v-slot:prepend>
          <IconUser class="mr-4" />
        </template>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          class="!w-full"
          @click="logoutHandler"
          color="#7F56D9"
          elevation="0"
          density="default"
          rounded="lg"
          >Logout</v-btn
        >
      </div>
    </template>
  </v-navigation-drawer>
</template>
