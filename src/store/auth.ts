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
  async function logout() {
    // add fake delay with promise timeout
    await new Promise((resolve) => {
      user.value = {
        _id: '',
        avatar: '',
        email: '',
        firstName: '',
        lastName: ''
      }
      return setTimeout(() => resolve(true), 1000)
    })
  }

  return { user, login, logout }
})
