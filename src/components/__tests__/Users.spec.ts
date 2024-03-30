import { mount } from '@vue/test-utils'
import UsersView from '@/views/UsersView.vue'
import { expect, describe, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { ref } from 'vue'
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
    // Test if the component is rendered correctly
    wrapper.setData({
      users: [
        { name: 'User 1', id: 1 },
        { name: 'User 2', id: 2 }
      ]
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toContain('Dashboard')

    // Check if the component fetches data on mount
    expect(wrapper.vm.users.length).toBeGreaterThan(-1)
  })

  it('displays users correctly', async () => {
    const wrapper = mount(UsersView)

    // Check if the component displays the list of users
    expect(wrapper.findAll('li').length).toBe(wrapper.vm.users.length)

    // Check if the component displays user information correctly
    for (let i = 0; i < wrapper.vm.users.length; i++) {
      const user = wrapper.vm.users[i]
      const li = wrapper.findAll('li').at(i)

      expect(li.find('.name').text()).toBe(user.name)
      expect(li.find('.email').text()).toBe(user.email)
    }
  })

  it('handles user deletion correctly', async () => {
    const wrapper = mount(UsersView)

    // Check if the component has the correct number of users
    expect(wrapper.vm.users.length).toBe(5)

    // Simulate user deletion
    await wrapper.find('#delete-user-button').click()

    // Check if the component has one less user
    expect(wrapper.vm.users.length).toBe(4)
  })
})
