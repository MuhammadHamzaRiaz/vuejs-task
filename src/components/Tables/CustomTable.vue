<script setup lang="ts">
import { computed } from 'vue'
import IconPencil from '@/components/icons/IconPencil.vue'
import IconBin from '@/components/icons/IconBin.vue'
import IconEye from '@/components/icons/IconEye.vue'
import CustomIconButton from '@/components/Buttons/CustomIconButton.vue'

const props = defineProps({
  dataArray: Array,
  tableHeader: Array,
  tableLoader: Boolean,
  page: Number,
  totalPage: Number
})

// emit events
const emit = defineEmits(['editUser', 'deleteUserHandler', 'viewUser', 'changePagination'])

const reactivePage = computed({
  get: () => {
    return props.page
  },
  set: (val) => {
    emit('changePagination', val)
  }
})

const editUser = (item: any) => {
  emit('editUser', item)
}
const deleteUserHandler = (item: any) => {
  emit('deleteUserHandler', item)
}
const viewUser = (item: any) => {
  emit('viewUser', item)
}
const changePagination = (val: number) => {
  emit('changePagination', val)
}
</script>

<template>
  <v-data-table
    :headers="props.tableHeader as []"
    :items="props.dataArray as any"
    :loading="props.tableLoader"
    elevation="0"
    class="main__table"
  >
    <template v-slot:top>
      <!-- slot for top content of a table  -->
      <slot name="table-top"></slot>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <CustomIconButton @onClick="editUser(item)">
        <IconPencil />
      </CustomIconButton>
      <CustomIconButton @onClick="deleteUserHandler(item)">
        <IconBin />
      </CustomIconButton>
      <CustomIconButton @on-click="viewUser(item)">
        <template v-slot:default>
          <IconEye />
        </template>
      </CustomIconButton>
    </template>
    <template v-slot:[`item.avatar`]="{ item }">
      <v-avatar size="small">
        <v-img :src="(item as any).avatar" alt="avatar" />
      </v-avatar>
    </template>

    <template v-slot:[`bottom`]>
      <v-pagination
        v-model="reactivePage"
        :length="props.totalPage"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        @update:model-value="changePagination"
      ></v-pagination>
    </template>
  </v-data-table>
</template>
