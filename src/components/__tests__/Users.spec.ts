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
  it.only('renders the component correctly', async () => {
    const wrapper = mount(UsersView)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toContain('Dashboard')
  })
})
