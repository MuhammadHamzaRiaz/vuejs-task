<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SideBarNavigation from '@/components/SideBarNavigation.vue'
import TopNavBar from '@/components/TopNavBar.vue'
import UserProfileCard from '@/components/UserProfileCard.vue'
import { getUser } from '@/apis/services/users/user'

const user = ref({
  firstName: '',
  lastName: '',
  email: '',
  avatar: ''
})
const route = useRoute()
onMounted(() => {
  fetchUser()
})
const fetchUser = async () => {
  try {
    const id = route.params.id
    const res = await getUser(id)
    console.log('res', res)
    user.value = res.data
  } catch (error) {
    console.log('error', error)
  }
}
</script>
<template>
  <v-layout>
    <SideBarNavigation />
    <div class="w-full">
      <TopNavBar />
      <main class="p-4 flex justify-center bg-[#0000001c] h-[calc(100vh-56px)]">
        <UserProfileCard :user="user" :goBackRoute="'/users'" />
      </main>
    </div>
  </v-layout>
</template>
