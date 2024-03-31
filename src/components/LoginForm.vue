<script setup lang="ts">
import { ref } from 'vue'
import { userLogin } from '@/apis/services/auth/login'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import CustomButton from '@/components/Buttons/CustomButton.vue'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const valid = ref(false)
const toast = useToast()
const loginLoader = ref(false)
const passwordRules = [
  (value: string) => {
    if (value.length >= 8) return true
    return 'Password must be at least 8 characters long.'
  }
]
const emailRules = [
  (value: string) => {
    if (/^[a-zA-Z0-9.-]+@[a-zA-Z.-]+\.[a-z]+$/.test(value)) return true
    return 'Please enter a valid email address.'
  }
]
const submitForm = async ({ email, password }: any) => {
  try {
    loginLoader.value = true
    if (valid.value) {
      const { data }: any = await userLogin({
        email,
        password
      })
      if (data.status == 'success') {
        authStore.login(data.user)
        toast.success('Logged in successfully')
        router.push('/users')
      } else {
        toast.error('Login failed')
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    loginLoader.value = false
  }
}
</script>

<template>
  <v-form v-model="valid" @submit.prevent="submitForm({ email, password })">
    <v-container class="h-screen bg-[#0000000d] backdrop-blur-2xl">
      <v-row class="w-[580px] justify-center mx-auto items-center px-10 pt-32">
        <img src="@/assets/images/logo.webp" alt="logo" class="mb-10 invert" />
        <h1 class="text-3xl font-semibold text-[rgba(16,_24,_40,_1)] mb-2">
          Log in to your account
        </h1>
        <h3 class="text-md font-base text-[rgba(71,_84,_103,_1)] mb-2">
          Welcome back! Please enter your details.
        </h3>
        <v-col cols="12" class="pa-0">
          <label for="email" class="text-sm mb-1">Email</label>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            name="email"
            required
            id="email"
            variant="outlined"
            placeholder="Enter your email address"
            density="comfortable"
            rounded="lg"
            type="email"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="pa-0">
          <label for="password" class="text-sm mb-1">Password</label>
          <v-text-field
            v-model="password"
            name="password"
            id="password"
            :rules="passwordRules"
            required
            variant="outlined"
            placeholder="Enter your password"
            type="password"
            density="comfortable"
            rounded="lg"
          ></v-text-field>
        </v-col>
        <div class="w-full flex flex-col items-end gap-2">
          <v-btn
            variant="text"
            class="!p-0"
            :ripple="false"
            color="#7F56D9"
            size="small"
            elevation="0"
            density="default"
            >Forgot password</v-btn
          >
          <CustomButton
            text="login"
            color="#7F56D9"
            :button-loader="loginLoader"
            id="login"
            :block="true"
            size="large"
            type="submit"
          />
        </div>
      </v-row>
    </v-container>
  </v-form>
</template>
