import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref({
    _id: '',
    avatar: '',
    email: '',
    firstName: '',
    lastName: ''
  } as User)
  function login(data: User) {
    user.value = data
  }

  return { user, login }
})
