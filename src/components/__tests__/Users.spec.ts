import { mount } from '@vue/test-utils'
import UsersView from '@/views/UsersView.vue'
import { expect, describe, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
const pinia = createPinia()
vi.mock('@vue/apis/services/users', () => {
  const getUsers = vi.fn().mockImplementation(async () =>
    Promise.resolve({
      data: [
        { name: 'User 1', id: 1 },
        { name: 'User 2', id: 2 }
      ],
      total: 2,
      total_pages: 1
    })
  )
  return getUsers
})
describe('UsersView', () => {
  setActivePinia(pinia)
  it('renders the component correctly', async () => {
    const wrapper = mount(UsersView)
    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toContain('Dashboard')
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
    const tableItems = table.findAll('tr')
    console.log(tableItems)
    expect(tableItems).toHaveLength(users.length)
  })
})
