<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
</script>

<template>
  <main class="flex bg-[#0000001c] justify-center">
    <LoginForm />
    <div class="flex justify-end items-center flex-1">
      <img
        src="../assets/images/dashboard.webp"
        alt="Image"
        class="!rounded-l-xl max-w-[900px] blur-[2px]"
      />
    </div>
  </main>
</template>
