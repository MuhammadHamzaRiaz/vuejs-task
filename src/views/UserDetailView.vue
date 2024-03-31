<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import UserProfileCard from '@/components/UserProfileCard.vue'
import { getUser } from '@/apis/services/users/user'
const route = useRoute()

const user = ref({
  firstName: '',
  lastName: '',
  email: '',
  avatar: ''
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
onMounted(() => {
  fetchUser()
})
</script>
<template>
  <div class="h-[calc(100vh-56px)]">
    <UserProfileCard :user="user" :goBackRoute="'/users'" />
  </div>
</template>
