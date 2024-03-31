import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import LoginForm from '../LoginForm.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/store/auth'
const pinia = createPinia()

setActivePinia(pinia)
const store = useAuthStore()

function mountTheForm() {
  const wrapper = mount(LoginForm)
  return wrapper
}
describe('LoginForm', () => {
  it('should render LoginForm', () => {
    expect(mountTheForm()).toBeTruthy()
    expect(mountTheForm().text()).toContain('login')
  })
  it('should have email and password input', async () => {
    const form = mountTheForm()
    expect(form.find('v-text-field[type="email"]').exists()).toBe(true)
    expect(form.find('v-text-field[type="password"]').exists()).toBe(true)
  })
  it('should have a login button', () => {
    const form = mountTheForm()
    expect(form.find('v-btn[id="login"]').exists()).toBe(true)
    expect(form.find('v-btn[id="login"]').text()).toBe('login')
  })

  it('should change value to input field', async () => {
    const wrapper = mountTheForm()
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

  it('login method should work  correctly', async () => {
    const wrapper = mountTheForm()
    const instance = wrapper.vm
    const userData = {
      email: 'user@mail.com',
      password: 'password123'
    }
    const valid = ((instance as any).valid = true)
    const userLoginFn = (instance as any).submitForm
    await userLoginFn(userData)
    expect(store.user.email).toBe(userData.email)
  })
})
