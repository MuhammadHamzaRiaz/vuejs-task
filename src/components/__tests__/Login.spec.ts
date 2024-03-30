import { mount } from '@vue/test-utils'
import { expect, describe, it, vi } from 'vitest'
import LoginForm from '../LoginForm.vue'
import { createPinia, setActivePinia } from 'pinia'
const pinia = createPinia()
function mountTheForm() {
  setActivePinia(pinia)
  const wrapper = mount(LoginForm)
  return wrapper
}
describe('LoginForm', () => {
  it('should render LoginForm', () => {
    expect(mountTheForm()).toBeTruthy()
    expect(mountTheForm().text()).toContain('Login')
  })
  it('should have email and password input', async () => {
    const form = mountTheForm()
    expect(form.find('v-text-field[type="email"]').exists()).toBe(true)
    expect(form.find('v-text-field[type="password"]').exists()).toBe(true)
  })
  it('should have a login button', () => {
    const form = mountTheForm()
    expect(form.find('v-btn[id="login"]').exists()).toBe(true)
    expect(form.find('v-btn[id="login"]').text()).toBe('Login')
  })

  it('should change value to input field', async () => {
    const wrapper = mountTheForm() // Mount the form only once
    const userData = {
      email: 'user@mail.com',
      password: 'password123'
    }
    const emailField: HTMLInputElement = wrapper.find('#email').element as HTMLInputElement
    emailField.value = userData.email
    const passwordField: HTMLInputElement = wrapper.find('#password').element as HTMLInputElement
    passwordField.value = userData.password
    expect(emailField.value).toBe(userData.email)
    expect(passwordField.value).toBe(userData.password)
  })

  it('should trigger login method when login button is clicked', async () => {
    const form = mountTheForm().find('v-form')
    const spyOnForm = vi.spyOn(form, 'trigger')
    await form.trigger('click')
    expect(spyOnForm).toHaveBeenCalledOnce()
  })
})
