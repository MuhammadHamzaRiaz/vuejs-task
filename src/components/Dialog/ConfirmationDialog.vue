<script setup lang="ts">
import CustomButton from '@/components/Buttons/CustomButton.vue'
import { computed } from 'vue'
const props = defineProps({
  openDialog: Boolean,
  buttonLoading: Boolean
})
const emit = defineEmits(['handleDialog', 'deleteUser'])
const dialog = computed({
  get: () => {
    return props.openDialog
  },
  set: (val: Boolean) => {
    emit('handleDialog', val)
  }
})
</script>
<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card class="!rounded-[14px]">
      <v-card-title class="text-h6 text-primary !font-medium border-b">Confirmation </v-card-title>
      <v-card-text> Are you sure you want to delete this user? </v-card-text>
      <v-card-actions class="justify-end !p-4 border-t">
        <v-btn
          @click="emit('handleDialog', false)"
          color="#7F56D9"
          elevation="0"
          variant="text"
          rounded="lg"
          >No
        </v-btn>

        <CustomButton
          text="Yes"
          color="error"
          :block="false"
          :button-loader="buttonLoading"
          @on-click="emit('deleteUser')"
        ></CustomButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
