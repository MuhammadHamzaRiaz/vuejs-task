<script setup lang="ts">
import SideBarNavigation from '@/components/SideBarNavigation.vue'
import TopNavBar from '@/components/TopNavBar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import IconPencil from '@/components/icons/IconPencil.vue'
import IconBin from '@/components/icons/IconBin.vue'
import IconInfo from '@/components/icons/IconInfo.vue'
import IconEye from '@/components/icons/IconEye.vue'
import UserDialog from '@/components/Dialog/AddUserDialog.vue'
import { getUsers } from '@/apis/services/users'
import { addUser } from '@/apis/services/users/addUser'
import { updateUser } from '@/apis/services/users/updateUser'
import { deleteUser } from '@/apis/services/users'
import type { AddUserPayload, User } from '@/types'
import { useToast } from 'vue-toastification'

const users = ref<User[]>([])
const page = ref(1)
const totalUsersCount = ref(0)
const totalPage = ref(0)
const router = useRouter()
const userAddingLoader = ref(false)
const userUpdateLoader = ref(false)
const userForUpdate = ref({})

const editUser = (user: User) => {
  userForUpdate.value = user
  editUserDialog.value = true
}
const viewUser = async (user: User) => {
  router.push({
    name: 'User',
    params: { id: user._id }
  })
}
const deleteUserHandler = async (user: User) => {
  try {
    const res = await deleteUser(user)
    toast.success('User deleted successfully')
    console.log('res', res)
  } catch (error) {
    console.log('error', error)
    toast.error('Failed to delete user')
  } finally {
    getUsersHandler()
  }
}
const toast = useToast()
const addUserHandler = async (value: AddUserPayload) => {
  try {
    userAddingLoader.value = true
    const res = await addUser(value)
    getUsersHandler()
    toast.success('User added successfully')
    console.log('res', res)
  } catch (err) {
    console.log('err', err)
    toast.error('Failed to add user')
  } finally {
    userAddingLoader.value = false
    addUserDialog.value = false
  }
}
const closeAddUserDialog = () => {
  addUserDialog.value = false
}
const closeUpdateUserDialog = () => {
  editUserDialog.value = false
}
const updateUserHandler = async (user: User) => {
  try {
    userUpdateLoader.value = true
    const res = await updateUser(user)
    getUsersHandler()
    toast.success('User updated successfully')
    console.log('user', res)
  } catch (err) {
    console.log('err', err)
    toast.error('Failed to update user')
  } finally {
    userUpdateLoader.value = false
    editUserDialog.value = false
  }
}
const tableLoader = ref(false)
const getUsersHandler = async () => {
  try {
    tableLoader.value = true
    const res: any = await getUsers({
      page: page.value,
      per_page: 10
    })
    users.value = res.data
    totalUsersCount.value = res.total
    totalPage.value = res.total_pages
    console.log('res', res)
  } catch (error) {
    console.log('error', error)
  } finally {
    tableLoader.value = false
  }
}

const tableHeader = [
  { title: 'Id.', key: '_id' },
  {
    title: 'Name',
    key: 'firstName',
    value: (item: User) => `${item.firstName} ${item.lastName}`
  },
  { title: 'Image', key: 'avatar' },
  { title: 'Email', key: 'email' },
  { title: 'Actions', key: 'actions', sortable: false }
]
onMounted(() => {
  getUsersHandler()
})

const addUserDialog = ref(false)
const editUserDialog = ref(false)
</script>
<template>
  <v-layout>
    <SideBarNavigation />
    <div class="w-full">
      <TopNavBar />
      <main class="p-3 bg-[#0000001c]">
        <v-card
          elevation="0"
          class="!border-gray-300 h-[calc(100vh-82px)] bg-white"
          rounded="lg"
          variant="outlined"
        >
          <UserDialog
            :dialog="addUserDialog"
            @adduser="addUserHandler"
            :addingLoading="userAddingLoader"
            @close="closeAddUserDialog"
            type="add"
          />
          <UserDialog
            :dialog="editUserDialog"
            @adduser="updateUserHandler"
            :addingLoading="userUpdateLoader"
            @close="closeUpdateUserDialog"
            :editData="userForUpdate"
            type="edit"
          />
          <v-card-title class="border-b">Users</v-card-title>
          <v-card-text class="pt-4">
            <v-data-table
              :headers="tableHeader"
              :items="users"
              :loading="tableLoader"
              elevation="0"
              class="main__table"
            >
              <template v-slot:top>
                <div class="flex items-center justify-between relative p-3">
                  <div class="flex gap-1 text-base font-medium items-center">
                    User List
                    <IconInfo />
                  </div>
                  <v-btn
                    color="#7F56D9"
                    elevation="0"
                    density="default"
                    rounded="lg"
                    @click="addUserDialog = true"
                  >
                    Add new user
                  </v-btn>
                </div>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn icon @click="editUser(item)" size="small" elevation="0" rounded="lg">
                  <IconPencil />
                </v-btn>
                <v-btn
                  icon
                  @click="deleteUserHandler(item)"
                  size="small"
                  elevation="0"
                  rounded="lg"
                >
                  <IconBin />
                </v-btn>
                <v-btn icon @click="viewUser(item)" size="small" elevation="0" rounded="lg">
                  <IconEye />
                </v-btn>
              </template>
              <template v-slot:[`item.avatar`]="{ item }">
                <v-avatar size="small">
                  <v-img :src="item.avatar" alt="avatar" />
                </v-avatar>
              </template>

              <template v-slot:[`bottom`]>
                <v-pagination
                  v-model="page"
                  :length="totalPage"
                  next-icon="mdi-menu-right"
                  prev-icon="mdi-menu-left"
                  @update:model-value="getUsersHandler"
                ></v-pagination>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </main>
    </div>
  </v-layout>
</template>

<style scoped lang="scss">
.main__table {
  border: 1px solid #dce9f1;
  border-radius: 10px;
  height: calc(100vh - 164px);

  &:deep(.v-table__wrapper) {
    border-radius: 0 !important;
    &::-webkit-scrollbar {
      width: 0px;
    }
  }
  &:deep(thead > tr) {
    background-color: #dce9f1;
  }
}
</style>
