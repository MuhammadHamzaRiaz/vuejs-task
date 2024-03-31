import type { User, UserLoginBody, UserLoginResponse } from '@/types'
import { faker } from '@faker-js/faker'
export const userLogin = async (body: UserLoginBody) =>
  new Promise((resolve, reject) => {
    // if we have DB, we will convert body.password to hash
    // and compare it with the user's hash in the DB to authenticate the user
    // and send the token to user in the response
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

    return setTimeout(() => resolve(response), 300)
  })
