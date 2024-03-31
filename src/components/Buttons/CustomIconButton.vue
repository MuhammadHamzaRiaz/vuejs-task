<script setup lang="ts">
const emit = defineEmits(['onClick'])
const onClickHandler = () => {
  emit('onClick')
}
</script>

<template>
  <v-btn icon @click="onClickHandler" size="small" elevation="0" rounded="lg">
    <slot></slot>
  </v-btn>
</template>
