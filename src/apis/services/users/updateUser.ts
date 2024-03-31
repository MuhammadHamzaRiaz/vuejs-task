import type { User } from '@/types'
import { createdUsers } from '.'

export const updateUser = (requestBody: User) => {
  return new Promise((resolve, reject) => {
    const user = createdUsers.find((user) => user._id === requestBody._id)
    if (user) {
      user.firstName = requestBody.firstName
      user.lastName = requestBody.lastName
      const response = {
        data: {
          status: 'success'
        }
      }
      return setTimeout(() => resolve(response), 300)
    } else {
      return setTimeout(() => reject(new Error('User not found')), 500)
    }
  })
}
