import type { User, UserLoginBody, UserLoginResponse } from '@/types'
import { faker } from '@faker-js/faker'
export const userLogin = async (body: UserLoginBody) =>
  new Promise((resolve, reject) => {
    function createRandomUser(): User {
      return {
        _id: faker.string.uuid(),
        avatar: faker.image.avatar(),
        email: body.email,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      }
    }

    const user = createRandomUser()

    if (!user) {
      return setTimeout(() => reject(new Error('User not found')), 300)
    }
    const response: UserLoginResponse = {
      data: {
        status: 'success',
        user: user
      }
    }

    setTimeout(() => resolve(response), 300)
  })
