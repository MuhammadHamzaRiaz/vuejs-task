import type { AddUserPayload } from '@/types'
import { createdUsers } from '.'
import { faker } from '@faker-js/faker'

export const addUser = (body: AddUserPayload) => {
  return new Promise((resolve) => {
    const user = {
      _id: faker.string.uuid(),
      avatar: faker.image.avatar(),
      email: body.email,
      firstName: body.first_name,
      lastName: body.last_name
    }
    createdUsers.push(user)
    const response = {
      data: {
        status: 'success'
      }
    }
    return setTimeout(() => resolve(response), 1000)
  })
}
