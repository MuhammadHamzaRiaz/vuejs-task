<script setup lang="ts">
import { ref } from 'vue'
import IconUser from '@/components/icons/IconUser.vue'
import { useRouter } from 'vue-router'
import CustomButton from './Buttons/CustomButton.vue'
import { useAuthStore } from '@/store/auth'
const auth = useAuthStore()
const router = useRouter()
const logoutLoader = ref(false)
const logoutHandler = async () => {
  try {
    logoutLoader.value = true
    await auth.logout()
  } catch (error) {
    console.log(error)
  } finally {
    logoutLoader.value = false
    router.push('/login')
  }
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
        <CustomButton
          text="Logout"
          color="#7F56D9"
          @on-click="logoutHandler"
          id="logout"
          :button-loader="logoutLoader"
          :block="true"
          size="large"
        />
      </div>
    </template>
  </v-navigation-drawer>
</template>
