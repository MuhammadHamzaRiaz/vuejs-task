<script setup lang="ts">
const props = defineProps({
  color: String,
  text: String,
  block: Boolean,
  id: String,
  buttonLoader: Boolean,
  size: String,
  type: String
})
const emit = defineEmits(['onClick'])
const clickHandler = () => {
  emit('onClick')
}
</script>

<template>
  <v-btn
    :color="props.color"
    :block="props.block"
    variant="flat"
    elevation="0"
    density="default"
    :size="size"
    @click="clickHandler"
    :id="props.id"
    rounded="lg"
    :loading="buttonLoader"
    :type="type"
  >
    <!-- we only have text buttons now so we don't need to use slots here  -->
    {{ props.text }}
  </v-btn>
</template>
