import { mount } from '@vue/test-utils'
import UsersView from '@/views/UsersView.vue'
import { expect, describe, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
const pinia = createPinia()
describe('UsersView', () => {
  setActivePinia(pinia)
  it('renders the component correctly', async () => {
    const wrapper = mount(UsersView)
    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
  })
  it('should fetch users', async () => {
    const wrapper = mount(UsersView)
    await wrapper.vm.$nextTick()
    const instance = wrapper.vm
    const getUsersM = (instance as any).getUsersHandler
    await getUsersM()
    const users = (instance as any).users
    expect(users).toHaveLength(10)
  })
  it('should fetch users as per page', async () => {
    const wrapper = mount(UsersView)
    await wrapper.vm.$nextTick()
    const instance = wrapper.vm
    const getUsersM = (instance as any).getUsersHandler
    const perPage = ((instance as any).per_page = 3)
    await getUsersM()
    const users = (instance as any).users
    expect(users).toHaveLength(3)
  })
  it('should render table with users', async () => {
    const wrapper = mount(UsersView)
    await wrapper.vm.$nextTick()
    const instance = wrapper.vm
    const getUsersM = (instance as any).getUsersHandler
    await getUsersM()
    const users = (instance as any).users
    const table = wrapper.find('.main__table')
    expect(table.exists()).toBe(true)
  })
  it('should delete user', async () => {
    const wrapper = mount(UsersView)
    await wrapper.vm.$nextTick()
    const instance = wrapper.vm
    const getUsersM = (instance as any).getUsersHandler
    await getUsersM()
    const totalUserCountsAfterDataFetch = (instance as any).totalUsersCount
    expect(totalUserCountsAfterDataFetch).toBe(100)
    const users = (instance as any).users
    const deleteUserM = (instance as any).deleteUserHandler
    await deleteUserM(users[0])
    const totalUserCountsAfterDelete = (instance as any).totalUsersCount
    expect(totalUserCountsAfterDelete).toBe(99)
  })
})
