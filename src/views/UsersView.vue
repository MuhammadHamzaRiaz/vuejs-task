<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserDialog from '@/components/Dialog/AddUserDialog.vue'
import { getUsers } from '@/apis/services/users'
import { addUser } from '@/apis/services/users/addUser'
import { updateUser } from '@/apis/services/users/updateUser'
import { deleteUser } from '@/apis/services/users'
import type { AddUserPayload, User } from '@/types'
import { useToast } from 'vue-toastification'
import CustomTable from '@/components/Tables/CustomTable.vue'
import CustomButton from '@/components/Buttons/CustomButton.vue'
import ConfirmationDialog from '@/components/Dialog/ConfirmationDialog.vue'

const router = useRouter()
const toast = useToast()

// here we are using users state and method
const users = ref<User[]>([])
const getUsersHandler = async () => {
  try {
    tableLoader.value = true
    const res: any = await getUsers({
      page: page.value,
      per_page: per_page.value
    })
    // we can also store the users in store if need users for any other components
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
//  here we are managing pagination state and logic
const page = ref(1)
const per_page = ref(10)
const totalPage = ref(0) // refering how much total pages we have in DB
const totalUsersCount = ref(0) // refering how much total users we have in DB
const changePagination = (val: number) => {
  page.value = val
  getUsersHandler()
}

// the state and  logic of adding user
const userAddingLoader = ref(false)
const closeAddUserDialog = () => {
  addUserDialog.value = false
}
const userForAdd = ref({
  first_name: '',
  last_name: '',
  email: ''
})
const addUserDialog = ref(false)
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
    userForAdd.value = {
      first_name: '',
      last_name: '',
      email: ''
    }
  }
}
//  update user
const userForUpdate = ref({})
const userUpdateLoader = ref(false)
const editUserDialog = ref(false)
const editUser = (user: User) => {
  userForUpdate.value = user
  editUserDialog.value = true
}
const closeUpdateUserDialog = () => {
  editUserDialog.value = false
  userForUpdate.value = {}
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

// here we are defining table header
const tableHeader = ref([
  { title: 'Id.', key: '_id' },
  {
    title: 'Name',
    key: 'firstName',
    value: (item: User) => `${item.firstName} ${item.lastName}`
  },
  { title: 'Image', key: 'avatar' },
  { title: 'Email', key: 'email' },
  { title: 'Actions', key: 'actions', sortable: false }
])
//  table loader while fetching data
const tableLoader = ref(false)

const viewUser = async (user: User) => {
  router.push({
    name: 'User',
    params: { id: user._id }
  })
}
// delete user
const deleteDialog = ref<Boolean>(false)
const deleteUserLoading = ref(false)
const userToDelete = ref()
const deleteUserConfiramtion = (item: User) => {
  userToDelete.value = item
  deleteDialog.value = true
}
const onDialogClose = (val: Boolean) => {
  deleteDialog.value = val
}
const onDeleteConfirmation = () => {
  deleteUserHandler(userToDelete.value)
  onDialogClose(false)
}
const deleteUserHandler = async (user: User) => {
  try {
    deleteUserLoading.value = true
    const res = await deleteUser(user)
    toast.success('User deleted successfully')
    console.log('res', res)
  } catch (error) {
    console.log('error', error)
    toast.error('Failed to delete user')
  } finally {
    deleteUserLoading.value = false
    await getUsersHandler()
  }
}

onMounted(() => {
  // fetching users
  getUsersHandler()
})
</script>
<template>
  <v-card
    elevation="0"
    class="!border-gray-300 h-[calc(100vh-82px)] bg-white w-full m-3"
    rounded="lg"
    variant="outlined"
  >
    <UserDialog
      :dialog="addUserDialog"
      @adduser="addUserHandler"
      :addingLoading="userAddingLoader"
      @close="closeAddUserDialog"
      :dataBy="userForAdd"
      type="add"
    />
    <UserDialog
      :dialog="editUserDialog"
      @adduser="updateUserHandler"
      :addingLoading="userUpdateLoader"
      @close="closeUpdateUserDialog"
      :dataBy="userForUpdate"
      type="edit"
    />
    <ConfirmationDialog
      :openDialog="deleteDialog.valueOf()"
      @handleDialog="onDialogClose"
      @deleteUser="onDeleteConfirmation"
      :button-loading="deleteUserLoading"
    />
    <v-card-title class="border-b">Users</v-card-title>
    <v-card-text class="pt-4">
      <CustomTable
        :tableHeader="tableHeader"
        :dataArray="users"
        :tableLoader="tableLoader"
        @editUser="editUser"
        @deleteUserHandler="deleteUserConfiramtion"
        @viewUser="viewUser"
        :totalPage="totalPage"
        :page="page"
        @changePagination="changePagination"
      >
        <template v-slot:table-top>
          <div class="flex items-center justify-between relative p-3">
            <div class="flex gap-1 text-base font-medium items-center">User List</div>
            <CustomButton
              text="add new user"
              size="default"
              color="#7F56D9"
              @on-click="addUserDialog = true"
              :block="false"
            />
          </div>
        </template>
      </CustomTable>
    </v-card-text>
  </v-card>
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
