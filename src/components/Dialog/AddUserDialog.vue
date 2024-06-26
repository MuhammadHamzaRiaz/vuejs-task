<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import type { AddUserPayload } from '@/types'
import CustomButton from '../Buttons/CustomButton.vue'

const props = defineProps({
  dialog: Boolean,
  addingLoading: Boolean,
  dataBy: {
    type: Object,
    required: false
  },
  type: {
    type: String,
    required: true
  }
})
const data = ref<AddUserPayload>({
  first_name: '',
  last_name: '',
  email: ''
})
const valid = ref(false)
const emit = defineEmits(['close', 'adduser'])
const dialog = computed(() => props.dialog)

const addUser = () => {
  if (valid.value) {
    if (props.type === 'edit') {
      emit('adduser', {
        ...props.dataBy,
        firstName: data.value.first_name,
        lastName: data.value.last_name,
      })
    } else {
      emit('adduser', data.value)
    }
  }
}
const handleDialogClose = () => {
  emit('close')
  data.value = {
    first_name: '',
    last_name: '',
    email: ''
  }
}
const required = [(v: string) => !!v || 'This field is required']
const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => (/.+@.+\..+/.test(v) ? true : 'Please enter a valid email address')
]
watchEffect(() => {
  if (props.dataBy) {
    data.value = {
      first_name: props.dataBy.firstName,
      last_name: props.dataBy.lastName,
      email: props.dataBy.email
    }
  }
})
</script>

<template>
  <v-dialog v-model="dialog" max-width="500" persistent v-if="dialog">
    <v-card class="!rounded-[14px]">
      <v-card-title class="text-h6 text-primary !font-medium border-b"
        >{{ type == 'edit' ? 'Update' : 'Add' }} User</v-card-title
      >
      <v-form v-model="valid" @submit.prevent="addUser">
        <v-card-text class="pb-0">
          <v-col cols="12" class="pa-0">
            <label class="text-sm mb-1">First Name*</label>
            <v-text-field
              v-model="data.first_name"
              :rules="required"
              required
              variant="outlined"
              placeholder="Enter your first name"
              density="comfortable"
              rounded="lg"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pa-0">
            <label class="text-sm mb-1">Last Name*</label>
            <v-text-field
              v-model="data.last_name"
              :rules="required"
              required
              variant="outlined"
              placeholder="Enter your last name"
              density="comfortable"
              rounded="lg"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pa-0">
            <label class="text-sm mb-1">Email*</label>
            <!--  disable email field in edit mode -->
            <v-text-field
              v-model="data.email"
              :rules="emailRules"
              required
              variant="outlined"
              :disabled="type == 'edit'"
              placeholder="Enter your email address"
              density="comfortable"
              rounded="lg"
            ></v-text-field>
          </v-col>
        </v-card-text>
        <v-card-actions class="justify-end !p-4 border-t">
          <v-btn
            @click="handleDialogClose"
            color="#7F56D9"
            elevation="0"
            variant="text"
            rounded="lg"
            >Close</v-btn
          >

          <CustomButton
            :text="type == 'edit' ? 'Update' : 'Add'"
            color="#7F56D9"
            :button-loader="addingLoading"
            :block="false"
            type="submit"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
